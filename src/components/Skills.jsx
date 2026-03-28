import skills from "../data/skills";

function Skills() {
  return (
    <section id="skills" className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-xs font-medium text-violet-600 tracking-widest uppercase">
          Skills
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-12">
          Competenze
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-8">
              Stack tecnico
            </h3>
            <div className="flex flex-col gap-5">
              {skills.hard.map((skill) => (
                <div key={skill.nome}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{skill.nome}</span>
                    <span className="text-sm text-gray-400">
                      {skill.livello}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full">
                    <div
                      className="h-1 bg-violet-600 rounded-full"
                      style={{ width: `${skill.livello}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-8">
              Soft skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.soft.map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-gray-600 border border-gray-200 rounded-full px-4 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
