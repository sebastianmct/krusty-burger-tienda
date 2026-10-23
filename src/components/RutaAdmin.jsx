import { Navigate, Outlet } from "react-router-dom";
import { obtenerSesion } from "../services/auth";

// Protege el panel admin: si no hay una sesión de Administrador manda al login.
// (Es una protección solo del lado del navegador, suficiente para un proyecto frontend.)
function RutaAdmin() {
  const sesion = obtenerSesion();

  if (!sesion || sesion.tipoUsuario !== "Administrador") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default RutaAdmin;
