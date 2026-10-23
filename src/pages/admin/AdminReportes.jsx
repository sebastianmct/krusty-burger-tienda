import PaginaAdmin from "../../components/admin/PaginaAdmin";
import { listarOrdenes, listarUsuarios } from "../../services/adminData";
import { formatoPrecio } from "../../utils/formato";

// Reporte general de ventas y usuarios: /admin/reportes
function AdminReportes() {
  const ordenes = listarOrdenes();
  const pagadas = ordenes.filter((o) => o.estado === "Pagada");
  const rechazadas = ordenes.length - pagadas.length;
  const ingresos = pagadas.reduce((total, o) => total + o.totales.total, 0);
  const ticketPromedio = pagadas.length > 0 ? Math.round(ingresos / pagadas.length) : 0;

  // Suma las unidades vendidas de cada producto (solo órdenes pagadas)
  const vendidos = {};
  pagadas.forEach((orden) => {
    orden.lineas.forEach((linea) => {
      if (!vendidos[linea.id]) vendidos[linea.id] = { nombre: linea.nombre, unidades: 0, ingresos: 0 };
      vendidos[linea.id].unidades += linea.cantidad;
      vendidos[linea.id].ingresos += linea.precio * linea.cantidad;
    });
  });
  const masVendidos = Object.values(vendidos)
    .sort((a, b) => b.unidades - a.unidades)
    .slice(0, 5);

  // Cantidad de usuarios por tipo
  const usuarios = listarUsuarios();
  const tipos = ["Administrador", "Vendedor", "Cliente"].map((tipo) => ({
    tipo,
    cantidad: usuarios.filter((u) => u.tipoUsuario === tipo).length,
  }));

  return (
    <PaginaAdmin miga="Panel administrador / Análisis" titulo="Reportes">
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Compras pagadas</p>
            <p className="stat-valor">{pagadas.length}</p>
            <p className="stat-nota">Órdenes aprobadas</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card acento-oscuro">
            <p className="stat-label">Ingresos</p>
            <p className="stat-valor">{formatoPrecio(ingresos)}</p>
            <p className="stat-nota">Total vendido</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card acento-amarillo">
            <p className="stat-label">Ticket promedio</p>
            <p className="stat-valor">{formatoPrecio(ticketPromedio)}</p>
            <p className="stat-nota">Por compra</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Pagos rechazados</p>
            <p className="stat-valor">{rechazadas}</p>
            <p className="stat-nota">Intentos fallidos</p>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="tabla-admin-wrap h-100">
            <div className="tabla-admin-header">
              <p className="seccion-titulo mb-0">Productos más vendidos</p>
            </div>
            <div className="table-responsive">
              <table className="table tabla-admin mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Unidades</th>
                    <th>Ingresos</th>
                  </tr>
                </thead>
                <tbody>
                  {masVendidos.map((v) => (
                    <tr key={v.nombre}>
                      <td className="fw-semibold">{v.nombre}</td>
                      <td>{v.unidades}</td>
                      <td>{formatoPrecio(v.ingresos)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {masVendidos.length === 0 && (
              <div className="estado-vacio">
                <i className="ti ti-chart-bar-off"></i>
                <p className="mt-2 mb-0">Aún no hay ventas registradas.</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="tabla-admin-wrap h-100">
            <div className="tabla-admin-header">
              <p className="seccion-titulo mb-0">Usuarios por tipo</p>
            </div>
            <div className="table-responsive">
              <table className="table tabla-admin mb-0">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {tipos.map((t) => (
                    <tr key={t.tipo}>
                      <td>
                        <span className={"badge badge-rol rol-" + t.tipo.toLowerCase()}>{t.tipo}</span>
                      </td>
                      <td>{t.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PaginaAdmin>
  );
}

export default AdminReportes;
