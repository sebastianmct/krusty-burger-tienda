import { useEffect, useState } from "react";
import { obtenerPersonaje } from "../services/api";

// Personajes que pueden aparecer (ids de The Simpsons API): Homero, Bart, Burns, Krusty, Moe
const IDS_PERSONAJES = [1, 3, 13, 15, 16];

// Cada día del mes toca un personaje distinto
function personajeDeHoy() {
  return IDS_PERSONAJES[new Date().getDate() % IDS_PERSONAJES.length];
}

// Muestra un personaje de Springfield con una de sus frases, traído desde una API.
//   id -> (opcional) id del personaje; si no se entrega se usa el "del día"
function PersonajeDelDia({ id = personajeDeHoy() }) {
  const [personaje, setPersonaje] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    obtenerPersonaje(id)
      .then((datos) => setPersonaje(datos))
      .catch(() => setError(true));
  }, [id]);

  return (
    <section className="kb-personaje px-4 px-lg-5 py-4">
      <p className="kb-personaje-etiqueta">Personaje del día</p>

      {error && <p className="kb-personaje-estado">No pudimos contactar a Springfield. Intenta más tarde.</p>}
      {!error && !personaje && <p className="kb-personaje-estado">Cargando...</p>}

      {personaje && (
        <>
          <h2 className="kb-personaje-nombre">{personaje.name}</h2>
          <p className="kb-personaje-ocupacion">{personaje.occupation}</p>
          {personaje.phrases?.length > 0 && (
            <blockquote className="kb-personaje-frase">“{personaje.phrases[0]}”</blockquote>
          )}
        </>
      )}
    </section>
  );
}

export default PersonajeDelDia;
