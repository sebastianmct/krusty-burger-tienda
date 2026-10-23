// Muestra (solo lectura) los datos del cliente y la dirección de entrega de una orden
//   orden -> { cliente: {...}, entrega: {...} }
function DatosCompra({ orden }) {
  const { cliente, entrega } = orden;

  return (
    <>
      <h2>Información del cliente</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <span className="kb-checkout-label">Nombre</span>
          <input className="kb-checkout-input" value={cliente.nombre} readOnly />
        </div>
        <div className="col-md-4">
          <span className="kb-checkout-label">Apellidos</span>
          <input className="kb-checkout-input" value={cliente.apellidos} readOnly />
        </div>
        <div className="col-md-4">
          <span className="kb-checkout-label">Correo</span>
          <input className="kb-checkout-input" value={cliente.correo} readOnly />
        </div>
      </div>

      <h2>Dirección de entrega</h2>
      <div className="row g-3">
        <div className="col-md-8">
          <span className="kb-checkout-label">Calle</span>
          <input className="kb-checkout-input" value={entrega.calle} readOnly />
        </div>
        <div className="col-md-4">
          <span className="kb-checkout-label">Departamento</span>
          <input className="kb-checkout-input" value={entrega.departamento || "-"} readOnly />
        </div>
        <div className="col-md-6">
          <span className="kb-checkout-label">Región</span>
          <input className="kb-checkout-input" value={entrega.region} readOnly />
        </div>
        <div className="col-md-6">
          <span className="kb-checkout-label">Comuna</span>
          <input className="kb-checkout-input" value={entrega.comuna} readOnly />
        </div>
        <div className="col-12">
          <span className="kb-checkout-label">Indicaciones para la entrega</span>
          <textarea
            className="kb-checkout-input"
            value={entrega.indicaciones || "Sin indicaciones."}
            rows="2"
            readOnly
          />
        </div>
      </div>
    </>
  );
}

export default DatosCompra;
