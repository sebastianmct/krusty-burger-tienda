import { Navigate, Outlet } from "react-router-dom";
import { obtenerSesion } from "../services/auth";

function RutaAdmin() {
  const sesion = obtenerSesion();

  if (!sesion || sesion.tipoUsuario !== "Administrador") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default RutaAdmin;
