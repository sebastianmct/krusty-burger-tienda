import { FRASE_SKINNER } from "../data/frases";

export function normalizar(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export const ID_COMBO_TRADICIONAL = "combo-tradicional";

export function buscarProductos(catalogo, consulta) {
  const texto = normalizar(consulta);
  if (!texto) return { productos: catalogo, especial: null };

  if (texto.includes("hamburguesa") && texto.includes("al vapor")) {
    return {
      productos: catalogo.filter(
        (producto) => producto.id === ID_COMBO_TRADICIONAL,
      ),
      especial: { quien: "skinner", frase: FRASE_SKINNER },
    };
  }

  const productos = catalogo.filter((producto) => {
    const contenido = [
      producto.nombre,
      producto.original,
      producto.descripcion,
      producto.categoriaLabel,
      (producto.ingredientes || []).join(" "),
    ].join(" ");
    return normalizar(contenido).includes(texto);
  });
  return { productos, especial: null };
}
