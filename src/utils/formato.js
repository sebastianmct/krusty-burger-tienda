export function formatoPrecio(valor) {
  return "$" + Number(valor || 0).toLocaleString("es-CL");
}

export function formatoFechaHora(fechaIso) {
  return new Date(fechaIso).toLocaleString("es-CL", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
