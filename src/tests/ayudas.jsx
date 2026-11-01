import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CarritoProvider } from "../context/CarritoContext";

export function renderConTienda(componente, rutaInicial = "/") {
  return render(
    <MemoryRouter initialEntries={[rutaInicial]}>
      <AuthProvider>
        <CarritoProvider>{componente}</CarritoProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}
