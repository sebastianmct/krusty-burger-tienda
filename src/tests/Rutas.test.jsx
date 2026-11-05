import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CarritoProvider, useCarrito } from "../context/CarritoContext";
import Navbar from "../components/Navbar";
import DetalleProducto from "../pages/DetalleProducto";
import RutaAdmin from "../components/RutaAdmin";

function renderEnRuta(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <CarritoProvider>
        <Routes>
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>,
  );
}

function AgregarAlCarritoDePrueba() {
  const { agregar } = useCarrito();

  return (
    <button type="button" onClick={() => agregar("krusty-burger", 2)}>
      Agregar dos productos
    </button>
  );
}

function renderNavbar() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CarritoProvider>
          <Navbar />
          <AgregarAlCarritoDePrueba />
        </CarritoProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("Detalle de producto (ingredientes)", () => {
  it("muestra los ingredientes y el nombre original", () => {
    renderEnRuta("/producto/the-clogger");

    expect(screen.getByText("Tocino ahumado")).toBeTruthy();
    expect(screen.getByText("Nombre original")).toBeTruthy();
    expect(screen.getByText("Hamburguesa pesada")).toBeTruthy();
  });

  it("un producto que no existe muestra un aviso D'oh!", () => {
    renderEnRuta("/producto/no-existe");

    expect(screen.getByRole("alert").textContent).toContain("¡D'OH!");
  });
});

describe("Navegación", () => {
  it("la ruta /producto/krusty-burger muestra el detalle de ese producto", () => {
    renderEnRuta("/producto/krusty-burger");

    expect(
      screen.getByRole("heading", { name: "Hamburguesa Krusty" }),
    ).toBeTruthy();
  });

  it("un producto que no existe muestra 'Producto no encontrado'", () => {
    renderEnRuta("/producto/no-existe");

    expect(screen.getByText("Producto no encontrado")).toBeTruthy();
  });

  it("el Navbar tiene un link al menú", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", { name: "Menú" }).getAttribute("href"),
    ).toBe("/menu");
  });

  it("muestra la cantidad total del carrito y la actualiza al agregar productos", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", { name: "Carrito, sin productos" }),
    ).toBeTruthy();
    expect(screen.queryByText("2")).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "Agregar dos productos" }),
    );

    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Carrito, 2 productos" })).toBeTruthy();
  });

  it("muestra el contador abreviado sin perder la cantidad accesible", () => {
    localStorage.setItem(
      "krustyBurgerCart",
      JSON.stringify([{ id: "krusty-burger", cantidad: 120 }]),
    );
    renderNavbar();

    expect(screen.getByText("99+")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Carrito, 120 productos" }),
    ).toBeTruthy();
  });
});

function renderPanelAdmin() {
  return render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route path="/admin" element={<RutaAdmin />}>
          <Route index element={<p>Panel secreto</p>} />
        </Route>
        <Route path="/login" element={<p>Página de login</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Ruta protegida del admin", () => {
  it("sin sesión redirige al login", () => {
    renderPanelAdmin();

    expect(screen.getByText("Página de login")).toBeTruthy();
  });

  it("con sesión de Administrador muestra el panel", () => {
    sessionStorage.setItem(
      "krustySesion",
      JSON.stringify({ nombre: "Ned", tipoUsuario: "Administrador" }),
    );
    renderPanelAdmin();

    expect(screen.getByText("Panel secreto")).toBeTruthy();
  });

  it("con sesión de Cliente redirige al login", () => {
    sessionStorage.setItem(
      "krustySesion",
      JSON.stringify({ nombre: "Ned", tipoUsuario: "Cliente" }),
    );
    renderPanelAdmin();

    expect(screen.getByText("Página de login")).toBeTruthy();
  });
});
