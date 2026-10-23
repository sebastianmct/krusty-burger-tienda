import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import ModalEliminar from "../../components/admin/ModalEliminar";
import ToastAdmin from "../../components/admin/ToastAdmin";
import { etiquetaCategoria } from "../../data/productos";
import { eliminarProducto, listarProductos } from "../../services/adminData";
import { formatoPrecio } from "../../utils/formato";

function AdminProductos() {
  const [productos, setProductos] = useState(listarProductos);
  const [busqueda, setBusqueda] = useState("");
  const [productoAEliminar, setProductoAEliminar] = useState(null); // producto que se va a confirmar
  const [toast, setToast] = useState("");

  // Mensaje que llega desde el formulario o la ficha (ej: "Producto guardado correctamente.")
  const { state } = useLocation();
  const banner = state?.mensaje;

  const texto = busqueda.toLowerCase();
  const filtrados = productos.filter(
    (p) => p.nombre.toLowerCase().includes(texto) || p.codigo.toLowerCase().includes(texto),
  );

  function confirmarEliminar() {
    eliminarProducto(productoAEliminar.id);
    setProductos(listarProductos());
    setProductoAEliminar(null);
    setToast("Producto eliminado correctamente.");
  }

  return (
    <PaginaAdmin
      miga="Panel administrador / Gestión"
      titulo="Productos"
      acciones={
        <>
          <Link to="/admin/productos/criticos" className="btn btn-kb-secundario">
            <i className="ti ti-alert-triangle"></i> <span className="d-none d-md-inline">Stock crítico</span>
          </Link>
          <Link to="/admin/productos/reportes" className="btn btn-kb-secundario">
            <i className="ti ti-chart-bar"></i> <span className="d-none d-md-inline">Reportes</span>
          </Link>
          <Link to="/admin/productos/nuevo" className="btn btn-kb-primario">
            <i className="ti ti-plus"></i> <span className="d-none d-sm-inline">Nuevo producto</span>
          </Link>
        </>
      }
    >
      {banner && (
        <div className="alert alert-success d-flex align-items-center gap-2">
          <i className="ti ti-circle-check"></i> <span>{banner}</span>
        </div>
      )}

      <div className="tabla-admin-wrap">
        <div className="tabla-admin-header">
          <div className="buscador flex-grow-1">
            <input
              type="search"
              id="buscador-productos"
              className="form-control"
              placeholder="Buscar por nombre o código…"
              aria-label="Buscar productos"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>
          <span className="text-muted small">
            {filtrados.length + (filtrados.length === 1 ? " producto" : " productos")}
          </span>
        </div>
        <div className="table-responsive">
          <table className="table tabla-admin mb-0">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => {
                const stockBajo = p.stockCritico != null && p.stock <= p.stockCritico;
                return (
                  <tr key={p.id}>
                    <td className="celda-producto">
                      <img src={p.imagen} alt="" />
                      <div>
                        <div className="fw-semibold">{p.nombre}</div>
                        <div className="subtexto">{p.codigo}</div>
                      </div>
                    </td>
                    <td>{etiquetaCategoria(p.categoria)}</td>
                    <td>{formatoPrecio(p.precio)}</td>
                    <td>
                      {p.stock}
                      {stockBajo && <span className="badge rounded-pill badge-stock-critico ms-1">Stock crítico</span>}
                    </td>
                    <td className="text-end">
                      <div className="fila-acciones">
                        <Link
                          className="btn btn-sm btn-kb-secundario"
                          to={"/admin/productos/" + encodeURIComponent(p.id)}
                          title="Ver"
                        >
                          <i className="ti ti-eye"></i>
                        </Link>
                        <Link
                          className="btn btn-sm btn-kb-secundario"
                          to={"/admin/productos/" + encodeURIComponent(p.id) + "/editar"}
                          title="Editar"
                        >
                          <i className="ti ti-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          title="Eliminar"
                          onClick={() => setProductoAEliminar(p)}
                        >
                          <i className="ti ti-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtrados.length === 0 && (
          <div className="estado-vacio">
            <i className="ti ti-burger-off"></i>
            <p className="mt-2 mb-1">No hay productos que coincidan con la búsqueda.</p>
            <p className="text-muted small mb-0">Juan Topo se llevó el resto del inventario.</p>
          </div>
        )}
      </div>

      <ModalEliminar
        titulo="Eliminar producto"
        onConfirmar={confirmarEliminar}
        onCancelar={() => setProductoAEliminar(null)}
      >
        {productoAEliminar && (
          <>
            ¿Seguro que quieres eliminar <strong>{productoAEliminar.nombre}</strong>? Esta acción no se puede deshacer
            (ni Krusty podrá recuperarlo).
          </>
        )}
      </ModalEliminar>
      <ToastAdmin mensaje={toast} onCerrar={() => setToast("")} />
    </PaginaAdmin>
  );
}

export default AdminProductos;
