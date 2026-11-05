import { useRef, useState } from "react";
import { useSonidoOpcional } from "../hooks/useSonido";

function GaleriaProducto({ producto }) {
  const [fotoActiva, setFotoActiva] = useState(0);
  const inicioDeslizamiento = useRef(null);
  const contextoSonido = useSonidoOpcional();
  const galeriaId = "galeria-" + producto.id;
  const cantidadFotos = producto.imagenes.length;

  function cambiarVista(indice) {
    if (indice === fotoActiva) return;
    contextoSonido?.reproducir(
      indice > fotoActiva ? "skip-next" : "skip-previous",
    );
    setFotoActiva(indice);
  }

  function iniciarDeslizamiento(evento) {
    if (evento.pointerType === "touch") {
      inicioDeslizamiento.current = evento.clientX;
      evento.currentTarget.setPointerCapture?.(evento.pointerId);
    }
  }

  function finalizarDeslizamiento(evento) {
    if (inicioDeslizamiento.current === null) return;

    const desplazamiento = evento.clientX - inicioDeslizamiento.current;
    inicioDeslizamiento.current = null;
    if (Math.abs(desplazamiento) < 40 || cantidadFotos < 2) return;

    const direccion = desplazamiento < 0 ? 1 : -1;
    setFotoActiva(
      (actual) => (actual + direccion + cantidadFotos) % cantidadFotos,
    );
    contextoSonido?.reproducir("swipe");
  }

  return (
    <div
      className="galeria"
      aria-label={"Galería de " + producto.nombre}
      onPointerDown={iniciarDeslizamiento}
      onPointerUp={finalizarDeslizamiento}
      onPointerCancel={() => {
        inicioDeslizamiento.current = null;
      }}
    >
      {producto.imagenes.map((imagen, indice) => (
        <input
          key={indice}
          type="radio"
          name={galeriaId}
          id={galeriaId + "-" + (indice + 1)}
          checked={fotoActiva === indice}
          onChange={() => cambiarVista(indice)}
        />
      ))}

      <div className="visor">
        {producto.imagenes.map((imagen, indice) => (
          <img
            key={indice}
            className={"foto-" + (indice + 1)}
            src={imagen}
            alt={producto.alt + ", vista " + (indice + 1)}
          />
        ))}
      </div>

      <div className="miniaturas">
        {producto.imagenes.map((imagen, indice) => (
          <label key={indice} htmlFor={galeriaId + "-" + (indice + 1)}>
            <img
              src={imagen}
              alt={"Ver " + producto.alt + ", vista " + (indice + 1)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default GaleriaProducto;
