import { useCallback, useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue } from "motion/react";
import projects from "../data/projects";
import ProjectCard from "./ProjectCard";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------------------------------------------------------------------------
// Breakpoint config
// ---------------------------------------------------------------------------

const BREAKPOINTS = [
  {
    minWidth: 1400,
    cardWidth: 320,
    cardHeight: 384,
    cardGap: 24,
    logoMaxH: "80px",
    pngMaxH: "288px",
    iconSize: "24px",
    pngOffsetY: -120,
    titleSize: "3rem",
    blurWidth: "160px",
    isTouch: false,
  },
  {
    minWidth: 1200,
    cardWidth: 320,
    cardHeight: 384,
    cardGap: 24,
    logoMaxH: "80px",
    pngMaxH: "288px",
    iconSize: "24px",
    pngOffsetY: -120,
    titleSize: "3rem",
    blurWidth: "160px",
    isTouch: false,
  },
  {
    minWidth: 992,
    cardWidth: 290,
    cardHeight: 384,
    cardGap: 22,
    logoMaxH: "72px",
    pngMaxH: "260px",
    iconSize: "22px",
    pngOffsetY: -110,
    titleSize: "2.75rem",
    blurWidth: "112px",
    isTouch: false,
  },
  {
    minWidth: 768,
    cardWidth: 260,
    cardHeight: 370,
    cardGap: 20,
    logoMaxH: "64px",
    pngMaxH: "220px",
    iconSize: "20px",
    pngOffsetY: -95,
    titleSize: "2.5rem",
    blurWidth: "80px",
    isTouch: true,
    peekPercent: 0.2,
  },
  {
    minWidth: 576,
    cardWidth: 220,
    cardHeight: 340,
    cardGap: 16,
    logoMaxH: "52px",
    pngMaxH: "180px",
    iconSize: "17px",
    pngOffsetY: -80,
    titleSize: "2rem",
    blurWidth: "56px",
    isTouch: true,
    peekPercent: 0.15,
  },
  {
    minWidth: 0,
    cardWidth: 200,
    cardHeight: 320,
    cardGap: 14,
    logoMaxH: "44px",
    pngMaxH: "160px",
    iconSize: "16px",
    pngOffsetY: -70,
    titleSize: "1.75rem",
    blurWidth: "40px",
    isTouch: true,
    peekPercent: 0.15,
  },
];

function getBreakpoint(width) {
  for (const bp of BREAKPOINTS) {
    if (width >= bp.minWidth) return bp;
  }
  return BREAKPOINTS[BREAKPOINTS.length - 1];
}

// ---------------------------------------------------------------------------
// Desktop carousel — comportamento originale invariato
// ---------------------------------------------------------------------------

