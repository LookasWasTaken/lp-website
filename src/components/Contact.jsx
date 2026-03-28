import { useState } from "react";

function Contact() {
  const [step, setStep] = useState(1);
  const [dati, setDati] = useState({
    nome: "",
    email: "",
    tipo: "",
    messaggio: "",
    budget: "",
  });

  const tipiProgetto = [
    "Sito vetrina",
    "E-commerce",
    "Portfolio",
    "Web app",
    "Altro",
  ];

  const aggiornaDati = (campo, valore) => {
    setDati({ ...dati, [campo]: valore });
  };

  const stepSuccessivo = () => setStep(step + 1);
  const stepPrecedente = () => setStep(step - 1);

  return (
    <section id="contact" className="bg-gray-950 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-xs font-medium text-violet-400 tracking-widest uppercase">
          Contact
        </span>
        <h2 className="text-4xl font-bold text-white mt-2 mb-12">Parliamoci</h2>

        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${step >= n ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-500"}`}
                >
                  {n}
                </div>
                {n < 4 && (
                  <div
                    className={`w-8 h-px transition-colors ${step > n ? "bg-violet-600" : "bg-gray-800"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 mb-2">
                Come ti chiami e come posso contattarti?
              </p>
              <input
                type="text"
                placeholder="Nome"
                value={dati.nome}
                onChange={(e) => aggiornaDati("nome", e.target.value)}
                className="bg-gray-900 border border-gray-800 text-white placeholder-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-600 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={dati.email}
                onChange={(e) => aggiornaDati("email", e.target.value)}
                className="bg-gray-900 border border-gray-800 text-white placeholder-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-600 transition-colors"
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 mb-2">
                Di che tipo di progetto hai bisogno?
              </p>
              <div className="flex flex-wrap gap-3">
                {tipiProgetto.map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => aggiornaDati("tipo", tipo)}
                    className={`text-sm px-4 py-2 rounded-full border transition-colors ${dati.tipo === tipo ? "bg-violet-600 border-violet-600 text-white" : "bg-transparent border-gray-800 text-gray-400 hover:border-violet-900"}`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 mb-2">Raccontami il progetto</p>
              <textarea
                placeholder="Descrivi brevemente cosa hai in mente..."
                value={dati.messaggio}
                onChange={(e) => aggiornaDati("messaggio", e.target.value)}
                rows={4}
                className="bg-gray-900 border border-gray-800 text-white placeholder-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-600 transition-colors resize-none"
              />
              <input
                type="text"
                placeholder="Budget indicativo (es. 500€, 1000€...)"
                value={dati.budget}
                onChange={(e) => aggiornaDati("budget", e.target.value)}
                className="bg-gray-900 border border-gray-800 text-white placeholder-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-600 transition-colors"
              />
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-3">
              <p className="text-gray-400 mb-2">
                Controlla i tuoi dati prima di inviare
              </p>
              {[
                { label: "Nome", valore: dati.nome },
                { label: "Email", valore: dati.email },
                { label: "Tipo progetto", valore: dati.tipo },
                { label: "Budget", valore: dati.budget },
                { label: "Messaggio", valore: dati.messaggio },
              ].map((riga) => (
                <div
                  key={riga.label}
                  className="flex gap-4 py-3 border-b border-gray-800"
                >
                  <span className="text-xs text-gray-500 w-28 shrink-0 pt-0.5">
                    {riga.label}
                  </span>
                  <span className="text-sm text-white">
                    {riga.valore || "—"}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={stepPrecedente}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                ← Indietro
              </button>
            ) : (
              <div></div>
            )}
            {step < 4 ? (
              <button
                onClick={stepSuccessivo}
                className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Avanti →
              </button>
            ) : (
              <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors">
                Invia messaggio
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
