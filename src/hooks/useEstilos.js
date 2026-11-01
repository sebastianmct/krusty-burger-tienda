import { useLayoutEffect } from "react";

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
