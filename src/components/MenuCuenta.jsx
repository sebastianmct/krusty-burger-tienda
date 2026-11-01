import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MenuCuenta({ alNavegar }) {
  const { sesion, cerrar } = useAuth();
  const [abierto, setAbierto] = useState(false);

  if (!sesion) {
    return (
      <Link
        to="/login"
        className="kb-icon-link"
        aria-label="Iniciar sesión"
        onClick={alNavegar}
      >
        <i className="ti ti-user"></i>
      </Link>
    );
  }

  function irA() {
    setAbierto(false);
    if (alNavegar) alNavegar();
  }

  function cerrarSesion() {
    setAbierto(false);
    if (alNavegar) alNavegar();
    cerrar();
  }

  return (
    <div className="kb-cuenta">
      <button
        type="button"
        className="kb-cuenta-boton"
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
        <i className="ti ti-user-circle"></i>
        <span>{sesion.nombre}</span>
        <i className="ti ti-chevron-down"></i>
      </button>

      {abierto && (
        <ul className="kb-cuenta-menu">
          <li>
            <Link to="/cuenta" onClick={irA}>
              <i className="ti ti-user"></i> Mi cuenta
            </Link>
          </li>
          {sesion.tipoUsuario === "Administrador" && (
            <li>
              <Link to="/admin" onClick={irA}>
                <i className="ti ti-layout-dashboard"></i> Panel admin
              </Link>
            </li>
          )}
          <li>
            <button type="button" onClick={cerrarSesion}>
              <i className="ti ti-logout"></i> Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default MenuCuenta;
