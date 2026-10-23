import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";
import Checkout from "../pages/Checkout";
import CompraExitosa from "../pages/CompraExitosa";
import PagoError from "../pages/PagoError";
import { listarOrdenes } from "../services/adminData";

// Renderiza el checkout con las pantallas de resultado como rutas
function renderCheckout() {
  return render(
    <MemoryRouter initialEntries={["/checkout"]}>
      <CarritoProvider>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra/exitosa/:id" element={<CompraExitosa />} />
          <Route path="/compra/error/:id" element={<PagoError />} />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>,
  );
}

// Escribe en un campo como lo haría un usuario
function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

function llenarFormulario() {
  escribir("Nombre *", "Homero");
  escribir("Apellidos *", "Simpson");
  escribir("Correo *", "homero@gmail.com");
  escribir("Calle *", "Av. Siempreviva 742");
  escribir("Región *", "Metropolitana de Santiago");
  escribir("Comuna *", "Maipu");
}

describe("Checkout", () => {
  beforeEach(() => {
    // Una Hamburguesa Krusty en el carrito: 4.990 + 948 de impuestos + 2.100 de despacho = 8.038
    localStorage.setItem("krustyBurgerCart", JSON.stringify([{ id: "krusty-burger", cantidad: 1 }]));
  });

  it("con el carrito vacío avisa que no hay nada que pagar", () => {
    localStorage.clear();
    renderCheckout();

    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy();
  });

  it("muestra el total a pagar", () => {
    renderCheckout();

    expect(screen.getByText("Total a pagar: $8.038")).toBeTruthy();
  });

  it("si se envía vacío muestra los errores y no crea ninguna orden", () => {
    renderCheckout();

    fireEvent.click(screen.getByRole("button", { name: /Pagar ahora/ }));

    expect(screen.getByText("La calle es obligatoria.")).toBeTruthy();
    expect(listarOrdenes().length).toBe(0);
  });

  it("con el pago aprobado guarda la orden, vacía el carrito y muestra la boleta", () => {
    renderCheckout();
    llenarFormulario();

    fireEvent.click(screen.getByRole("button", { name: /Pagar ahora/ }));

    expect(screen.getByText(/Se ha realizado la compra/)).toBeTruthy();
    expect(listarOrdenes()[0].estado).toBe("Pagada");
    expect(JSON.parse(localStorage.getItem("krustyBurgerCart"))).toEqual([]);
  });

  it("con el pago rechazado muestra el error y mantiene el carrito", () => {
    renderCheckout();
    llenarFormulario();
    escribir(/Simulador de pago/, "rechazado");

    fireEvent.click(screen.getByRole("button", { name: /Pagar ahora/ }));

    expect(screen.getByText(/No se pudo realizar el pago/)).toBeTruthy();
    expect(listarOrdenes()[0].estado).toBe("Pago rechazado");
    expect(JSON.parse(localStorage.getItem("krustyBurgerCart")).length).toBe(1);
  });

  it("'Volver a realizar el pago' vuelve al checkout con los datos ya escritos", () => {
    renderCheckout();
    llenarFormulario();
    escribir(/Simulador de pago/, "rechazado");
    fireEvent.click(screen.getByRole("button", { name: /Pagar ahora/ }));

    fireEvent.click(screen.getByRole("button", { name: "Volver a realizar el pago" }));

    expect(screen.getByLabelText("Nombre *").value).toBe("Homero");
  });
});
