import { screen } from "@testing-library/react";
import Ofertas from "../pages/Ofertas";
import { obtenerOfertas } from "../data/productos";
import { renderConTienda } from "./ayudas";

describe("Página Ofertas", () => {
  it("muestra solo los productos que están en oferta", () => {
    renderConTienda(<Ofertas />);

    expect(screen.getAllByRole("article").length).toBe(obtenerOfertas().length);
  });

  it("cada oferta muestra su etiqueta de descuento", () => {
    renderConTienda(<Ofertas />);

    expect(screen.getByText("-30%")).toBeTruthy(); // la rosquilla de Homero
  });
});
