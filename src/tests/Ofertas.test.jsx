import { screen } from "@testing-library/react";
import Ofertas from "../pages/Ofertas";
import { obtenerOfertas, obtenerPruebaDeTontos } from "../data/productos";
import { renderConTienda } from "./ayudas";

describe("Página Ofertas", () => {
  it("muestra solo los productos que están en oferta", () => {
    renderConTienda(<Ofertas />);

    expect(document.querySelectorAll("#ofertas-grilla article").length).toBe(
      obtenerOfertas().length,
    );
  });

  it("cada oferta muestra su etiqueta de descuento", () => {
    renderConTienda(<Ofertas />);

    expect(screen.getByText("-30%")).toBeTruthy();
  });

  it("muestra a Bart en el banner de ofertas", () => {
    renderConTienda(<Ofertas />);

    const imagen = screen.getByAltText(
      "Bart sorprende a los vecinos mientras comparten hamburguesas",
    );

    expect(imagen.getAttribute("src")).toBe(
      "/krusty-burger-tienda/assets/bart-mesa.png",
    );
  });

  it("muestra el GIF de Krusty junto a las ofertas", () => {
    renderConTienda(<Ofertas />);

    expect(
      document.querySelector(".kb-ofertas-contenido .gif-krusty"),
    ).toBeTruthy();
  });

  it("Cletus presenta los productos a prueba de tontos", () => {
    renderConTienda(<Ofertas />);

    expect(screen.getByText("Productos a prueba de tontos")).toBeTruthy();
    expect(screen.getByText("Cletus")).toBeTruthy();
    expect(document.querySelectorAll("#tontos-grilla article").length).toBe(
      obtenerPruebaDeTontos().length,
    );
  });
});
