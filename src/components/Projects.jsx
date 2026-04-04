import { useCallback, useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue } from "motion/react";
import projects from "../data/projects";
import ProjectCard from "./ProjectCard";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CARD_WIDTH = 320;
const CARD_GAP = 24;
const CARD_TOTAL = CARD_WIDTH + CARD_GAP;

function Projects() {
  const [shuffled] = useState(() => shuffleArray(projects));
  const repeated = [...shuffled, ...shuffled, ...shuffled];
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const loopWidth = shuffled.length * CARD_TOTAL;

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
    <section id="projects" className="bg-gray-950 py-24">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <span className="text-xs font-medium text-violet-400 tracking-widest uppercase">
          Works
        </span>
        <h2 className="text-4xl font-bold text-white mt-2">
          Things I've Built
        </h2>
      </div>

      <div ref={containerRef} className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #030712, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #030712, transparent)",
          }}
        />

        <motion.div
          className="flex gap-6 px-40 pb-16 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={false}
          dragElastic={0}
          onDragEnd={() => checkLoop()}
        >
          {repeated.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
