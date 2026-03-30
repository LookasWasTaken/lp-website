import projects from "../data/projects";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <section id="projects" className="bg-gray-950 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-xs font-medium text-violet-400 tracking-widest uppercase">
          Projects
        </span>
        <h2 className="text-4xl font-bold text-white mt-2 mb-12">
          Progetti selezionati
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
