// Conexión con APIs externas usando fetch (sin instalar nada).
//
// 1) The Simpsons API (https://thesimpsonsapi.com) -> GET, no necesita clave.
// 2) JSONPlaceholder (https://jsonplaceholder.typicode.com) -> API de práctica
//    que acepta POST y responde como si hubiera guardado el dato.

const URL_SIMPSONS = "https://thesimpsonsapi.com/api";
const URL_PRACTICA = "https://jsonplaceholder.typicode.com";

// GET: trae un personaje por su id. Ejemplo: 1 = Homero, 15 = Krusty, 16 = Moe
export async function obtenerPersonaje(id) {
  const respuesta = await fetch(URL_SIMPSONS + "/characters/" + id);
  if (!respuesta.ok) {
    throw new Error("No se pudo cargar el personaje");
  }
  return respuesta.json();
}

// POST: envía una queja del formulario de contacto. Devuelve lo enviado más un id.
export async function enviarQueja(queja) {
  const respuesta = await fetch(URL_PRACTICA + "/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(queja),
  });
  if (!respuesta.ok) {
    throw new Error("No se pudo enviar la queja");
  }
  return respuesta.json();
}
