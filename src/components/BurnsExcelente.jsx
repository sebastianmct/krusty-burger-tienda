import { FRASE_BURNS } from "../data/frases";

function BurnsExcelente() {
  return (
    <div className="kb-burns" role="status">
      <img
        src={`${import.meta.env.BASE_URL}assets/burns.jpg`}
        alt="Sr. Burns"
        width="100"
        height="120"
      />
      <div className="kb-globo">
        <strong className="kb-globo-nombre">Sr. Burns</strong>
        <p className="kb-globo-frase kb-globo-grande">{FRASE_BURNS}</p>
      </div>
    </div>
  );
}

export default BurnsExcelente;