function DesktopCarousel({ repeated, shuffled, bp, cardSize }) {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const loopWidth = shuffled.length * (bp.cardWidth + bp.cardGap);

  useEffect(() => {
    x.set(-loopWidth);
  }, [loopWidth, x]);

  const checkLoop = useCallback(() => {
    const current = x.get();
    if (current <= -loopWidth * 2) x.set(current + loopWidth);
    if (current >= 0) x.set(current - loopWidth);
  }, [loopWidth, x]);

  useEffect(() => {
    const unsubscribe = x.on("change", checkLoop);
    return () => unsubscribe();
  }, [checkLoop, x]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (isHorizontal) return;
      e.preventDefault();
      x.set(x.get() - e.deltaY * 2);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [x]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: bp.blurWidth,
          background: "linear-gradient(to right, #030712, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: bp.blurWidth,
          background: "linear-gradient(to left, #030712, transparent)",
        }}
      />
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        style={{
          x,
          gap: bp.cardGap,
          paddingLeft: bp.blurWidth,
          paddingRight: bp.blurWidth,
          paddingBottom: "80px",
        }}
        drag="x"
        dragConstraints={false}
        dragElastic={0}
        onDragEnd={() => checkLoop()}
      >
        {repeated.map((project, index) => (
          <ProjectCard
            key={`${project.id}-${index}`}
            project={project}
            cardSize={cardSize}
            touchState={null}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Touch carousel
// ---------------------------------------------------------------------------

function TouchCarousel({ repeated, shuffled, bp, cardSize }) {
  const scrollRef = useRef(null);
  const cardTotal = bp.cardWidth + bp.cardGap;
  const groupSize = shuffled.length;
  const peekPercent = bp.peekPercent ?? 0.15;

  const [activeIndex, setActiveIndex] = useState(null);
  // "active" = card centrata, primo tap ancora non avvenuto
  // "revealed" = primo tap già fatto, PNG visibile, secondo tap → link
  const [hoverRevealed, setHoverRevealed] = useState(false);

  // Calcolo deterministico: quale card è più vicina al centro
  const computeActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const paddingLeft =
      (el.clientWidth - bp.cardWidth) / 2 - bp.cardWidth * peekPercent;
    const center = el.scrollLeft + el.clientWidth / 2;
    const index = Math.round(
      (center - paddingLeft - bp.cardWidth / 2) / cardTotal,
    );
    const clamped = Math.max(0, Math.min(index, repeated.length - 1));
    setActiveIndex((prev) => {
      if (prev !== clamped) {
        setHoverRevealed(false); // reset quando cambia card
      }
      return clamped;
    });
  }, [bp.cardWidth, peekPercent, cardTotal, repeated.length]);

  // Scroll handler: loop infinito + debounce per rilevare fine snap
  const scrollTimer = useRef(null);
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const totalWidth = groupSize * cardTotal;
    // Loop: salta al gruppo centrale se siamo ai bordi
    if (el.scrollLeft <= totalWidth * 0.5) {
      el.scrollLeft += totalWidth;
      return;
    }
    if (el.scrollLeft >= totalWidth * 2) {
      el.scrollLeft -= totalWidth;
      return;
    }

    // Aspetta che lo snap si fermi prima di calcolare la card attiva
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      computeActiveIndex();
    }, 150);
  }, [groupSize, cardTotal, computeActiveIndex]);

  // Mount: posiziona sul gruppo centrale, poi calcola la card iniziale
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = groupSize * cardTotal;
    setTimeout(() => computeActiveIndex(), 50);
  }, [groupSize, cardTotal, computeActiveIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer.current);
    };
  }, [handleScroll]);

  // Gestione tap
  const handleTap = useCallback(
    (index, project) => {
      // Card non attiva: ignora il tap (lo snap fa già il lavoro)
      if (index !== activeIndex) return;

      if (!hoverRevealed) {
        // Primo tap sulla card attiva → mostra PNG
        setHoverRevealed(true);
      } else {
        // Secondo tap → apri link
        if (project.link) {
          window.open(project.link, "_blank", "noopener noreferrer");
        }
      }
    },
    [activeIndex, hoverRevealed],
  );

  const paddingX = `calc((100vw - ${bp.cardWidth}px) / 2 - ${
    bp.cardWidth * peekPercent
  }px)`;

  return (
    <div className="relative">
      {/* Blur laterali */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: bp.blurWidth,
          background: "linear-gradient(to right, #030712, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: bp.blurWidth,
          background: "linear-gradient(to left, #030712, transparent)",
        }}
      />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingBottom: "80px",
          gap: bp.cardGap,
        }}
      >
        {repeated.map((project, index) => {
          const isActive = index === activeIndex;
          const touchState = isActive
            ? hoverRevealed
              ? "revealed" // PNG visibile, prossimo tap → link
              : "active" // centrata, prossimo tap → rivela PNG
            : "idle"; // non centrata

          return (
            <div
              key={`${project.id}-${index}`}
              style={{ scrollSnapAlign: "center", flexShrink: 0 }}
              onClick={() => handleTap(index, project)}
            >
              <ProjectCard
                project={project}
                cardSize={cardSize}
                touchState={touchState}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function Projects() {
  const [shuffled] = useState(() => shuffleArray(projects));
  const repeated = [...shuffled, ...shuffled, ...shuffled];

  const [bp, setBp] = useState(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setBp(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardSize = {
    width: `${bp.cardWidth}px`,
    height: `${bp.cardHeight}px`,
    logoMaxH: bp.logoMaxH,
    pngMaxH: bp.pngMaxH,
    iconSize: bp.iconSize,
    pngOffsetY: bp.pngOffsetY,
    titleSize: bp.titleSize,
  };

  return (
    <section id="projects" className="bg-gray-950 py-24">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <span className="text-xs font-medium text-violet-400 tracking-widest uppercase">
          Works
        </span>
        <h2 className="text-4xl font-bold text-white mt-2">
          Things I've Built
        </h2>
      </div>

      {bp.isTouch ? (
        <TouchCarousel
          repeated={repeated}
          shuffled={shuffled}
          bp={bp}
          cardSize={cardSize}
        />
      ) : (
        <DesktopCarousel
          repeated={repeated}
          shuffled={shuffled}
          bp={bp}
          cardSize={cardSize}
        />
      )}
    </section>
  );
}

export default Projects;
