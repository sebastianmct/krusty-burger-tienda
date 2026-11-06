import { useEffect, useRef, useState } from "react";
import Personaje from "./Personaje";
import "../styles/style-preferencias-cookies.css";

const PREFERENCIAS_INICIALES = {
  analiticas: false,
  externas: false,
};

function PreferenciasCookies() {
  const [visible, setVisible] = useState(false);
  const [preferencias, setPreferencias] = useState(PREFERENCIAS_INICIALES);
  const cerrarRef = useRef(null);

  useEffect(() => {
    if (!visible) return undefined;

    cerrarRef.current?.focus();
    const manejarEscape = (evento) => {
      if (evento.key === "Escape") setVisible(false);
    };

    window.addEventListener("keydown", manejarEscape);
    return () => window.removeEventListener("keydown", manejarEscape);
  }, [visible]);

  const cambiarPreferencia = (nombre) => {
    setPreferencias((actuales) => ({
      ...actuales,
      [nombre]: !actuales[nombre],
    }));
  };

  const responderTodas = (aceptar) => {
    setPreferencias({ analiticas: aceptar, externas: aceptar });
    setVisible(false);
  };

  return (
    <>
      {!visible && (
        <button
          type="button"
          className="kb-cookies-flotante"
          aria-label="Abrir preferencias de cookies"
          onClick={() => setVisible(true)}
        >
          <i className="ti ti-cookie" aria-hidden="true"></i>
          <span>Cookies</span>
        </button>
      )}
      {visible && (
        <div
          className="kb-cookies-overlay"
          onClick={() => setVisible(false)}
          data-testid="cookies-overlay"
        >
          <section
            className="kb-cookies-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kb-cookies-titulo"
            onClick={(evento) => evento.stopPropagation()}
          >
            <div className="kb-cookies-personaje" aria-hidden="true">
              <Personaje quien="cookieKwan" tam="xl" />
              <span className="kb-cookies-personaje-nombre">Cookie Kwan</span>
            </div>

            <div className="kb-cookies-contenido">
              <header className="kb-cookies-header">
                <h2 id="kb-cookies-titulo">Preferencias de cookies</h2>
                <button
                  ref={cerrarRef}
                  type="button"
                  className="kb-cookies-cerrar"
                  aria-label="Cerrar preferencias"
                  onClick={() => setVisible(false)}
                >
                  <i className="ti ti-x" aria-hidden="true"></i>
                </button>
              </header>

              <div className="kb-cookies-opciones">
                <div className="kb-cookies-opcion">
                  <div>
                    <h3>Cookies necesarias</h3>
                    <p>
                      Permiten el funcionamiento básico, la seguridad y la
                      gestión de tus preferencias.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="kb-cookies-switch activo"
                    role="switch"
                    aria-checked="true"
                    aria-label="Cookies necesarias"
                    disabled
                  >
                    <span />
                  </button>
                </div>

                <div className="kb-cookies-opcion">
                  <div>
                    <h3>Cookies analíticas</h3>
                    <p>
                      Nos ayudan a conocer de forma agregada cómo se utiliza la
                      web.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={
                      "kb-cookies-switch" +
                      (preferencias.analiticas ? " activo" : "")
                    }
                    role="switch"
                    aria-checked={preferencias.analiticas}
                    aria-label="Cookies analíticas"
                    onClick={() => cambiarPreferencia("analiticas")}
                  >
                    <span />
                  </button>
                </div>

                <div className="kb-cookies-opcion">
                  <div>
                    <h3>Contenido externo y funcionalidad</h3>
                    <p>
                      Permiten cargar servicios externos y recordar
                      determinadas preferencias.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={
                      "kb-cookies-switch" +
                      (preferencias.externas ? " activo" : "")
                    }
                    role="switch"
                    aria-checked={preferencias.externas}
                    aria-label="Contenido externo y funcionalidad"
                    onClick={() => cambiarPreferencia("externas")}
                  >
                    <span />
                  </button>
                </div>
              </div>

              <footer className="kb-cookies-acciones">
                <div className="kb-cookies-acciones-grupo">
                  <button
                    type="button"
                    className="kb-cookies-boton secundario"
                    onClick={() => responderTodas(false)}
                  >
                    Rechazar todas
                  </button>
                  <button
                    type="button"
                    className="kb-cookies-boton secundario"
                    onClick={() => responderTodas(true)}
                  >
                    Aceptar todas
                  </button>
                </div>
                <button
                  type="button"
                  className="kb-cookies-boton guardar"
                  onClick={() => setVisible(false)}
                >
                  Guardar preferencias
                </button>
              </footer>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default PreferenciasCookies;
