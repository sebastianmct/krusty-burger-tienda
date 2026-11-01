import { PERSONAJES } from "../data/personajes";
import Personaje from "./Personaje";

function Dialogo({
  quien,
  frase,
  tam = "md",
  invertido = false,
  className = "",
  children,
}) {
  const personaje = PERSONAJES[quien];

  return (
    <div
      className={
        "kb-dialogo" + (invertido ? " kb-dialogo-inv" : "") + " " + className
      }
    >
      <Personaje quien={quien} tam={tam} />
      <div className="kb-globo">
        <strong className="kb-globo-nombre">
          {personaje ? personaje.nombre : ""}
        </strong>
        {frase && <p className="kb-globo-frase">{frase}</p>}
        {children}
      </div>
    </div>
  );
}

export default Dialogo;
