import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import ModalEliminar from "../../components/admin/ModalEliminar";
import { eliminarUsuario, listarOrdenesDeCorreo, obtenerUsuario } from "../../services/adminData";
import { formatoFechaHora, formatoPrecio } from "../../utils/formato";
import { claseRol, colorAvatar, iniciales } from "../../utils/usuarios";

// Ficha de solo lectura de un usuario: /admin/usuarios/:id
function AdminUsuarioFicha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario] = useState(() => obtenerUsuario(id));
  const [confirmando, setConfirmando] = useState(false);

  const compras = usuario ? listarOrdenesDeCorreo(usuario.correo) : [];
  const nombreCompleto = usuario ? usuario.nombre + " " + usuario.apellidos : "";

  function eliminar() {
    eliminarUsuario(usuario.id);
    navigate("/admin/usuarios", { state: { mensaje: "Usuario eliminado correctamente." } });
  }

  return (
    <PaginaAdmin
      miga={
        <>
          <Link to="/admin/usuarios" className="text-decoration-none">
            Usuarios
          </Link>{" "}
          / Detalle
        </>
      }
      titulo={usuario ? nombreCompleto : "Usuario"}
      acciones={
        <Link to="/admin/usuarios" className="btn btn-kb-secundario">
          <i className="ti ti-arrow-left"></i> Volver al listado
        </Link>
      }
    >
      <div id="ficha-usuario" className="card-kb" style={{ maxWidth: 820 }}>
        {!usuario ? (
          <div className="estado-vacio">
            <i className="ti ti-mood-empty"></i>
            <p className="mt-2">No encontramos ese usuario. Puede que se haya escondido en la taberna de Moe.</p>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <div
                className="avatar-iniciales mx-auto"
                style={{ width: 96, height: 96, fontSize: "1.8rem", background: colorAvatar(nombreCompleto) }}
              >
                {iniciales(usuario.nombre, usuario.apellidos)}
              </div>
              <span className={"badge badge-rol mt-3 " + claseRol(usuario.tipoUsuario)}>{usuario.tipoUsuario}</span>
            </div>
            <div className="col-md-9">
              <dl className="ficha-solo-lectura mb-0">
                <dt>RUN</dt>
                <dd>{usuario.run}</dd>
                <dt>Nombre completo</dt>
                <dd>{nombreCompleto}</dd>
                <dt>Correo</dt>
                <dd>{usuario.correo}</dd>
                <dt>Fecha de nacimiento</dt>
                <dd>{usuario.fechaNacimiento || "No informada"}</dd>
                <dt>Comuna / Región</dt>
                <dd>{(usuario.comuna || "") + (usuario.region ? ", " + usuario.region : "")}</dd>
                <dt>Dirección</dt>
                <dd>{usuario.direccion || "No informada"}</dd>
              </dl>
              <div className="d-flex gap-2 mt-4">
                <Link
                  to={"/admin/usuarios/" + encodeURIComponent(usuario.id) + "/editar"}
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

      {usuario && (
        <div className="tabla-admin-wrap mt-4" style={{ maxWidth: 820 }}>
          <div className="tabla-admin-header">
            <p className="seccion-titulo mb-0">Historial de compras</p>
          </div>
          <div className="table-responsive">
            <table className="table tabla-admin mb-0">
              <thead>
                <tr>
                  <th>N° orden</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="text-end">Boleta</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((o) => (
                  <tr key={o.id}>
                    <td className="fw-semibold">#{o.numero}</td>
                    <td>{formatoFechaHora(o.fecha)}</td>
                    <td>{formatoPrecio(o.totales.total)}</td>
                    <td>
                      <span className={"badge " + (o.estado === "Pagada" ? "text-bg-success" : "text-bg-danger")}>
                        {o.estado}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link className="btn btn-sm btn-kb-secundario" to={"/admin/ordenes/" + o.id} title="Ver boleta">
                        <i className="ti ti-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {compras.length === 0 && (
            <div className="estado-vacio">
              <i className="ti ti-shopping-cart-off"></i>
              <p className="mt-2 mb-0">Este usuario todavía no ha hecho compras.</p>
            </div>
          )}
        </div>
      )}

      <ModalEliminar titulo="Eliminar usuario" onConfirmar={eliminar} onCancelar={() => setConfirmando(false)}>
        {confirmando && (
          <>
            ¿Seguro que quieres eliminar a <strong>{nombreCompleto}</strong>? Esta acción no se puede deshacer.
          </>
        )}
      </ModalEliminar>
    </PaginaAdmin>
  );
}

export default AdminUsuarioFicha;
