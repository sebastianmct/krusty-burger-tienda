import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LayoutTienda from "../components/LayoutTienda";
import Categorias from "../pages/Categorias";

describe("Layout de la tienda", () => {
  it("mantiene el footer al fondo del viewport en páginas cortas", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/categorias"]}>
        <Routes>
          <Route element={<LayoutTienda />}>
            <Route path="/categorias" element={<Categorias />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const layout = container.querySelector(".kb-layout-tienda");

    expect(layout).toBeTruthy();
    expect(layout.classList.contains("min-vh-100")).toBe(true);
    expect(layout.classList.contains("d-flex")).toBe(true);
    expect(layout.classList.contains("flex-column")).toBe(true);
    expect(layout.firstElementChild.nextElementSibling.classList.contains("flex-grow-1")).toBe(true);
    expect(screen.getByRole("contentinfo").parentElement).toBe(layout);
  });
});
