import { useEffect, useState } from "react";
import { urlFotoDeRuta, urlFotoPorId } from "../data/personajes";
import { obtenerPersonaje } from "../services/api";
import AlertaDoh from "./AlertaDoh";

function PersonajeDelDia({ id = 17 }) {
  const [personaje, setPersonaje] = useState(null);
  const [error, setError] = useState(false);
  const [fotoRota, setFotoRota] = useState(false);

  useEffect(() => {
    obtenerPersonaje(id)
      .then((datos) => setPersonaje(datos))
      .catch(() => setError(true));
  }, [id]);

  const foto = personaje
    ? personaje.portrait_path
      ? urlFotoDeRuta(personaje.portrait_path)
      : urlFotoPorId(personaje.id)
    : null;

  return (
    <section
      className="kb-personaje px-4 px-lg-5 py-4"
      aria-busy={!error && !personaje}
      data-uisfx-loop="loading"
    >
      <p className="kb-personaje-etiqueta">Personaje del día</p>

      {error && (
        <AlertaDoh>
          No pudimos contactar a Springfield. Intenta más tarde.
        </AlertaDoh>
      )}
      {!error && !personaje && (
        <p className="kb-personaje-estado">Cargando...</p>
      )}

      {personaje && (
        <>
          {foto && !fotoRota && (
            <img
              className="kb-pj kb-pj-xl kb-personaje-foto"
              src={foto}
              alt={personaje.name}
              onError={() => setFotoRota(true)}
            />
          )}
          <h2 className="kb-personaje-nombre">{personaje.name}</h2>
          <p className="kb-personaje-ocupacion">{personaje.occupation}</p>
          {personaje.phrases?.length > 0 && (
            <blockquote className="kb-personaje-frase">
              “{personaje.phrases[0]}”
            </blockquote>
          )}
        </>
      )}
    </section>
  );
}

export default PersonajeDelDia;
