import Dialogo from "./Dialogo";

const VECINOS = [
  { quien: "homero", frase: "Mmm... hamburguesa. Ahhhh." },
  { quien: "apu", frase: "¡Gracias, vuelva pronto!" },
  { quien: "bart", frase: "¡Ay, caramba! ¡Eso estaba buenísimo!" },
  { quien: "moe", frase: "Mejor que mis aperitivos, y eso ya es decir." },
];

function VecinosSpringfield() {
  return (
    <section className="kb-vecinos px-4 px-lg-5 py-5">
      <h2 className="kb-vecinos-titulo">
        LOS VECINOS <span>OPINAN</span>
      </h2>
      <div className="kb-vecinos-grid">
        {VECINOS.map((vecino) => (
          <Dialogo
            key={vecino.quien}
            quien={vecino.quien}
            frase={vecino.frase}
            tam="md"
          />
        ))}
      </div>
    </section>
  );
}

export default VecinosSpringfield;
