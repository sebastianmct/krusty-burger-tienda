import { screen, fireEvent } from "@testing-library/react";
import Carrito from "../pages/Carrito";
import { renderConTienda } from "./ayudas";

// Deja 2 hamburguesas Krusty ($4.990 c/u) guardadas en el carrito antes de renderizar
function carritoConDosHamburguesas() {
  localStorage.setItem("krustyBurgerCart", JSON.stringify([{ id: "krusty-burger", cantidad: 2 }]));
}

describe("Página Carrito", () => {
  it("muestra el mensaje de carrito vacío cuando no hay productos", () => {
    renderConTienda(<Carrito />);

    expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
  });

  it("muestra el producto guardado y el total a pagar", () => {
    carritoConDosHamburguesas();
    renderConTienda(<Carrito />);

    expect(screen.getByText("Hamburguesa Krusty")).toBeTruthy();
    // 9.980 de subtotal + 1.896 de impuestos + 2.100 de despacho
    expect(screen.getByText("$13.976")).toBeTruthy();
  });

  it("al presionar + aumenta la cantidad", () => {
    carritoConDosHamburguesas();
    renderConTienda(<Carrito />);

    fireEvent.click(screen.getByLabelText("Aumentar cantidad de Hamburguesa Krusty"));

    expect(screen.getByText("3")).toBeTruthy();
  });

  it("al presionar Eliminar el carrito queda vacío", () => {
    carritoConDosHamburguesas();
    renderConTienda(<Carrito />);

    fireEvent.click(screen.getByText("Eliminar"));

    expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
  });
});
