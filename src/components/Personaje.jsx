import { useEffect, useState } from "react";
import { PERSONAJES, inicialesDe, urlFotoPorId } from "../data/personajes";
import { obtenerFotoPersonaje } from "../services/personajesApi";

function Personaje({ quien, tam = "md", alt, className = "" }) {
  const personaje = PERSONAJES[quien];

  const [urlApi, setUrlApi] = useState(
    personaje && personaje.apiId ? urlFotoPorId(personaje.apiId) : null,
  );
  const [fallidas, setFallidas] = useState([]);

  useEffect(() => {
    let vivo = true;
    obtenerFotoPersonaje(quien).then((url) => {
      if (vivo) setUrlApi(url);
    });
    return () => {
      vivo = false;
    };
  }, [quien]);

  if (!personaje) return null;

  const fuentes = [urlApi, personaje.foto].filter(Boolean);
  const src = fuentes.find((url) => !fallidas.includes(url));
  const clases = "kb-pj kb-pj-" + tam + " " + className;

  if (!src) {
    return (
      <span
        className={clases + " kb-pj-insignia"}
        role="img"
        aria-label={alt || personaje.nombre}
      >
        {inicialesDe(personaje.nombre)}
      </span>
    );
  }

  return (
    <img
      className={clases + (src.startsWith("assets/") ? " kb-pj-local" : "")}
      src={src}
      alt={alt || personaje.nombre}
      onError={() => setFallidas([...fallidas, src])}
    />
  );
}

export default Personaje;
