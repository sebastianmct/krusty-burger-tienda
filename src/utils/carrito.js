import { buscarProducto, esHamburguesaPesada } from "../data/productos";

export function calcularTotales(lineas, extra = 0) {
  const subtotal = lineas.reduce(
    (total, linea) => total + linea.precio * linea.cantidad,
    0,
  );
  const impuestos = Math.round(subtotal * 0.19);
  const despacho = subtotal > 0 ? 2100 : 0;
  const cobroExtra = subtotal > 0 ? extra : 0;
  return {
    subtotal,
    impuestos,
    despacho,
    extra: cobroExtra,
    total: subtotal + impuestos + despacho + cobroExtra,
  };
}

export function contarHamburguesasPesadas(items) {
  return items.reduce((total, item) => {
    const producto = buscarProducto(item.id);
    return producto && esHamburguesaPesada(producto)
      ? total + item.cantidad
      : total;
  }, 0);
}

export function hayBebidas(items) {
  return items.some((item) => {
    const producto = buscarProducto(item.id);
    return producto && producto.categoria === "bebidas";
  });
}

export const COSTO_ENTREGA_DUFFMAN = 1990;
