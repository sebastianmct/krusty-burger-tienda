import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import ModalEliminar from "../../components/admin/ModalEliminar";
import { etiquetaCategoria } from "../../data/productos";
import { eliminarProducto, obtenerProducto } from "../../services/adminData";
import { formatoPrecio } from "../../utils/formato";

// Ficha de solo lectura de un producto: /admin/productos/:id
function AdminProductoFicha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto] = useState(() => obtenerProducto(id));
  const [confirmando, setConfirmando] = useState(false);

  function eliminar() {
    eliminarProducto(producto.id);
    navigate("/admin/productos", { state: { mensaje: "Producto eliminado correctamente." } });
  }

  return (
    <PaginaAdmin
      miga={
        <>
          <Link to="/admin/productos" className="text-decoration-none">
            Productos
          </Link>{" "}
          / Detalle
        </>
      }
      titulo={producto ? producto.nombre : "Producto"}
      acciones={
        <Link to="/admin/productos" className="btn btn-kb-secundario">
          <i className="ti ti-arrow-left"></i> Volver al listado
        </Link>
      }
    >
      <div id="ficha-producto" className="card-kb" style={{ maxWidth: 820 }}>
        {!producto ? (
          <div className="estado-vacio">
            <i className="ti ti-mood-empty"></i>
            <p className="mt-2">No encontramos ese producto. Puede que Snake se lo haya llevado.</p>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-md-4">
              <img src={producto.imagen} alt={producto.nombre} className="imagen-ficha" />
            </div>
            <div className="col-md-8">
              <dl className="ficha-solo-lectura mb-0">
                <dt>Código</dt>
                <dd>{producto.codigo}</dd>
                <dt>Nombre</dt>
                <dd>{producto.nombre}</dd>
                <dt>Categoría</dt>
                <dd>{etiquetaCategoria(producto.categoria)}</dd>
                <dt>Precio</dt>
                <dd>{formatoPrecio(producto.precio)}</dd>
                <dt>Stock</dt>
                <dd>{producto.stock}</dd>
                <dt>Stock crítico</dt>
                <dd>{producto.stockCritico != null ? producto.stockCritico : "No definido"}</dd>
                <dt>Descripción</dt>
                <dd>{producto.descripcion || "Sin descripción."}</dd>
              </dl>
              <div className="d-flex gap-2 mt-4">
                <Link
                  to={"/admin/productos/" + encodeURIComponent(producto.id) + "/editar"}
                  className="btn btn-kb-primario"
                >
                  <i className="ti ti-pencil"></i> Editar
                </Link>
                <button type="button" className="btn btn-outline-danger" onClick={() => setConfirmando(true)}>
                  <i className="ti ti-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ModalEliminar titulo="Eliminar producto" onConfirmar={eliminar} onCancelar={() => setConfirmando(false)}>
        {confirmando && (
          <>
            ¿Seguro que quieres eliminar <strong>{producto.nombre}</strong>? Esta acción no se puede deshacer.
          </>
        )}
      </ModalEliminar>
    </PaginaAdmin>
  );
}

export default AdminProductoFicha;
