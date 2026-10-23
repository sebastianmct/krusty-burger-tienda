// Ventana de confirmación para eliminar (usa las clases de modal de Bootstrap).
//   titulo      -> ej: "Eliminar producto"
//   children    -> el mensaje de confirmación
//   onConfirmar -> se llama al presionar "Sí, eliminar"
//   onCancelar  -> se llama al cancelar o cerrar
// Si no se pasa "children" la ventana no se muestra.
function ModalEliminar({ titulo, children, onConfirmar, onCancelar }) {
  if (!children) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="ti ti-alert-triangle text-danger"></i> {titulo}
              </h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancelar}></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">{children}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-kb-secundario" onClick={onCancelar}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={onConfirmar}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onCancelar}></div>
    </>
  );
}

export default ModalEliminar;
