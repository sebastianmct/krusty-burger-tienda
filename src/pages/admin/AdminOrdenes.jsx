import { useState } from "react";
import { Link } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import { listarOrdenes } from "../../services/adminData";
import { formatoFechaHora, formatoPrecio } from "../../utils/formato";

// Listado de órdenes de compra (boletas)
function AdminOrdenes() {
  const [ordenes] = useState(listarOrdenes);
  const [busqueda, setBusqueda] = useState("");

  const texto = busqueda.toLowerCase();
  const filtradas = ordenes.filter(
    (o) =>
      o.numero.includes(texto) ||
      (o.cliente.nombre + " " + o.cliente.apellidos).toLowerCase().includes(texto) ||
      o.cliente.correo.toLowerCase().includes(texto),
  );

  return (
    <PaginaAdmin miga="Panel administrador / Gestión" titulo="Órdenes y boletas">
      <div className="tabla-admin-wrap">
        <div className="tabla-admin-header">
          <div className="buscador flex-grow-1">
            <input
              type="search"
              className="form-control"
              placeholder="Buscar por número, cliente o correo…"
              aria-label="Buscar órdenes"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>
          <span className="text-muted small">
            {filtradas.length + (filtradas.length === 1 ? " orden" : " órdenes")}
          </span>
        </div>
        <div className="table-responsive">
          <table className="table tabla-admin mb-0">
            <thead>
              <tr>
                <th>N° orden</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((o) => (
                <tr key={o.id}>
                  <td className="fw-semibold">#{o.numero}</td>
                  <td>{formatoFechaHora(o.fecha)}</td>
                  <td>
                    <div className="fw-semibold">
                      {o.cliente.nombre} {o.cliente.apellidos}
                    </div>
                    <div className="subtexto">{o.cliente.correo}</div>
                  </td>
                  <td>{formatoPrecio(o.totales.total)}</td>
                  <td>
                    <span className={"badge " + (o.estado === "Pagada" ? "text-bg-success" : "text-bg-danger")}>
                      {o.estado}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="fila-acciones">
                      <Link className="btn btn-sm btn-kb-secundario" to={"/admin/ordenes/" + o.id} title="Ver boleta">
                        <i className="ti ti-eye"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtradas.length === 0 && (
          <div className="estado-vacio">
            <i className="ti ti-receipt-off"></i>
            <p className="mt-2 mb-1">No hay órdenes todavía.</p>
            <p className="text-muted small mb-0">Cuando un cliente pague en la tienda, la boleta aparecerá aquí.</p>
          </div>
        )}
      </div>
    </PaginaAdmin>
  );
}

export default AdminOrdenes;
