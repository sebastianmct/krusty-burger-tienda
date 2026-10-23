import { Link } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import { etiquetaCategoria } from "../../data/productos";
import { listarProductos } from "../../services/adminData";

// Productos cuyo stock llegó (o bajó de) su stock crítico: /admin/productos/criticos
function AdminProductosCriticos() {
  const criticos = listarProductos()
    .filter((p) => p.stockCritico != null && p.stock <= p.stockCritico)
    .sort((a, b) => a.stock - a.stockCritico - (b.stock - b.stockCritico)); // primero los más urgentes

  return (
    <PaginaAdmin
      miga={
        <>
          <Link to="/admin/productos" className="text-decoration-none">
            Productos
          </Link>{" "}
          / Stock crítico
        </>
      }
      titulo="Productos con stock crítico"
      acciones={
        <Link to="/admin/productos" className="btn btn-kb-secundario">
          <i className="ti ti-arrow-left"></i> Volver a productos
        </Link>
      }
    >
      <div className="tabla-admin-wrap">
        <div className="tabla-admin-header">
          <div>
            <p className="seccion-titulo mb-0">Productos por reponer</p>
            <p className="text-muted small mb-0">Su stock es igual o menor al stock crítico definido.</p>
          </div>
          <span className="text-muted small ms-auto">{criticos.length} productos</span>
        </div>
        <div className="table-responsive">
          <table className="table tabla-admin mb-0">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Crítico</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {criticos.map((p) => (
                <tr key={p.id}>
                  <td className="celda-producto">
                    <img src={p.imagen} alt="" />
                    <div>
                      <div className="fw-semibold">{p.nombre}</div>
                      <div className="subtexto">{p.codigo}</div>
                    </div>
                  </td>
                  <td>{etiquetaCategoria(p.categoria)}</td>
                  <td>
                    <span className="badge rounded-pill badge-stock-critico">{p.stock}</span>
                  </td>
                  <td>{p.stockCritico}</td>
                  <td className="text-end">
                    <div className="fila-acciones">
                      <Link
                        className="btn btn-sm btn-kb-secundario"
                        to={"/admin/productos/" + encodeURIComponent(p.id) + "/editar"}
                        title="Reponer stock"
                      >
                        <i className="ti ti-pencil"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {criticos.length === 0 && (
          <div className="estado-vacio">
            <i className="ti ti-mood-smile"></i>
            <p className="mt-2 mb-0">Todo en orden: ningún producto está en stock crítico.</p>
          </div>
        )}
      </div>
    </PaginaAdmin>
  );
}

export default AdminProductosCriticos;
