function Hero() {
  return (
    <section className="min-h-screen bg-gray-950 flex items-center pt-16">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <span className="inline-flex items-center gap-2 text-xs text-violet-400 bg-violet-950 border border-violet-900 rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
          disponibile per nuovi progetti
        </span>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
          Ciao, sono
          <br />
          <span className="text-violet-400">Luca.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-xl leading-relaxed mb-10">
          Web developer con la passione per le interfacce curate e le esperienze
          digitali che funzionano davvero.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="#projects"
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Vedi i progetti
          </a>
          <a
            href="#contact"
            className="text-sm text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600 px-6 py-3 rounded-lg transition-colors"
          >
            Contattami
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
