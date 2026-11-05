import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CarritoProvider } from "../context/CarritoContext";
import { SonidoProvider } from "../context/SonidoContext";

export function renderConTienda(componente, rutaInicial = "/") {
  return render(
    <MemoryRouter initialEntries={[rutaInicial]}>
      <SonidoProvider>
        <AuthProvider>
          <CarritoProvider>{componente}</CarritoProvider>
        </AuthProvider>
      </SonidoProvider>
    </MemoryRouter>,
  );
}
