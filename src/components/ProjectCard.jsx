// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function ProjectCard({ project }) {
  return (
    <motion.div
      style={{ perspective: "1000px" }}
      whileHover="tilt"
      initial="rest"
      animate="rest"
      className="shrink-0 w-64 cursor-pointer"
    >
      <motion.div
        variants={{
          rest: {
            rotateX: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          },
          tilt: {
            rotateX: 20,
            transition: { duration: 0.4, ease: "easeOut" },
          },
        }}
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          background: project.coloreBackground,
        }}
        className="rounded-2xl overflow-visible h-80 flex flex-col"
      >
        {/* Overlay scuro in alto al tilt */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            tilt: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          }}
        />

        {/* Logo / placeholder */}
        <div className="flex-1 flex items-center justify-center p-6 z-20">
          {project.logo ? (
            <img
              src={project.logo}
              alt={project.nome}
              className="max-h-16 max-w-full object-contain"
            />
          ) : (
            <span
              className="font-gothic text-4xl uppercase tracking-tight"
              style={{ color: project.coloreTesto }}
            >
              {project.nome}
            </span>
          )}
        </div>

        {/* Footer con tag */}
        <div className="px-4 pb-4 z-20 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: project.coloreTesto,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* PNG che emerge al tilt */}
        {project.immagineTilt && (
          <motion.div
            variants={{
              rest: { opacity: 0, y: 10 },
              tilt: { opacity: 1, y: -24 },
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: "-16px",
              right: "16px",
              transformStyle: "preserve-3d",
              transform: "translateZ(40px)",
              zIndex: 30,
            }}
          >
            <img
              src={project.immagineTilt}
              alt={project.nome}
              className="h-28 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;
