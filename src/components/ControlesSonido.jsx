import { useEffect, useRef, useState } from "react";
import { useSonidoOpcional } from "../hooks/useSonido";

function ControlesSonido() {
  const contextoSonido = useSonidoOpcional();
  const [abierto, setAbierto] = useState(false);
  const disparador = useRef(null);
  const contenedor = useRef(null);

  useEffect(() => {
    if (!abierto) return undefined;

    function cerrarConEscape(evento) {
      if (evento.key === "Escape") {
        setAbierto(false);
        disparador.current?.focus();
      }
    }

    function cerrarAlHacerClicFuera(evento) {
      if (!contenedor.current?.contains(evento.target)) setAbierto(false);
    }

    document.addEventListener("keydown", cerrarConEscape);
    document.addEventListener("pointerdown", cerrarAlHacerClicFuera);
    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
      document.removeEventListener("pointerdown", cerrarAlHacerClicFuera);
    };
  }, [abierto]);

  if (!contextoSonido) return null;

  const { pack, enabled, cambiarPack, alternarSonido, probarSonido } =
    contextoSonido;

  return (
    <div
      className="kb-controles-sonido"
      data-sound-control
      data-sound-pack={pack}
      ref={contenedor}
    >
      <button
        ref={disparador}
        className="btn btn-outline-dark kb-sonido-disparador"
        type="button"
        aria-label="Preferencias de sonido"
        aria-expanded={abierto}
        aria-controls="kb-sonido-panel"
        onClick={() => setAbierto(!abierto)}
      >
        <i
          className={"ti " + (enabled ? "ti-volume" : "ti-volume-off")}
          aria-hidden="true"
        ></i>
        <span className="visually-hidden">Preferencias de sonido</span>
      </button>
      {abierto && (
        <div className="kb-sonido-panel" id="kb-sonido-panel">
          <label className="form-label" htmlFor="kb-sonido-pack">
            Perfil de sonido
          </label>
          <select
            className="form-select mb-3"
            id="kb-sonido-pack"
            value={pack}
            onChange={(evento) => cambiarPack(evento.target.value)}
          >
            <option value="minimal">Minimal</option>
            <option value="soft">Soft</option>
            <option value="glass">Glass</option>
            <option value="arcade">Arcade</option>
            <option value="mechanical">Mechanical</option>
            <option value="organic">Organic</option>
            <option value="dreamy">Dreamy</option>
            <option value="scifi">Sci-fi</option>
            <option value="rubber">Rubber</option>
            <option value="cinematic">Cinematic</option>
            <option value="studio">Studio</option>
            <option value="zen">Zen</option>

          </select>
          <button
            className="btn btn-outline-dark w-100"
            type="button"
            aria-pressed={enabled}
            onClick={alternarSonido}
          >
            {enabled ? "Desactivar sonidos" : "Activar sonidos"}
          </button>
          <button
            className="btn btn-kb-secundario w-100 mt-2"
            type="button"
            disabled={!enabled}
            onClick={probarSonido}
          >
            Probar sonido
          </button>
        </div>
      )}
    </div>
  );
}

export default ControlesSonido;
