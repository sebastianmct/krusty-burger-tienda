import { screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { CarritoProvider } from "../context/CarritoContext";
import Navbar from "../components/Navbar";
import Cuenta from "../pages/Cuenta";
import { FRASES_DESPEDIDA } from "../data/frases";
import { crearOrden } from "../services/adminData";
import { registrar } from "../services/auth";
import { renderConTienda } from "./ayudas";

const ned = {
  run: "190110222",
  nombre: "Ned",
  apellidos: "Flanders",
  correo: "ned@gmail.com",
  password: "ab1!",
  region: "Metropolitana de Santiago",
  comuna: "Maipu",
  direccion: "Av. Siempreviva 742",
};

function PanelDePrueba() {
  const { sesion, iniciar, cerrar } = useAuth();
  return (
    <>
      <span data-testid="quien">{sesion ? sesion.nombre : "nadie"}</span>
      <button onClick={() => iniciar("ned@gmail.com", "ab1!")}>entrar</button>
      <button onClick={cerrar}>salir</button>
    </>
  );
}

describe("AuthContext y despedida", () => {
  beforeEach(() => {
    registrar(ned);
  });

  it("iniciar() guarda la sesión y cerrar() la borra", () => {
    renderConTienda(<PanelDePrueba />);
    expect(screen.getByTestId("quien").textContent).toBe("nadie");

    fireEvent.click(screen.getByText("entrar"));
    expect(screen.getByTestId("quien").textContent).toBe("Ned");

    fireEvent.click(screen.getByText("salir"));
    expect(screen.getByTestId("quien").textContent).toBe("nadie");
  });

  it("al cerrar sesión aparece Homero o Krusty despidiéndose", () => {
    renderConTienda(<PanelDePrueba />);
    fireEvent.click(screen.getByText("entrar"));

    fireEvent.click(screen.getByText("salir"));

    const despedida = screen.getByRole("dialog");
    const frases = Object.values(FRASES_DESPEDIDA);
    expect(frases.some((frase) => despedida.textContent.includes(frase))).toBe(
      true,
    );
  });

  it("la despedida se cierra con el botón 'Volver a la tienda'", () => {
    renderConTienda(<PanelDePrueba />);
    fireEvent.click(screen.getByText("entrar"));
    fireEvent.click(screen.getByText("salir"));

    fireEvent.click(screen.getByRole("button", { name: "Volver a la tienda" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("Botón de cuenta en el Navbar", () => {
  function renderNavbar() {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>,
    );
  }

  it("sin sesión muestra el acceso al inicio de sesión", () => {
    renderNavbar();

    expect(screen.getByLabelText("Iniciar sesión").getAttribute("href")).toBe(
      "/login",
    );
  });

  it("con sesión muestra el nombre y un menú con 'Cerrar sesión'", () => {
    sessionStorage.setItem(
      "krustySesion",
      JSON.stringify({ id: "x", nombre: "Ned", tipoUsuario: "Cliente" }),
    );
    renderNavbar();

    fireEvent.click(screen.getByRole("button", { name: /Ned/ }));

    expect(
      screen.getByRole("link", { name: /Mi cuenta/ }).getAttribute("href"),
    ).toBe("/cuenta");
    expect(screen.getByRole("button", { name: /Cerrar sesión/ })).toBeTruthy();
    expect(screen.queryByText(/Panel admin/)).toBeNull();
  });

  it("un administrador ve además el acceso al panel", () => {
    sessionStorage.setItem(
      "krustySesion",
      JSON.stringify({ id: "x", nombre: "Ned", tipoUsuario: "Administrador" }),
    );
    renderNavbar();

    fireEvent.click(screen.getByRole("button", { name: /Ned/ }));

    expect(screen.getByRole("link", { name: /Panel admin/ })).toBeTruthy();
  });
});

describe("Página Mi cuenta", () => {
  function renderCuenta() {
    return render(
      <MemoryRouter initialEntries={["/cuenta"]}>
        <AuthProvider>
          <CarritoProvider>
            <Routes>
              <Route path="/cuenta" element={<Cuenta />} />
              <Route path="/login" element={<p>Página de login</p>} />
            </Routes>
          </CarritoProvider>
        </AuthProvider>
      </MemoryRouter>,
    );
  }

  it("sin sesión redirige al login", () => {
    renderCuenta();

    expect(screen.getByText("Página de login")).toBeTruthy();
  });

  it("con sesión muestra los datos y el historial de compras", () => {
    const usuario = registrar(ned).usuario;
    sessionStorage.setItem(
      "krustySesion",
      JSON.stringify({
        id: usuario.id,
        correo: ned.correo,
        nombre: "Ned",
        tipoUsuario: "Cliente",
      }),
    );
    crearOrden({
      cliente: { nombre: "Ned", apellidos: "Flanders", correo: ned.correo },
      entrega: { calle: "x", region: "r", comuna: "c" },
      lineas: [],
      totales: { subtotal: 0, impuestos: 0, despacho: 0, total: 8038 },
      estado: "Pagada",
    });
    renderCuenta();

    expect(screen.getByRole("heading", { name: "Mi cuenta" })).toBeTruthy();
    expect(screen.getByDisplayValue(ned.correo)).toBeTruthy();
    expect(screen.getByText("$8.038")).toBeTruthy();
  });

  it("el botón 'Cerrar sesión' despide al usuario", () => {
    const usuario = registrar(ned).usuario;
    sessionStorage.setItem(
      "krustySesion",
      JSON.stringify({
        id: usuario.id,
        correo: ned.correo,
        nombre: "Ned",
        tipoUsuario: "Cliente",
      }),
    );
    renderCuenta();

    fireEvent.click(screen.getByRole("button", { name: "Cerrar sesión" }));

    expect(screen.getByRole("dialog")).toBeTruthy();
  });
});
