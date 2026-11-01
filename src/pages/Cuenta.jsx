import { Link, Navigate } from "react-router-dom";
import useEstilos from "../hooks/useEstilos";
import { useAuth } from "../context/AuthContext";
import { listarOrdenesDeCorreo, obtenerUsuario } from "../services/adminData";
import { formatoFechaHora, formatoPrecio } from "../utils/formato";
import { iniciales } from "../utils/usuarios";
import estiloHome from "../styles/style-home.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloExtra];

function Cuenta() {
  useEstilos(estilos);

  const { sesion, cerrar } = useAuth();

  if (!sesion) return <Navigate to="/login" replace />;

  const usuario = obtenerUsuario(sesion.id);
  const compras = listarOrdenesDeCorreo(sesion.correo);
  const nombre = usuario ? usuario.nombre : sesion.nombre;
  const apellidos = usuario ? usuario.apellidos : "";

  return (
    <main className="kb-pagina">
      <section className="kb-panel">
        <div className="kb-panel-cabecera">
          <div className="d-flex align-items-center gap-3">
            <span
              className="kb-pj kb-pj-lg kb-pj-insignia"
              role="img"
              aria-label="Tu avatar"
            >
              {iniciales(nombre, apellidos) || "?"}
            </span>
            <div>
              <h1>Mi cuenta</h1>
              <p className="kb-panel-subtitulo mb-0">
                {nombre} {apellidos} · {sesion.tipoUsuario}
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {sesion.tipoUsuario === "Administrador" && (
              <Link to="/admin" className="kb-boton-claro">
                Panel admin
              </Link>
            )}
            <button type="button" className="kb-boton-rojo" onClick={cerrar}>
              Cerrar sesión
            </button>
          </div>
        </div>

        {usuario && (
          <>
            <h2>Mis datos</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <span className="kb-checkout-label">Correo</span>
                <input
                  className="kb-checkout-input"
                  value={usuario.correo}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <span className="kb-checkout-label">RUN</span>
                <input
                  className="kb-checkout-input"
                  value={usuario.run}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <span className="kb-checkout-label">Dirección</span>
                <input
                  className="kb-checkout-input"
                  value={usuario.direccion || "No informada"}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <span className="kb-checkout-label">Comuna / Región</span>
                <input
                  className="kb-checkout-input"
                  value={
                    usuario.comuna
                      ? usuario.comuna + ", " + usuario.region
                      : "No informada"
                  }
                  readOnly
                />
              </div>
            </div>
          </>
        )}

        <h2>Mis compras</h2>
        {compras.length === 0 ? (
          <p className="kb-panel-subtitulo">
            Todavía no has hecho compras. <Link to="/menu">Ir al menú</Link>
          </p>
        ) : (
          <div className="table-responsive">
            <table className="kb-tabla">
              <thead>
                <tr>
                  <th>N° orden</th>
                  <th>Fecha</th>
                  <th className="derecha">Total</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {compras.map((orden) => (
                  <tr key={orden.id}>
                    <td>#{orden.numero}</td>
                    <td>{formatoFechaHora(orden.fecha)}</td>
                    <td className="derecha">
                      {formatoPrecio(orden.totales.total)}
                    </td>
                    <td>{orden.estado}</td>
                    <td>
                      <Link
                        to={
                          (orden.estado === "Pagada"
                            ? "/compra/exitosa/"
                            : "/compra/error/") + orden.id
                        }
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cuenta;
