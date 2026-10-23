import { screen, fireEvent } from "@testing-library/react";
import Menu from "../pages/Menu";
import { obtenerCatalogo, precioFinal } from "../data/productos";
import { renderConTienda } from "./ayudas";

describe("Página Menú", () => {
  it("muestra todos los productos del catálogo (lista)", () => {
    renderConTienda(<Menu />);

    expect(screen.getAllByRole("article").length).toBe(obtenerCatalogo().length);
  });

  it("al elegir la categoría Bebidas solo muestra bebidas (filtro)", () => {
    renderConTienda(<Menu />);

    fireEvent.click(screen.getByRole("button", { name: /Bebidas/ }));

    const bebidas = obtenerCatalogo().filter((producto) => producto.categoria === "bebidas");
    expect(screen.getAllByRole("article").length).toBe(bebidas.length);
  });

  it("al ordenar por precio menor el primer producto es el más barato", () => {
    renderConTienda(<Menu />);

    fireEvent.change(screen.getByLabelText(/Ordenar por/), { target: { value: "menor" } });

    const masBarato = [...obtenerCatalogo()].sort((a, b) => precioFinal(a) - precioFinal(b))[0];
    const primeraTarjeta = screen.getAllByRole("article")[0];
    expect(primeraTarjeta.textContent).toContain(masBarato.nombre);
  });
});
