import { useEffect } from "react";

// Aviso pequeño abajo a la derecha que desaparece solo después de unos segundos.
//   mensaje  -> texto a mostrar (si está vacío no se muestra nada)
//   onCerrar -> se llama cuando el aviso se cierra
function ToastAdmin({ mensaje, onCerrar }) {
  useEffect(() => {
    if (!mensaje) return;
    const temporizador = setTimeout(onCerrar, 2600);
    return () => clearTimeout(temporizador);
    // solo depende del mensaje: así el aviso no se reinicia cada vez que la página se vuelve a dibujar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje]);

  if (!mensaje) return null;

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className="toast show align-items-center text-bg-dark border-0" role="status">
        <div className="d-flex">
          <div className="toast-body">{mensaje}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Cerrar"
            onClick={onCerrar}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default ToastAdmin;
