import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";
import Categorias from "../pages/Categorias";
import { obtenerCatalogo, obtenerCategorias } from "../data/productos";

function renderEnRuta(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <CarritoProvider>
        <Routes>
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:categoria" element={<Categorias />} />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>,
  );
}

describe("Página Categorías", () => {
  it("muestra un link por cada categoría", () => {
    renderEnRuta("/categorias");

    expect(screen.getAllByRole("link", { name: /productos/ }).length).toBe(obtenerCategorias().length);
  });

  it("sin categoría elegida no muestra productos", () => {
    renderEnRuta("/categorias");

    expect(screen.queryAllByRole("article").length).toBe(0);
  });

  it("al entrar a /categorias/bebidas muestra solo las bebidas", () => {
    renderEnRuta("/categorias/bebidas");

    const bebidas = obtenerCatalogo().filter((producto) => producto.categoria === "bebidas");
    expect(screen.getAllByRole("article").length).toBe(bebidas.length);
  });

  it("una categoría que no existe muestra un aviso", () => {
    renderEnRuta("/categorias/no-existe");

    expect(screen.getByText(/Esa categoría no existe/)).toBeTruthy();
  });
});
