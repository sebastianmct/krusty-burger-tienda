import Personaje from "./Personaje";

function LisaSaxofon() {
  return (
    <div className="kb-lisa">
      <Personaje quien="lisa" tam="lg" />
      <span className="kb-sax" role="img" aria-label="Saxofón">
        <img src="/assets/saxofon.png" alt="Saxofón" />
      </span>
      <span className="kb-nota kb-nota-1" aria-hidden="true">
        ♪
      </span>
      <span className="kb-nota kb-nota-2" aria-hidden="true">
        ♫
      </span>
      <span className="kb-nota kb-nota-3" aria-hidden="true">
        ♪
      </span>
      <p className="kb-lisa-texto">Lisa toca jazz mientras lees.</p>
    </div>
  );
}

export default LisaSaxofon;
