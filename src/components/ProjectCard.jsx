// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function ProjectCard({ project }) {
  return (
    <motion.div
      style={{ perspective: "1000px" }}
      whileHover="tilt"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={{
          rest: {
            rotateX: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          },
          tilt: {
            rotateX: 30,
            transition: { duration: 0.4, ease: "easeOut" },
          },
        }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-white font-medium">{project.nome}</h3>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-violet-400 transition-colors shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="13" x2="13" y2="3" />
              <polyline points="7,3 13,3 13,9" />
            </svg>
          </a>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">
          {project.descrizione}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-violet-400 bg-violet-950 border border-violet-900 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.immagineTilt && (
          <motion.div
            variants={{
              rest: { opacity: 0, y: 10 },
              tilt: { opacity: 1, y: -16 },
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: "-24px",
              right: "24px",
              transformStyle: "preserve-3d",
              transform: "translateZ(40px)",
            }}
          >
            <img
              src={project.immagineTilt}
              alt={project.nome}
              className="h-24 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;
