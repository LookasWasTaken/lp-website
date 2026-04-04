// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaPhp,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import {
  SiDavinciresolve,
  SiTailwindcss,
  SiVite,
  SiWoocommerce,
} from "react-icons/si";

const iconMap = {
  WordPress: { icon: <FaWordpress />, color: "#21759b" },
  WooCommerce: { icon: <SiWoocommerce />, color: "#96588a" },
  PHP: { icon: <FaPhp />, color: "#777bb4" },
  JavaScript: { icon: <FaJs />, color: "#f7df1e" },
  HTML: { icon: <FaHtml5 />, color: "#e34f26" },
  CSS: { icon: <FaCss3Alt />, color: "#1572b6" },
  React: { icon: <FaReact />, color: "#61dafb" },
  Tailwind: { icon: <SiTailwindcss />, color: "#38bdf8" },
  Vite: { icon: <SiVite />, color: "#646cff" },
  Git: { icon: <FaGitAlt />, color: "#f05032" },
  "DaVinci Resolve": { icon: <SiDavinciresolve />, color: "#233a54" },
};

const fontMap = {
  "font-gothic": "'League Gothic', sans-serif",
  "font-syne": "'Syne', sans-serif",
  "font-grotesk": "'Space Grotesk', sans-serif",
  "font-jakarta": "'Plus Jakarta Sans', sans-serif",
  "font-dm": "'DM Sans', sans-serif",
  "font-serif": "'DM Serif Display', serif",
};

function TagIcon({ tag }) {
  const entry = iconMap[tag];
  if (entry) {
    return (
      <span
        className="text-2xl transition-opacity"
        style={{ color: entry.color, lineHeight: 1 }}
        title={tag}
      >
        {entry.icon}
      </span>
    );
  }
  return (
    <span className="text-white/50 text-xs font-medium" title={tag}>
      {tag}
    </span>
  );
}

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (project.link)
      window.open(project.link, "_blank", "noopener noreferrer");
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="shrink-0 w-80 cursor-pointer relative"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? "tilt" : "rest"}
        variants={{
          rest: { rotateX: 0, transition: { duration: 0.4, ease: "easeOut" } },
          tilt: { rotateX: 25, transition: { duration: 0.4, ease: "easeOut" } },
        }}
        style={{
          transformStyle: "preserve-3d",
          background: project.coloreBackground,
        }}
        className="rounded-2xl h-96 flex flex-col overflow-visible relative"
      >
        {/* Overlay scuro in alto al tilt */}
        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 top-0 h-2/3 rounded-t-2xl z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
          }}
        />

        {/* Area principale */}
        <div className="flex-1 flex items-center justify-center p-6 z-20 relative">
          <motion.div
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 rounded-t-2xl pointer-events-none"
            style={{ background: "rgba(0,0,0,0.5)" }}
          />
          {project.logo ? (
            <img
              src={project.logo}
              alt={project.nome}
              className="max-h-20 max-w-full object-contain relative z-0"
            />
          ) : (
            <span
              className="text-5xl tracking-tight text-center relative z-0"
              style={{
                color: project.coloreTesto,
                fontFamily:
                  fontMap[project.fontFamily] || "'League Gothic', sans-serif",
              }}
            >
              {project.nome}
            </span>
          )}
        </div>

        {/* Footer glassmorphism */}
        <div
          className="px-4 py-3 z-20 flex items-center justify-center flex-wrap gap-3 rounded-b-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
            borderTop: "0.5px solid rgba(255,255,255,0.08)",
          }}
        >
          {project.tags.map((tag) => (
            <TagIcon key={tag} tag={tag} />
          ))}
        </div>
      </motion.div>

      {/* PNG fuori dal contesto 3D */}
      {project.immagineTilt && (
        <motion.div
          animate={isHovered ? { opacity: 1, y: -120 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0",
            right: "0",
            display: "flex",
            justifyContent: "center",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <img
            src={project.immagineTilt}
            alt={project.nome}
            className="max-h-72 max-w-[90%] object-contain drop-shadow-2xl"
          />
        </motion.div>
      )}
    </div>
  );
}

export default ProjectCard;
