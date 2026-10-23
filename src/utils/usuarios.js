// Pequeñas utilidades para mostrar usuarios en el admin

export const TIPOS_USUARIO = ["Administrador", "Vendedor", "Cliente"];

// "Homero", "Simpson" -> "HS"
export function iniciales(nombre, apellidos) {
  return ((nombre || "").charAt(0) + (apellidos || "").charAt(0)).toUpperCase();
}

// Cada persona recibe siempre el mismo color de avatar (según las letras de su nombre)
export function colorAvatar(texto) {
  const paleta = ["#d9121d", "#1A1A1A", "#c77b00", "#5b4636", "#7a1f1f"];
  let suma = 0;
  for (let i = 0; i < texto.length; i++) {
    suma += texto.charCodeAt(i);
  }
  return paleta[suma % paleta.length];
}

// "Administrador" -> "rol-administrador" (clase CSS del badge)
export function claseRol(tipo) {
  return "rol-" + (tipo || "").toLowerCase();
}
