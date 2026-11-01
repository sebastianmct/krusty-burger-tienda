import { FRASE_DUFFMAN } from "../data/frases";
import Personaje from "./Personaje";

function EntregaDuffman() {
  return (
    <div className="kb-duffman" role="status">
      <div className="kb-duffman-baile">
        <Personaje quien="duffman" tam="xl" />
        <span className="kb-brillo kb-brillo-1">✦</span>
        <span className="kb-brillo kb-brillo-2">✦</span>
        <span className="kb-brillo kb-brillo-3">✦</span>
      </div>
      <div className="kb-globo">
        <strong className="kb-globo-nombre">Duffman</strong>
        <p className="kb-globo-frase">{FRASE_DUFFMAN}</p>
      </div>
    </div>
  );
}

export default EntregaDuffman;
