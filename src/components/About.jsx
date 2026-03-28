function About() {
  const timeline = [
    {
      anno: "2018",
      titolo: "Laurea in Scienze Motorie",
      descrizione: "Università degli Studi di Roma",
    },
    {
      anno: "2020",
      titolo: "Primo approccio al web",
      descrizione: "Autodidatta — HTML, CSS, JavaScript",
    },
    {
      anno: "2022",
      titolo: "Primi progetti WordPress",
      descrizione: "Siti per clienti locali e freelance",
    },
    {
      anno: "2024",
      titolo: "Sviluppo frontend moderno",
      descrizione: "React, Tailwind, strumenti professionali",
    },
  ];

  return (
    <section id="about" className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-xs font-medium text-violet-600 tracking-widest uppercase">
          About
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">Chi sono</h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-gray-500 leading-relaxed mb-4">
              Placeholder — Ciao! Sono Luca, web developer con base a Roma. Ho
              un percorso un po' atipico: vengo dal mondo delle scienze motorie,
              ma la passione per il digitale mi ha portato a reinventarmi
              completamente.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              Placeholder — Lavoro principalmente con WordPress per i clienti,
              ma sto espandendo le mie competenze verso il frontend moderno con
              React. Mi piace costruire interfacce pulite, veloci e curate nei
              dettagli.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Placeholder — Quando non scrivo codice, mi trovi in palestra o a
              studiare qualcosa di nuovo. Sono disponibile per progetti
              freelance e collaborazioni.
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full bg-violet-600 mt-1.5 shrink-0"></span>
                    {index < timeline.length - 1 && (
                      <span className="w-px flex-1 bg-gray-200 mt-1"></span>
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-xs font-medium text-violet-600">
                      {item.anno}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">
                      {item.titolo}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {item.descrizione}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
