import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MensajeError from "../components/MensajeError";
import useEstilos from "../hooks/useEstilos";
import useFormulario from "../hooks/useFormulario";
import { iniciarSesion } from "../services/auth";
import { validarLogin } from "../utils/validaciones";
import estiloLogin from "../styles/style-login.css?inline";

const estilos = [estiloLogin];

function Login() {
  useEstilos(estilos);

  const navigate = useNavigate();
  const { valores, errorDe, cambiar, salirDelCampo, enviar } = useFormulario({ email: "", password: "" }, validarLogin);
  const [errorCredenciales, setErrorCredenciales] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // Easter egg: al hacer clic en "Olvidé mi contraseña" aparece Nelson riéndose
  const [mostrarNelson, setMostrarNelson] = useState(false);
  const audioNelson = useRef(null);

  function iniciar(datos) {
    const resultado = iniciarSesion(datos.email, datos.password);
    if (!resultado.ok) {
      setErrorCredenciales(resultado.error);
      return;
    }
    setMensajeExito("Bienvenido, " + resultado.usuario.nombre + "!");
    const destino = resultado.usuario.tipoUsuario === "Administrador" ? "/admin" : "/";
    setTimeout(() => navigate(destino), 800);
  }

  function mostrarNelsonRiendose(evento) {
    evento.preventDefault();
    setMostrarNelson(true);
    audioNelson.current.currentTime = 0;
    audioNelson.current.play().catch(() => {
      // el navegador puede bloquear el audio si no hubo interacción previa
    });
    setTimeout(() => setMostrarNelson(false), 2000);
  }

  return (
    <main className="pagina-login">
      <div className="tarjeta-login">
        <div className="icono-hamburguesa">
          <i className="ti ti-menu-2"></i>
        </div>

        <h1 className="titulo-login">
          ¡HOLA DE
          <br /> NUEVO, VIEJO
          <br /> PINTO!
        </h1>
        <p className="subtitulo-login">Ingresa tus credenciales para ordenar.</p>

        <form
          className="formulario-login d-flex flex-column"
          id="login-form"
          noValidate
          onSubmit={(evento) => enviar(evento, iniciar)}
        >
          <label className="etiqueta-campo" htmlFor="email">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength="100"
            autoComplete="email"
            required
            placeholder="tu@email.com"
            className="form-control"
            value={valores.email}
            onChange={cambiar}
            onBlur={salirDelCampo}
            aria-invalid={Boolean(errorDe("email"))}
          />
          <MensajeError texto={errorDe("email")} />

          <label className="etiqueta-campo" htmlFor="password">
            CONTRASEÑA
          </label>
          <input
            type="password"
            id="password"
            name="password"
            maxLength="10"
            autoComplete="current-password"
            required
            placeholder="********"
            className="form-control"
            value={valores.password}
            onChange={(evento) => {
              cambiar(evento);
              setErrorCredenciales("");
            }}
            onBlur={salirDelCampo}
            aria-invalid={Boolean(errorDe("password") || errorCredenciales)}
          />
          <MensajeError texto={errorDe("password") || errorCredenciales} />

          <button type="submit" className="boton-login btn">
            ENTRAR A COMER
          </button>

          <a href="#" className="enlace-pequeno" id="link-olvido" onClick={mostrarNelsonRiendose}>
            Olvidé mi contraseña
          </a>

          <div id="nelson-container" className={mostrarNelson ? "" : "oculto"}>
            <img src="assets/nelson-haha.jpg" alt="Nelson Haha" />
          </div>

          <audio ref={audioNelson} src="assets/nelson-haha-audio.mp3" preload="auto"></audio>

          <Link to="/registro">
            <p className="registro-login">No tengo cuenta, quiero registrarme</p>
          </Link>
          <Link to="/admin" className="enlace-pequeno">
            ¿Eres administrador o vendedor? Entra al panel
          </Link>

          {mensajeExito && (
            <p className="mensaje-exito" role="status">
              {mensajeExito}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

export default Login;
