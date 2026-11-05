import { fireEvent, screen } from "@testing-library/react";
import Inicio from "../pages/Inicio";
import { guardarCategoria, guardarProducto } from "../services/adminData";
import { renderConTienda } from "./ayudas";

describe("Categorías del menú en Inicio", () => {
  it("muestra y filtra productos de una categoría creada desde administración", () => {
    guardarCategoria({
      valor: "postres-especiales",
      etiqueta: "Postres especiales",
      descripcion: "Dulces para compartir",
    });
    guardarProducto({
      nombre: "Pastel de prueba",
      descripcion: "Postre especial",
      precio: 3500,
      stock: 10,
      categoria: "postres-especiales",
      categoriaLabel: "Postres especiales",
      imagen: "assets/krusty-burger.webp",
    });

    renderConTienda(<Inicio />);
    fireEvent.click(
      screen.getByRole("button", { name: /Postres especiales/ }),
    );

    expect(screen.getAllByRole("article").length).toBe(1);
    expect(screen.getByText("Pastel de prueba")).toBeTruthy();
  });
});
