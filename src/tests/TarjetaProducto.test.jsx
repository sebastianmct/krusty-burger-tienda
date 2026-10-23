import { screen, fireEvent } from "@testing-library/react";
import TarjetaProducto from "../components/TarjetaProducto";
import { renderConTienda } from "./ayudas";

// Producto de ejemplo para no depender del catálogo real
const producto = {
  id: "krusty-burger",
  nombre: "Hamburguesa Krusty",
  categoriaLabel: "Hamburguesas",
  descripcion: "La clásica de Springfield",
  precio: 4990,
  imagen: "assets/krusty-burger.webp",
  alt: "Hamburguesa Krusty",
  tema: "",
};

describe("TarjetaProducto", () => {
  it("muestra el nombre, el precio y un link al detalle (props)", () => {
    renderConTienda(<TarjetaProducto producto={producto} variante="inicio" />);

    expect(screen.getByText("Hamburguesa Krusty")).toBeTruthy();
    expect(screen.getByText("$4.990")).toBeTruthy();
    expect(screen.getByRole("link").getAttribute("href")).toBe("/producto/krusty-burger");
  });

  it("al hacer clic en AGREGAR cambia el texto a 'Agregado' (estado)", () => {
    renderConTienda(<TarjetaProducto producto={producto} variante="inicio" />);

    fireEvent.click(screen.getByRole("button", { name: "AGREGAR" }));

    expect(screen.getByRole("button", { name: "Agregado" })).toBeTruthy();
  });

  it("al hacer clic en AGREGAR guarda el producto en el carrito (localStorage)", () => {
    renderConTienda(<TarjetaProducto producto={producto} variante="inicio" />);

    fireEvent.click(screen.getByRole("button", { name: "AGREGAR" }));

    const carrito = JSON.parse(localStorage.getItem("krustyBurgerCart"));
    expect(carrito).toEqual([{ id: "krusty-burger", cantidad: 1 }]);
  });
});
