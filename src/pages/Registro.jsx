import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MensajeError from "../components/MensajeError";
import useEstilos from "../hooks/useEstilos";
import useFormulario from "../hooks/useFormulario";
import { comunasPorRegion } from "../data/regiones";
import { registrar } from "../services/auth";
import { validarRegistro } from "../utils/validaciones";
import estiloRegistro from "../styles/style-registrarse.css?inline";

const estilos = [estiloRegistro];

const valoresIniciales = {
  run: "",
  nombre: "",
  apellidos: "",
  email: "",
  fechaNacimiento: "",
  region: "",
  comuna: "",
  direccion: "",
  password: "",
  terminos: false,
};

function Registro() {
  useEstilos(estilos);

  const navigate = useNavigate();
  const { valores, errorDe, cambiar, cambiarValor, salirDelCampo, enviar, reiniciar } = useFormulario(
    valoresIniciales,
    validarRegistro,
  );
  const [errorCorreo, setErrorCorreo] = useState(""); // por ejemplo: "ya existe una cuenta con ese correo"
  const [mensajeExito, setMensajeExito] = useState("");

  // Las comunas disponibles dependen de la región elegida
  const comunas = comunasPorRegion[valores.region] || [];

  function cambiarRegion(evento) {
    cambiar(evento);
    cambiarValor("comuna", ""); // al cambiar de región se borra la comuna elegida
  }

  function crearCuenta(datos) {
    const resultado = registrar({ ...datos, correo: datos.email });
    if (!resultado.ok) {
      setErrorCorreo(resultado.error);
      return;
    }
    setMensajeExito("Cuenta creada! Ya puedes iniciar sesión con tu correo y contraseña.");
    reiniciar();
    setTimeout(() => navigate("/login"), 1500);
  }

  return (
    <main className="registro">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6 columna-izquierda order-lg-1 order-2">
            <h1 className="titulo">¡ÚNETE AL CLUB DE LOS HAMBRIENTOS!</h1>
            <p className="texto">
              Regístrate para obtener acceso exclusivo a las mejores hamburguesas de Springfield y promociones que harán
              que te babees.
            </p>
            <div className="imagen-izquierda">
              <img src="assets/krusty-burger-local.webp" alt="Krusty Burger en el local" />
            </div>
          </div>

          <div className="col-lg-6 order-lg-2 order-1">
            <div className="formulario-registro w-100">
              <h2 className="formulario-titulo">Crea tu cuenta</h2>
              <form
                className="registro-formulario"
                id="registro-form"
                noValidate
                onSubmit={(evento) => enviar(evento, crearCuenta)}
              >
                <div className="formulario-grupo">
                  <label htmlFor="run">RUN</label>
                  <input
                    type="text"
                    id="run"
                    name="run"
                    required
                    maxLength="12"
                    autoComplete="off"
                    placeholder="123456785"
                    className="form-control"
                    value={valores.run}
                    onChange={cambiar}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("run"))}
                  />
                  <MensajeError texto={errorDe("run")} />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    maxLength="50"
                    autoComplete="given-name"
                    required
                    placeholder="Ej. Homero"
                    className="form-control"
                    value={valores.nombre}
                    onChange={cambiar}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("nombre"))}
                  />
                  <MensajeError texto={errorDe("nombre")} />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="apellidos">Apellidos</label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    maxLength="100"
                    autoComplete="family-name"
                    required
                    placeholder="Ej. Simpson"
                    className="form-control"
                    value={valores.apellidos}
                    onChange={cambiar}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("apellidos"))}
                  />
                  <MensajeError texto={errorDe("apellidos")} />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="email">Tu Email de Springfield</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    maxLength="100"
                    autoComplete="email"
                    required
                    placeholder="Ej. homero_lover@simpson.com"
                    className="form-control"
                    value={valores.email}
                    onChange={(evento) => {
                      cambiar(evento);
                      setErrorCorreo("");
                    }}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("email") || errorCorreo)}
                  />
                  <MensajeError texto={errorDe("email") || errorCorreo} />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    autoComplete="bday"
                    className="form-control"
                    value={valores.fechaNacimiento}
                    onChange={cambiar}
                  />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="region">Región</label>
                  <select
                    id="region"
                    name="region"
                    required
                    autoComplete="address-level1"
                    className="form-select"
                    value={valores.region}
                    onChange={cambiarRegion}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("region"))}
                  >
                    <option value="">Selecciona una región</option>
                    {Object.keys(comunasPorRegion).map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <MensajeError texto={errorDe("region")} />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="comuna">Comuna</label>
                  <select
                    id="comuna"
                    name="comuna"
                    required
                    autoComplete="address-level2"
                    className="form-select"
                    disabled={comunas.length === 0}
                    value={valores.comuna}
                    onChange={cambiar}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("comuna"))}
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
                  <MensajeError texto={errorDe("comuna")} />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    maxLength="300"
                    autoComplete="street-address"
                    required
                    placeholder="Ej. Av. Siempreviva 742"
                    className="form-control"
                    value={valores.direccion}
                    onChange={cambiar}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("direccion"))}
                  />
                  <MensajeError texto={errorDe("direccion")} />
                </div>

                <div className="formulario-grupo">
                  <label htmlFor="password">Contraseña Secreta</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    maxLength="10"
                    autoComplete="new-password"
                    required
                    placeholder="********"
                    className="form-control"
                    value={valores.password}
                    onChange={cambiar}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("password"))}
                  />
                  <MensajeError texto={errorDe("password")} />
                </div>

                <label className="checkbox form-check" htmlFor="terminos">
                  <input
                    type="checkbox"
                    id="terminos"
                    name="terminos"
                    required
                    className="form-check-input"
                    checked={valores.terminos}
                    onChange={cambiar}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("terminos"))}
                  />
                  <span className="form-check-label">Quiero recibir ofertas que no puedo rechazar</span>
                </label>
                <MensajeError texto={errorDe("terminos")} />

                <button className="boton-registro btn" type="submit">
                  ¡Registrarme!
                </button>
                <p className="login-texto">
                  ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </p>

                {mensajeExito && (
                  <p className="mensaje-exito" role="status">
                    {mensajeExito}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Registro;
