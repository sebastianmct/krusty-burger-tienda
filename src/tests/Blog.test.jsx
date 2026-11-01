import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Blog from "../pages/Blog";
import DetalleBlog from "../pages/DetalleBlog";
import { blogs } from "../data/blogs";

describe("Blog", () => {
  it("el listado muestra todos los artículos", () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("article").length).toBe(blogs.length);
  });

  it("el detalle muestra el título del artículo según la URL", () => {
    render(
      <MemoryRouter initialEntries={["/blog/" + blogs[0].id]}>
        <Routes>
          <Route path="/blog/:id" element={<DetalleBlog />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: blogs[0].titulo })).toBeTruthy();
  });

  it("Lisa toca el saxofón en el encabezado", () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>,
    );

    expect(screen.getByText("Lisa toca jazz mientras lees.")).toBeTruthy();
    expect(screen.getByLabelText("Saxofón")).toBeTruthy();
  });
});
