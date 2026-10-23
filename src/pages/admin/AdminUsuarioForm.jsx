import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import useFormulario from "../../hooks/useFormulario";
import { comunasPorRegion } from "../../data/regiones";
import { guardarUsuario, obtenerUsuario } from "../../services/adminData";
import { normalizarRun, validarUsuario } from "../../utils/validaciones";
import { TIPOS_USUARIO } from "../../utils/usuarios";

// Sirve para crear (/admin/usuarios/nuevo) y para editar (/admin/usuarios/:id/editar)
function AdminUsuarioForm() {
  const { id } = useParams(); // si hay id estamos editando
  const navigate = useNavigate();

  const [usuarioActual] = useState(() => (id ? obtenerUsuario(id) : null));
  const u = usuarioActual;

  const { valores, errorDe, claseValidacion, cambiar, cambiarValor, salirDelCampo, enviar } = useFormulario(
    {
      run: u ? u.run : "",
      nombre: u ? u.nombre : "",
      apellidos: u ? u.apellidos : "",
      correo: u ? u.correo : "",
      fechaNacimiento: u ? u.fechaNacimiento || "" : "",
      tipoUsuario: u ? u.tipoUsuario : "Cliente",
      region: u ? u.region || "" : "",
      comuna: u ? u.comuna || "" : "",
      direccion: u ? u.direccion || "" : "",
    },
    validarUsuario,
  );

  // Las comunas disponibles dependen de la región elegida
  const comunas = comunasPorRegion[valores.region] || [];

  function cambiarRegion(evento) {
    cambiar(evento);
    cambiarValor("comuna", ""); // al cambiar de región se borra la comuna elegida
  }

  function guardar(datos) {
    guardarUsuario({
      id: u ? u.id : null,
      run: normalizarRun(datos.run),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      fechaNacimiento: datos.fechaNacimiento,
      tipoUsuario: datos.tipoUsuario,
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion.trim(),
    });
    navigate("/admin/usuarios", { state: { mensaje: "Usuario guardado correctamente." } });
  }

  return (
    <PaginaAdmin
      miga={
        <>
          <Link to="/admin/usuarios" className="text-decoration-none">
            Usuarios
          </Link>{" "}
          / {u ? "Editar" : "Nuevo"}
        </>
      }
      titulo={u ? "Editar usuario" : "Nuevo usuario"}
    >
      <form
        className="form-admin card-kb"
        style={{ maxWidth: 860 }}
        id="form-usuario"
        noValidate
        onSubmit={(evento) => enviar(evento, guardar)}
      >
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="run">
              RUN
            </label>
            <input
              type="text"
              className={"form-control" + claseValidacion("run")}
              id="run"
              name="run"
              required
              maxLength="9"
              placeholder="Ej. 19011022K"
              value={valores.run}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("run")}</div>
            <div className="form-text">Sin puntos ni guión, con dígito verificador. Ej: 19011022K</div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              className={"form-control" + claseValidacion("nombre")}
              id="nombre"
              name="nombre"
              maxLength="50"
              required
              placeholder="Ej. Ned"
              value={valores.nombre}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("nombre")}</div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="apellidos">
              Apellidos
            </label>
            <input
              type="text"
              className={"form-control" + claseValidacion("apellidos")}
              id="apellidos"
              name="apellidos"
              maxLength="100"
              required
              placeholder="Ej. Flanders"
              value={valores.apellidos}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("apellidos")}</div>
          </div>
          <div className="col-md-7">
            <label className="form-label" htmlFor="correo">
              Correo
            </label>
            <input
              type="email"
              className={"form-control" + claseValidacion("correo")}
              id="correo"
              name="correo"
              maxLength="100"
              required
              placeholder="usuario@duoc.cl"
              value={valores.correo}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("correo")}</div>
          </div>
          <div className="col-md-5">
            <label className="form-label" htmlFor="fechaNacimiento">
              Fecha de nacimiento <span className="text-muted fw-normal">(opcional)</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={valores.fechaNacimiento}
              onChange={cambiar}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="tipoUsuario">
              Tipo de usuario
            </label>
            <select
              className="form-select"
              id="tipoUsuario"
              name="tipoUsuario"
              required
              value={valores.tipoUsuario}
              onChange={cambiar}
            >
              {TIPOS_USUARIO.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            <div className="form-text">Administrador, Vendedor o Cliente.</div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="region">
              Región
            </label>
            <select
              className={"form-select" + claseValidacion("region")}
              id="region"
              name="region"
              required
              value={valores.region}
              onChange={cambiarRegion}
              onBlur={salirDelCampo}
            >
              <option value="">Selecciona una región</option>
              {Object.keys(comunasPorRegion).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errorDe("region")}</div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="comuna">
              Comuna
            </label>
            <select
              className={"form-select" + claseValidacion("comuna")}
              id="comuna"
              name="comuna"
              required
              disabled={comunas.length === 0}
              value={valores.comuna}
              onChange={cambiar}
              onBlur={salirDelCampo}
            >
              <option value="">
                {comunas.length === 0 ? "Primero selecciona una región" : "Selecciona una comuna"}
              </option>
              {comunas.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errorDe("comuna")}</div>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="direccion">
              Dirección
            </label>
            <input
              type="text"
              className={"form-control" + claseValidacion("direccion")}
              id="direccion"
              name="direccion"
              maxLength="300"
              required
              placeholder="Ej. Av. Siempreviva 742"
              value={valores.direccion}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("direccion")}</div>
          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-kb-primario">
            <i className="ti ti-device-floppy"></i> Guardar usuario
          </button>
          <Link to="/admin/usuarios" className="btn btn-kb-secundario">
            Cancelar
          </Link>
        </div>
      </form>
    </PaginaAdmin>
  );
}

export default AdminUsuarioForm;
