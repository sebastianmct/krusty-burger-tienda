const URL_SIMPSONS = "https://thesimpsonsapi.com/api";
const URL_PRACTICA = "https://jsonplaceholder.typicode.com";

export async function obtenerPersonaje(id) {
  const respuesta = await fetch(URL_SIMPSONS + "/characters/" + id);
  if (!respuesta.ok) {
    throw new Error("No se pudo cargar el personaje");
  }
  return respuesta.json();
}

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
