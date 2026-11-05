import { screen, fireEvent } from "@testing-library/react";
import Menu from "../pages/Menu";
import { obtenerCatalogo, precioFinal } from "../data/productos";
import { renderConTienda } from "./ayudas";

describe("Página Menú", () => {
  it("muestra todos los productos del catálogo (lista)", () => {
    renderConTienda(<Menu />);

    expect(screen.getAllByRole("article").length).toBe(
      obtenerCatalogo().length,
    );
  });

  it("al elegir la categoría Bebidas solo muestra bebidas (filtro)", () => {
    renderConTienda(<Menu />);

    fireEvent.click(screen.getByRole("button", { name: /Bebidas/ }));

    const bebidas = obtenerCatalogo().filter(
      (producto) => producto.categoria === "bebidas",
    );
    expect(screen.getAllByRole("article").length).toBe(bebidas.length);
  });

  it("al ordenar por precio menor el primer producto es el más barato", () => {
    renderConTienda(<Menu />);

    fireEvent.change(screen.getByLabelText(/Ordenar por/), {
      target: { value: "menor" },
    });

    const masBarato = [...obtenerCatalogo()].sort(
      (a, b) => precioFinal(a) - precioFinal(b),
    )[0];
    const primeraTarjeta = screen.getAllByRole("article")[0];
    expect(primeraTarjeta.textContent).toContain(masBarato.nombre);
  });

  it("al buscar un texto solo muestra los productos que coinciden", () => {
    renderConTienda(<Menu />);

    fireEvent.change(screen.getByLabelText("Buscar productos"), {
      target: { value: "buzz" },
    });

    const tarjetas = screen.getAllByRole("article");
    expect(tarjetas.length).toBeGreaterThan(0);
    expect(tarjetas.length).toBeLessThan(obtenerCatalogo().length);
    expect(
      tarjetas.every((tarjeta) =>
        tarjeta.textContent.toLowerCase().includes("buzz"),
      ),
    ).toBe(true);
  });

  it("si no hay coincidencias muestra un aviso D'oh!", () => {
    renderConTienda(<Menu />);

    fireEvent.change(screen.getByLabelText("Buscar productos"), {
      target: { value: "zzzz" },
    });

    expect(screen.queryAllByRole("article").length).toBe(0);
    expect(screen.getByRole("alert").textContent).toContain("¡D'OH!");
  });

  it("'Hamburguesas al vapor' muestra el combo tradicional con el sticker de Skinner", () => {
    renderConTienda(<Menu />);

    fireEvent.change(screen.getByLabelText("Buscar productos"), {
      target: { value: "Hamburguesas al vapor" },
    });

    expect(screen.getAllByRole("article").length).toBe(1);
    expect(screen.getByText("Combo clásico Krusty")).toBeTruthy();
    expect(
      screen.getByText("Una receta típica de Utica, Aurora Boreal incluida"),
    ).toBeTruthy();
    expect(screen.getByAltText("Director Skinner")).toBeTruthy();
  });

  it("el botón Limpiar borra la búsqueda", () => {
    renderConTienda(<Menu />);
    fireEvent.change(screen.getByLabelText("Buscar productos"), {
      target: { value: "buzz" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Limpiar" }));

    expect(screen.getAllByRole("article").length).toBe(
      obtenerCatalogo().length,
    );
  });
});
