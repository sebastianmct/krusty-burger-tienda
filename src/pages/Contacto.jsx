import { useState } from "react";
import MensajeError from "../components/MensajeError";
import useEstilos from "../hooks/useEstilos";
import useFormulario from "../hooks/useFormulario";
import { enviarQueja } from "../services/api";
import { validarContacto } from "../utils/validaciones";
import estiloContacto from "../styles/style-contacto.css?inline";

const estilos = [estiloContacto];

function Contacto() {
  useEstilos(estilos);

  const { valores, errorDe, cambiar, salirDelCampo, enviar } = useFormulario(
    { nombre: "", email: "", mensaje: "" },
    validarContacto,
  );
  const [mensajeExito, setMensajeExito] = useState("");
  const [errorEnvio, setErrorEnvio] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Envía la queja a la API (POST) y avisa si salió bien o mal
  async function enviarMensaje(datos) {
    setEnviando(true);
    setMensajeExito("");
    setErrorEnvio("");
    try {
      const respuesta = await enviarQueja({ title: datos.nombre, body: datos.mensaje, email: datos.email });
      setMensajeExito("Tu mensaje fue enviado correctamente. N° de queja: " + respuesta.id);
    } catch {
      setErrorEnvio("No pudimos enviar tu mensaje. Intenta nuevamente.");
    }
    setEnviando(false);
  }

  return (
    <main>
      <section className="kb-titulo text-center px-4 px-lg-5 pt-5 pb-4">
        <div className="mx-auto kb-titulo-inner">
          <h1 className="kb-titulo-h1">¡Grita tus quejas aquí!</h1>
          <p className="mb-0">
            ¿Krusty te dio una hamburguesa cruda? ¿El Ribwich te dio alucinaciones? ¡Dejanos saber! Nos importa (un
            poco).
          </p>
        </div>
      </section>

      <section className="kb-contacto px-3 px-lg-4 pb-5">
        <div className="row g-4 justify-content-center align-items-start">
          <div className="col-lg-2 d-flex justify-content-center">
            <div className="kb-mou-container">
              <img src="assets/mou_escopeta.jpg" alt="Moe sosteniendo escopeta" className="moe-img" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="kb-formulario-contenedor">
              <form
                id="contacto-form"
                className="d-flex flex-column gap-3"
                noValidate
                onSubmit={(evento) => enviar(evento, enviarMensaje)}
              >
                <div className="row g-3">
                  <div className="col-md-6 d-flex flex-column gap-2">
                    <label htmlFor="nombre" className="kb-label">
                      NOMBRE COMPLETO
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      maxLength="100"
                      autoComplete="name"
                      required
                      className="form-control kb-input"
                      placeholder="Ej. Homero Simpson"
                      value={valores.nombre}
                      onChange={cambiar}
                      onBlur={salirDelCampo}
                      aria-invalid={Boolean(errorDe("nombre"))}
                    />
                    <MensajeError texto={errorDe("nombre")} />
                  </div>
                  <div className="col-md-6 d-flex flex-column gap-2">
                    <label htmlFor="email" className="kb-label">
                      EMAIL (Opcional si huyes)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      maxLength="100"
                      autoComplete="email"
                      className="form-control kb-input"
                      placeholder="Ej. homero_lover@simpson.com"
                      value={valores.email}
                      onChange={cambiar}
                      onBlur={salirDelCampo}
                      aria-invalid={Boolean(errorDe("email"))}
                    />
                    <MensajeError texto={errorDe("email")} />
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  <label htmlFor="mensaje" className="kb-label">
                    ¿QUE HIZO KRUSTY ESTA VEZ?
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    maxLength="500"
                    required
                    className="form-control kb-input kb-textarea"
                    placeholder="Ej. Describe tu trauma aquí... ¡No escatimes en detalles grotescos!"
                    value={valores.mensaje}
                    onChange={cambiar}
                    onBlur={salirDelCampo}
                    aria-invalid={Boolean(errorDe("mensaje"))}
                  ></textarea>
                  <MensajeError texto={errorDe("mensaje")} />
                </div>
                <button type="submit" className="btn btn-kb-enviar" disabled={enviando}>
                  {enviando ? "Enviando..." : "Enviar queja"} <i className="ti ti-send"></i>
                </button>

                {errorEnvio && (
                  <p className="campo-error" role="alert">
                    {errorEnvio}
                  </p>
                )}

                {mensajeExito && (
                  <p className="mensaje-exito" role="status">
                    {mensajeExito}
                  </p>
                )}
              </form>
            </div>
          </div>

          <aside className="col-lg-4">
            <div className="kb-info-contacto">
              <h2>
                <i className="ti ti-map-pin"></i> ¿DÓNDE ESTAMOS?
              </h2>
              <p>
                <i className="ti ti-home"></i> Krusty Burger Principal
              </p>
              <p>
                742 Evergreen Terrace, Springfield
                <br />
                (o cerca de ahí, pregunta por Ned)
              </p>
              <p>
                <i className="ti ti-phone"></i> (555) 123-4567 (no llamen a la policía)
              </p>
              <img src="assets/springfield.png" alt="Krusty Burger" />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Contacto;
