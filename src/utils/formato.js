// Muestra un número como precio chileno: 4990 -> "$4.990"
export function formatoPrecio(valor) {
  return "$" + Number(valor || 0).toLocaleString("es-CL");
}

// "2026-10-21T15:30:00.000Z" -> "21-10-2026 12:30" (hora de Chile)
export function formatoFechaHora(fechaIso) {
  return new Date(fechaIso).toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" });
}
