import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import { obtenerUsuario } from "../../services/adminData";
import { cerrarSesion, obtenerSesion } from "../../services/auth";
import { claseRol, colorAvatar, iniciales } from "../../utils/usuarios";

// Perfil del administrador que inició sesión: /admin/perfil
function AdminPerfil() {
  const navigate = useNavigate();
  const [usuario] = useState(() => {
    const sesion = obtenerSesion();
    return sesion ? obtenerUsuario(sesion.id) : null;
  });

  function salir() {
    cerrarSesion();
    navigate("/login");
  }

  return (
    <PaginaAdmin miga="Panel administrador / Cuenta" titulo="Mi perfil">
      <div className="card-kb" style={{ maxWidth: 720 }}>
        {!usuario ? (
          <div className="estado-vacio">
            <i className="ti ti-mood-empty"></i>
            <p className="mt-2">No pudimos cargar tu perfil.</p>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div
                className="avatar-iniciales mx-auto"
                style={{
                  width: 96,
                  height: 96,
                  fontSize: "1.8rem",
                  background: colorAvatar(usuario.nombre + " " + usuario.apellidos),
                }}
              >
                {iniciales(usuario.nombre, usuario.apellidos)}
              </div>
              <span className={"badge badge-rol mt-3 " + claseRol(usuario.tipoUsuario)}>{usuario.tipoUsuario}</span>
            </div>
            <div className="col-md-8">
              <dl className="ficha-solo-lectura mb-0">
                <dt>Nombre completo</dt>
                <dd>
                  {usuario.nombre} {usuario.apellidos}
                </dd>
                <dt>Correo</dt>
                <dd>{usuario.correo}</dd>
                <dt>RUN</dt>
                <dd>{usuario.run}</dd>
                <dt>Dirección</dt>
                <dd>{usuario.direccion || "No informada"}</dd>
              </dl>
              <div className="d-flex gap-2 mt-4">
                <Link
                  to={"/admin/usuarios/" + encodeURIComponent(usuario.id) + "/editar"}
                  className="btn btn-kb-primario"
                >
                  <i className="ti ti-pencil"></i> Editar mis datos
                </Link>
                <button type="button" className="btn btn-kb-secundario" onClick={salir}>
                  <i className="ti ti-logout"></i> Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PaginaAdmin>
  );
}

export default AdminPerfil;
