import { useContext } from "react";
import { SonidoContext } from "../context/sonido-context";

export function useSonido() {
  const contexto = useContext(SonidoContext);
  if (!contexto) {
    throw new Error("useSonido debe usarse dentro de SonidoProvider.");
  }
  return contexto;
}

export function useSonidoOpcional() {
  return useContext(SonidoContext);
}
