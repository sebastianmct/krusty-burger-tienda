import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Despedida from "../components/Despedida";
import { cerrarSesion, iniciarSesion, obtenerSesion } from "../services/auth";

const AuthContext = createContext(null);
const DESPEDIDAS = ["homero", "krusty"];

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(obtenerSesion);
  const [despedida, setDespedida] = useState(null);
  const navigate = useNavigate();

  function iniciar(correo, password) {
    const resultado = iniciarSesion(correo, password);
    if (resultado.ok) setSesion(obtenerSesion());
    return resultado;
  }

  function cerrar() {
    cerrarSesion();
    setSesion(null);
    setDespedida(DESPEDIDAS[Math.floor(Math.random() * DESPEDIDAS.length)]);
  }

  function terminarDespedida() {
    setDespedida(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ sesion, iniciar, cerrar }}>
      {children}
      {despedida && (
        <Despedida quien={despedida} onCerrar={terminarDespedida} />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
