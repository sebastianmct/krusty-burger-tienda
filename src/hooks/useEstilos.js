import { useLayoutEffect } from "react";

// Cada página de la tienda tiene su propia hoja de CSS (con reglas para body, :root, etc.).
// Si las cargáramos todas juntas en la app se pisarían entre sí, así que cada página
// agrega sus estilos cuando se muestra y los quita cuando se va.
//
//   estilos    -> lista de textos CSS (se importan con "?inline")
//   claseBody  -> (opcional) clase que se le pone al <body> mientras la página está abierta
export default function useEstilos(estilos, claseBody) {
  useLayoutEffect(() => {
    const etiquetas = estilos.map((css) => {
      const etiqueta = document.createElement("style");
      etiqueta.textContent = css;
      document.head.appendChild(etiqueta);
      return etiqueta;
    });
    if (claseBody) document.body.classList.add(claseBody);

    return () => {
      etiquetas.forEach((etiqueta) => etiqueta.remove());
      if (claseBody) document.body.classList.remove(claseBody);
    };
  }, [estilos, claseBody]);
}
