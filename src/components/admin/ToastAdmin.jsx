import { useEffect } from "react";

function ToastAdmin({ mensaje, onCerrar, error = false }) {
  useEffect(() => {
    if (!mensaje) return;
    const temporizador = setTimeout(onCerrar, 2600);
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  if (!mensaje) return null;

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        className="toast show align-items-center text-bg-dark border-0"
        role="status"
      >
        <div className="d-flex">
          <div className="toast-body">
            {error && <strong>¡D'oh! </strong>}
            {mensaje}
          </div>
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
