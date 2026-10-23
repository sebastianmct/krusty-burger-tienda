import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import { obtenerOrden } from "../../services/adminData";
import { formatoFechaHora, formatoPrecio } from "../../utils/formato";

// Boleta de una orden: /admin/ordenes/:id
function AdminBoleta() {
  const { id } = useParams();
  const [orden] = useState(() => obtenerOrden(id));

  return (
    <PaginaAdmin
      miga={
        <>
          <Link to="/admin/ordenes" className="text-decoration-none">
            Órdenes
          </Link>{" "}
          / Boleta
        </>
      }
      titulo={orden ? "Boleta #" + orden.numero : "Boleta"}
      acciones={
        <Link to="/admin/ordenes" className="btn btn-kb-secundario">
          <i className="ti ti-arrow-left"></i> Volver al listado
        </Link>
      }
    >
      <div className="card-kb" style={{ maxWidth: 820 }}>
        {!orden ? (
          <div className="estado-vacio">
            <i className="ti ti-mood-empty"></i>
            <p className="mt-2">No encontramos esa orden.</p>
          </div>
        ) : (
          <>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div>
                <p className="seccion-titulo mb-0">Orden #{orden.numero}</p>
                <p className="text-muted small mb-0">{formatoFechaHora(orden.fecha)}</p>
              </div>
              <span className={"badge fs-6 " + (orden.estado === "Pagada" ? "text-bg-success" : "text-bg-danger")}>
                {orden.estado}
              </span>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <p className="seccion-titulo">Cliente</p>
                <dl className="ficha-solo-lectura mb-0">
                  <dt>Nombre</dt>
                  <dd>
                    {orden.cliente.nombre} {orden.cliente.apellidos}
                  </dd>
                  <dt>Correo</dt>
                  <dd>{orden.cliente.correo}</dd>
                </dl>
              </div>
              <div className="col-md-6">
                <p className="seccion-titulo">Entrega</p>
                <dl className="ficha-solo-lectura mb-0">
                  <dt>Dirección</dt>
                  <dd>
                    {orden.entrega.calle}
                    {orden.entrega.departamento && ", depto " + orden.entrega.departamento}
                  </dd>
                  <dt>Comuna / Región</dt>
                  <dd>
                    {orden.entrega.comuna}, {orden.entrega.region}
                  </dd>
                  <dt>Indicaciones</dt>
                  <dd>{orden.entrega.indicaciones || "Sin indicaciones."}</dd>
                </dl>
              </div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table tabla-admin mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th className="text-end">Precio</th>
                    <th className="text-end">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orden.lineas.map((linea) => (
                    <tr key={linea.id}>
                      <td className="celda-producto">
                        <img src={linea.imagen} alt="" />
                        <div className="fw-semibold">{linea.nombre}</div>
                      </td>
                      <td className="text-end">{formatoPrecio(linea.precio)}</td>
                      <td className="text-end">{linea.cantidad}</td>
                      <td className="text-end">{formatoPrecio(linea.precio * linea.cantidad)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="ficha-solo-lectura mt-3 mb-0">
              <dt>Subtotal</dt>
              <dd>{formatoPrecio(orden.totales.subtotal)}</dd>
              <dt>Impuestos (19%)</dt>
              <dd>{formatoPrecio(orden.totales.impuestos)}</dd>
              <dt>Despacho</dt>
              <dd>{formatoPrecio(orden.totales.despacho)}</dd>
              <dt>Total</dt>
              <dd className="fw-bold">{formatoPrecio(orden.totales.total)}</dd>
            </dl>

            <button type="button" className="btn btn-kb-primario mt-4" onClick={() => window.print()}>
              <i className="ti ti-printer"></i> Imprimir boleta
            </button>
          </>
        )}
      </div>
    </PaginaAdmin>
  );
}

export default AdminBoleta;
