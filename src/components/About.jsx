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
              Sono Luca, web developer basato a Roma. Lavoro come freelance e in
              collaborazione con studi e agenzie, costruendo siti e interfacce
              che funzionano bene e si vedono meglio. Mi interessa ugualmente la
              parte visiva e quella logica del codice — per me un buon sito è
              quello dove le due cose non si distinguono.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              Ho una laurea in Scienze Motorie, e no, non è un errore. Quello
              che ho imparato lavorando con le persone — disciplina, ascolto,
              gestione della pressione — lo uso ogni giorno anche nello sviluppo
              web. Ho iniziato ad avvicinarmi al codice per curiosità, poi è
              diventato un lavoro, poi una passione vera.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Oggi lavoro principalmente con WordPress per i clienti, e sto
              espandendo il mio stack verso il frontend moderno con React. Curo
              i dettagli, rispetto le scadenze e preferisco fare poche cose bene
              piuttosto che tante cose così così. Se hai un progetto in mente,
              sono disponibile a sentire.
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
