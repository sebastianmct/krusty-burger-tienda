export const TIPOS_USUARIO = ["Administrador", "Vendedor", "Cliente"];

export function iniciales(nombre, apellidos) {
  return ((nombre || "").charAt(0) + (apellidos || "").charAt(0)).toUpperCase();
}

export function colorAvatar(texto) {
  const paleta = ["#d9121d", "#1A1A1A", "#c77b00", "#5b4636", "#7a1f1f"];
  let suma = 0;
  for (let i = 0; i < texto.length; i++) {
    suma += texto.charCodeAt(i);
  }
  return paleta[suma % paleta.length];
}

export function claseRol(tipo) {
  return "rol-" + (tipo || "").toLowerCase();
}
