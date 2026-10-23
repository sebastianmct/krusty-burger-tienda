import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import ModalEliminar from "../../components/admin/ModalEliminar";
import ToastAdmin from "../../components/admin/ToastAdmin";
import { eliminarCategoria, listarCategorias, listarProductos } from "../../services/adminData";

function AdminCategorias() {
  const [categorias, setCategorias] = useState(listarCategorias);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [toast, setToast] = useState("");

  const { state } = useLocation();
  const banner = state?.mensaje;

  const productos = listarProductos();

  function confirmarEliminar() {
    const resultado = eliminarCategoria(categoriaAEliminar.valor);
    setToast(resultado.ok ? "Categoría eliminada correctamente." : resultado.error);
    setCategorias(listarCategorias());
    setCategoriaAEliminar(null);
  }

  return (
    <PaginaAdmin
      miga="Panel administrador / Gestión"
      titulo="Categorías"
      acciones={
        <Link to="/admin/categorias/nueva" className="btn btn-kb-primario">
          <i className="ti ti-plus"></i> <span className="d-none d-sm-inline">Nueva categoría</span>
        </Link>
      }
    >
      {banner && (
        <div className="alert alert-success d-flex align-items-center gap-2">
          <i className="ti ti-circle-check"></i> <span>{banner}</span>
        </div>
      )}

      <div className="tabla-admin-wrap">
        <div className="table-responsive">
          <table className="table tabla-admin mb-0">
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Productos</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.valor}>
                  <td>
                    <div className="fw-semibold">
                      <i className={"ti " + c.icono}></i> {c.etiqueta}
                    </div>
                    <div className="subtexto">{c.valor}</div>
                  </td>
                  <td>{c.descripcion || "-"}</td>
                  <td>{productos.filter((p) => p.categoria === c.valor).length}</td>
                  <td className="text-end">
                    <div className="fila-acciones">
                      <Link
                        className="btn btn-sm btn-kb-secundario"
                        to={"/admin/categorias/" + c.valor + "/editar"}
                        title="Editar"
                      >
                        <i className="ti ti-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        type="button"
                        title="Eliminar"
                        onClick={() => setCategoriaAEliminar(c)}
                      >
                        <i className="ti ti-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalEliminar
        titulo="Eliminar categoría"
        onConfirmar={confirmarEliminar}
        onCancelar={() => setCategoriaAEliminar(null)}
      >
        {categoriaAEliminar && (
          <>
            ¿Seguro que quieres eliminar la categoría <strong>{categoriaAEliminar.etiqueta}</strong>? Solo se puede
            eliminar si no tiene productos.
          </>
        )}
      </ModalEliminar>
      <ToastAdmin mensaje={toast} onCerrar={() => setToast("")} />
    </PaginaAdmin>
  );
}

export default AdminCategorias;
