// Registro e inicio de sesión. Los usuarios se guardan con el mismo "backend" del admin
// (localStorage), así toda cuenta creada en /registro aparece también en el panel.
// La sesión activa se guarda en sessionStorage (se borra al cerrar la pestaña).

import { listarUsuarios, guardarUsuario } from "./adminData";
import { normalizarRun } from "../utils/validaciones";

const CLAVE_SESION = "krustySesion";
const DOMINIO_ADMIN = "duoc.cl";

function buscarPorCorreo(correo) {
  const buscado = (correo || "").trim().toLowerCase();
  return listarUsuarios().find((usuario) => (usuario.correo || "").trim().toLowerCase() === buscado) || null;
}

// Los correos @duoc.cl son administradores; el resto, clientes
function tipoDeUsuario(correo) {
  const dominio = (correo.split("@")[1] || "").trim().toLowerCase();
  return dominio === DOMINIO_ADMIN ? "Administrador" : "Cliente";
}

// Devuelve { ok: true, usuario } o { ok: false, error }
export function registrar(datos) {
  const correo = datos.correo.trim().toLowerCase();

  if (buscarPorCorreo(correo)) {
    return { ok: false, error: "Ya existe una cuenta registrada con ese correo." };
  }

  const usuario = guardarUsuario({
    run: normalizarRun(datos.run),
    nombre: datos.nombre.trim(),
    apellidos: datos.apellidos.trim(),
    correo,
    password: datos.password,
    fechaNacimiento: datos.fechaNacimiento || "",
    region: datos.region,
    comuna: datos.comuna,
    direccion: datos.direccion.trim(),
    tipoUsuario: tipoDeUsuario(correo),
  });
  return { ok: true, usuario };
}

// Devuelve { ok: true, usuario } o { ok: false, error }. Si es correcto guarda la sesión.
export function iniciarSesion(correo, password) {
  const usuario = buscarPorCorreo(correo);
  if (!usuario || usuario.password !== password) {
    return { ok: false, error: "Correo o contraseña incorrectos." };
  }

  const sesion = {
    id: usuario.id,
    correo: usuario.correo,
    nombre: usuario.nombre,
    tipoUsuario: usuario.tipoUsuario,
  };
  sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  return { ok: true, usuario };
}

export function obtenerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE_SESION) || "null");
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
}
