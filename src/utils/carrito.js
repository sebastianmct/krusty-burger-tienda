// Calcula los totales del carrito.
// Recibe una lista de líneas: [{ precio: 4990, cantidad: 2 }, ...]
export function calcularTotales(lineas) {
  const subtotal = lineas.reduce((total, linea) => total + linea.precio * linea.cantidad, 0);
  const impuestos = Math.round(subtotal * 0.19);
  const despacho = subtotal > 0 ? 2100 : 0;
  return { subtotal, impuestos, despacho, total: subtotal + impuestos + despacho };
}
