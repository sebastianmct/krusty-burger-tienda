import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";

// Los componentes de la tienda usan <Link> y el carrito, así que hay que renderizarlos
// dentro de un Router y del CarritoProvider. Esta función lo hace por nosotros.
export function renderConTienda(componente, rutaInicial = "/") {
  return render(
    <MemoryRouter initialEntries={[rutaInicial]}>
      <CarritoProvider>{componente}</CarritoProvider>
    </MemoryRouter>,
  );
}
