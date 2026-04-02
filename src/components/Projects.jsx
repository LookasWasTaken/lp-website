// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useRef } from "react";
import projects from "../data/projects";
import ProjectCard from "./ProjectCard";

function Projects() {
  const carouselRef = useRef(null);

  return (
    <section id="projects" className="bg-gray-950 py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <span className="text-xs font-medium text-violet-400 tracking-widest uppercase">
          Projects
        </span>
        <h2 className="text-4xl font-bold text-white mt-2">
          Progetti selezionati
        </h2>
      </div>

      {/* Wrapper con blur ai lati */}
      <div className="relative">
        {/* Blur sinistro */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #030712, transparent)",
          }}
        />

        {/* Blur destro */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #030712, transparent)",
          }}
        />

        {/* Carosello draggabile */}
        <motion.div
          ref={carouselRef}
          className="flex gap-6 px-32 pb-8 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -((projects.length - 2) * 280), right: 0 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
