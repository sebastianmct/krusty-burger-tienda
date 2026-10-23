import { Link } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import { etiquetaCategoria } from "../../data/productos";
import { listarProductos } from "../../services/adminData";
import { formatoPrecio } from "../../utils/formato";

// Reporte de inventario por categoría: /admin/productos/reportes
function AdminReportesProductos() {
  const productos = listarProductos();

  const stockTotal = productos.reduce((total, p) => total + p.stock, 0);
  const valorTotal = productos.reduce((total, p) => total + p.precio * p.stock, 0);
  const criticos = productos.filter((p) => p.stockCritico != null && p.stock <= p.stockCritico).length;

  // Agrupa los productos por categoría y suma su stock y su valor
  const porCategoria = {};
  productos.forEach((p) => {
    if (!porCategoria[p.categoria])
      porCategoria[p.categoria] = { categoria: p.categoria, productos: 0, stock: 0, valor: 0 };
    porCategoria[p.categoria].productos += 1;
    porCategoria[p.categoria].stock += p.stock;
    porCategoria[p.categoria].valor += p.precio * p.stock;
  });
  const filas = Object.values(porCategoria).sort((a, b) => b.valor - a.valor);

  return (
    <PaginaAdmin
      miga={
        <>
          <Link to="/admin/productos" className="text-decoration-none">
            Productos
          </Link>{" "}
          / Reportes
        </>
      }
      titulo="Reporte de inventario"
      acciones={
        <Link to="/admin/productos" className="btn btn-kb-secundario">
          <i className="ti ti-arrow-left"></i> Volver a productos
        </Link>
      }
    >
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Productos</p>
            <p className="stat-valor">{productos.length}</p>
            <p className="stat-nota">En el catálogo</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card acento-oscuro">
            <p className="stat-label">Stock total</p>
            <p className="stat-valor">{stockTotal}</p>
            <p className="stat-nota">Unidades disponibles</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Valor de inventario</p>
            <p className="stat-valor">{formatoPrecio(valorTotal)}</p>
            <p className="stat-nota">Precio × stock</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card acento-amarillo">
            <p className="stat-label">Stock crítico</p>
            <p className="stat-valor">{criticos}</p>
            <p className="stat-nota">
              <Link to="/admin/productos/criticos">Ver listado</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="tabla-admin-wrap">
        <div className="tabla-admin-header">
          <p className="seccion-titulo mb-0">Inventario por categoría</p>
        </div>
        <div className="table-responsive">
          <table className="table tabla-admin mb-0">
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Productos</th>
                <th>Stock</th>
                <th>Valor</th>
                <th>% del inventario</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((fila) => {
                const porcentaje = valorTotal > 0 ? Math.round((fila.valor / valorTotal) * 100) : 0;
                return (
                  <tr key={fila.categoria}>
                    <td className="fw-semibold">{etiquetaCategoria(fila.categoria)}</td>
                    <td>{fila.productos}</td>
                    <td>{fila.stock}</td>
                    <td>{formatoPrecio(fila.valor)}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="barra-reporte flex-grow-1">
                          <span style={{ width: porcentaje + "%" }}></span>
                        </div>
                        <small>{porcentaje}%</small>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PaginaAdmin>
  );
}

export default AdminReportesProductos;
