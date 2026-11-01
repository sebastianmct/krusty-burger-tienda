import { PERSONAJES, urlFotoPorId } from "../data/personajes";

const URL_API = "https://thesimpsonsapi.com/api/characters";
const PAGINAS_A_REVISAR = 15;
const CLAVE_CACHE = "krustyPersonajesIds";

const paginas = new Map();
const busquedas = new Map();

function leerCache() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CACHE) || "{}");
  } catch {
    return {};
  }
}

function guardarEnCache(clave, id) {
  try {
    localStorage.setItem(
      CLAVE_CACHE,
      JSON.stringify({ ...leerCache(), [clave]: id }),
    );
  } catch {}
}

function obtenerPagina(numero) {
  if (!paginas.has(numero)) {
    const pedido = fetch(URL_API + "?page=" + numero)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("página no disponible");
        return respuesta.json();
      })
      .then((datos) => datos.results || [])
      .catch(() => {
        paginas.delete(numero);
        return [];
      });
    paginas.set(numero, pedido);
  }
  return paginas.get(numero);
}

async function buscarId(patron) {
  const numeros = Array.from({ length: PAGINAS_A_REVISAR }, (_, i) => i + 1);
  const listas = await Promise.all(numeros.map(obtenerPagina));
  const encontrado = listas
    .flat()
    .find((personaje) => patron.test(personaje.name));
  return encontrado ? encontrado.id : null;
}

export function obtenerFotoPersonaje(clave) {
  const personaje = PERSONAJES[clave];
  if (!personaje) return Promise.resolve(null);
  if (personaje.apiId) return Promise.resolve(urlFotoPorId(personaje.apiId));

  const guardado = leerCache()[clave];
  if (guardado) return Promise.resolve(urlFotoPorId(guardado));

  if (!busquedas.has(clave)) {
    const busqueda = buscarId(personaje.buscar).then((id) => {
      busquedas.delete(clave);
      if (!id) return null;
      guardarEnCache(clave, id);
      return urlFotoPorId(id);
    });
    busquedas.set(clave, busqueda);
  }
  return busquedas.get(clave);
}

export function reiniciarCachePersonajes() {
  paginas.clear();
  busquedas.clear();
}
