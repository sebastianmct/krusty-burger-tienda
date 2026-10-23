import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import ModalEliminar from "../../components/admin/ModalEliminar";
import ToastAdmin from "../../components/admin/ToastAdmin";
import { eliminarUsuario, listarUsuarios } from "../../services/adminData";
import { claseRol, colorAvatar, iniciales } from "../../utils/usuarios";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(listarUsuarios);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [toast, setToast] = useState("");

  const { state } = useLocation();
  const banner = state?.mensaje;

  const texto = busqueda.toLowerCase();
  const filtrados = usuarios.filter(
    (u) =>
      (u.nombre + " " + u.apellidos).toLowerCase().includes(texto) ||
      u.run.toLowerCase().includes(texto) ||
      u.correo.toLowerCase().includes(texto),
  );

  function confirmarEliminar() {
    eliminarUsuario(usuarioAEliminar.id);
    setUsuarios(listarUsuarios());
    setUsuarioAEliminar(null);
    setToast("Usuario eliminado correctamente.");
  }

  return (
    <PaginaAdmin
      miga="Panel administrador / Gestión"
      titulo="Usuarios"
      acciones={
        <Link to="/admin/usuarios/nuevo" className="btn btn-kb-primario">
          <i className="ti ti-user-plus"></i> <span className="d-none d-sm-inline">Nuevo usuario</span>
        </Link>
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
              id="buscador-usuarios"
              className="form-control"
              placeholder="Buscar por nombre, RUN o correo…"
              aria-label="Buscar usuarios"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>
          <span className="text-muted small">
            {filtrados.length + (filtrados.length === 1 ? " usuario" : " usuarios")}
          </span>
        </div>
        <div className="table-responsive">
          <table className="table tabla-admin mb-0">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>RUN</th>
                <th>Ubicación</th>
                <th>Tipo</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => {
                const nombreCompleto = u.nombre + " " + u.apellidos;
                return (
                  <tr key={u.id}>
                    <td className="celda-producto">
                      <div className="avatar-iniciales" style={{ background: colorAvatar(nombreCompleto) }}>
                        {iniciales(u.nombre, u.apellidos)}
                      </div>
                      <div>
                        <div className="fw-semibold">{nombreCompleto}</div>
                        <div className="subtexto">{u.correo}</div>
                      </div>
                    </td>
                    <td>{u.run}</td>
                    <td>{(u.comuna || "") + (u.region ? ", " + u.region : "")}</td>
                    <td>
                      <span className={"badge badge-rol " + claseRol(u.tipoUsuario)}>{u.tipoUsuario}</span>
                    </td>
                    <td className="text-end">
                      <div className="fila-acciones">
                        <Link
                          className="btn btn-sm btn-kb-secundario"
                          to={"/admin/usuarios/" + encodeURIComponent(u.id)}
                          title="Ver"
                        >
                          <i className="ti ti-eye"></i>
                        </Link>
                        <Link
                          className="btn btn-sm btn-kb-secundario"
                          to={"/admin/usuarios/" + encodeURIComponent(u.id) + "/editar"}
                          title="Editar"
                        >
                          <i className="ti ti-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          title="Eliminar"
                          onClick={() => setUsuarioAEliminar(u)}
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
            <i className="ti ti-users-group"></i>
            <p className="mt-2 mb-1">No hay usuarios que coincidan con la búsqueda.</p>
            <p className="text-muted small mb-0">Ni el jefe Wiggum encontró a nadie con esos datos.</p>
          </div>
        )}
      </div>

      <ModalEliminar
        titulo="Eliminar usuario"
        onConfirmar={confirmarEliminar}
        onCancelar={() => setUsuarioAEliminar(null)}
      >
        {usuarioAEliminar && (
          <>
            ¿Seguro que quieres eliminar a{" "}
            <strong>
              {usuarioAEliminar.nombre} {usuarioAEliminar.apellidos}
            </strong>
            ? Esta acción no se puede deshacer.
          </>
        )}
      </ModalEliminar>
      <ToastAdmin mensaje={toast} onCerrar={() => setToast("")} />
    </PaginaAdmin>
  );
}

export default AdminUsuarios;
