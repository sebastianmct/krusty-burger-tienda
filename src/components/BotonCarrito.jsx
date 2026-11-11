import { useEffect, useRef } from "react";
import {
  CURVA_PLANA,
  DETALLES_HAMBURGUESA,
  HAMBURGUESA,
  ajustarReposoBoton,
  animarBotonCarrito,
  detenerBotonCarrito,
  presionarBoton,
  soltarBoton,
} from "../animaciones/botonCarrito";

function BotonCarrito({ children, className = "", onClick, ...resto }) {
  const botonRef = useRef(null);
  const animacionRef = useRef(null);

  useEffect(() => {
    const boton = botonRef.current;
    if (!boton) return undefined;
    ajustarReposoBoton(boton);

    let observador;
    if (typeof ResizeObserver !== "undefined") {
      observador = new ResizeObserver(() => ajustarReposoBoton(boton));
      observador.observe(boton);
      const texto = boton.querySelector(".kb-add-texto");
      if (texto) observador.observe(texto);
    }

    return () => {
      if (observador) observador.disconnect();
      detenerBotonCarrito(boton, animacionRef.current);
    };
  }, []);

  function alHacerClic(evento) {
    if (onClick) onClick(evento);
    const animacion = animarBotonCarrito(botonRef.current);
    if (animacion) animacionRef.current = animacion;
  }

  return (
    <button
      type="button"
      {...resto}
      ref={botonRef}
      className={"kb-add-to-cart " + className}
      onClick={alHacerClic}
      onPointerDown={() => presionarBoton(botonRef.current)}
      onPointerLeave={() => soltarBoton(botonRef.current)}
      onPointerCancel={() => soltarBoton(botonRef.current)}
    >
      <span className="kb-add-texto">{children}</span>
      <svg
        className="kb-add-curva"
        viewBox="0 0 64 13"
        aria-hidden="true"
        focusable="false"
      >
        <path d={CURVA_PLANA} />
      </svg>
      <span className="kb-add-burger" aria-hidden="true">
        <svg className="primero" viewBox="0 0 24 24" focusable="false">
          <path d={HAMBURGUESA.reposo} />
          <g>
            {DETALLES_HAMBURGUESA.map((detalle) => (
              <path key={detalle} d={detalle} />
            ))}
          </g>
        </svg>
        <svg className="segundo" viewBox="0 0 24 24" focusable="false">
          <path d={HAMBURGUESA.reposo} />
          <g>
            {DETALLES_HAMBURGUESA.map((detalle) => (
              <path key={detalle} d={detalle} />
            ))}
          </g>
        </svg>
      </span>
      <span className="kb-add-cart" aria-hidden="true">
        <svg viewBox="0 0 36 26" focusable="false">
          <path
            d="M1 2.5H6L10 18.5H25.5L28.5 7.5L7.5 7.5"
            className="forma"
          />
          <path
            d="M11.5 25C12.6046 25 13.5 24.1046 13.5 23C13.5 21.8954 12.6046 21 11.5 21C10.3954 21 9.5 21.8954 9.5 23C9.5 24.1046 10.3954 25 11.5 25Z"
            className="rueda"
          />
          <path
            d="M24 25C25.1046 25 26 24.1046 26 23C26 21.8954 25.1046 21 24 21C22.8954 21 22 21.8954 22 23C22 24.1046 22.8954 25 24 25Z"
            className="rueda"
          />
          <path d="M14.5 13.5L16.5 15.5L21.5 10.5" className="visto" />
        </svg>
      </span>
    </button>
  );
}

export default BotonCarrito;
