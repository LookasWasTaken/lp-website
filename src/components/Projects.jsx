import projects from "../data/projects";

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
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4 hover:border-violet-900 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-white font-medium">{project.nome}</h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-violet-400 transition-colors shrink-0"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
