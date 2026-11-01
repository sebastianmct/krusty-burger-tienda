import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";
import Checkout from "../pages/Checkout";
import CompraExitosa from "../pages/CompraExitosa";
import PagoError from "../pages/PagoError";
import { listarOrdenes } from "../services/adminData";
import { buscarProducto, precioFinal } from "../data/productos";
import { FRASE_BURNS, FRASE_DUFFMAN, FRASE_OTTO } from "../data/frases";
import { calcularTotales } from "../utils/carrito";
import { formatoPrecio } from "../utils/formato";

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

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), {
    target: { value: valor },
  });
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
    localStorage.setItem(
      "krustyBurgerCart",
      JSON.stringify([{ id: "krusty-burger", cantidad: 1 }]),
    );
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

    fireEvent.click(
      screen.getByRole("button", { name: "Volver a realizar el pago" }),
    );

    expect(screen.getByLabelText("Nombre *").value).toBe("Homero");
  });

  it("sin bebidas la entrega especial de Duffman no se puede elegir", () => {
    renderCheckout();

    expect(screen.getByLabelText(/Quiero que Duffman/).disabled).toBe(true);
  });

  it("con una bebida se puede elegir la entrega de Duffman: aparece bailando y suma $1.990", () => {
    localStorage.setItem(
      "krustyBurgerCart",
      JSON.stringify([{ id: "buzz-cola", cantidad: 1 }]),
    );
    renderCheckout();
    const precio = precioFinal(buscarProducto("buzz-cola"));
    const sinExtra = calcularTotales([{ precio, cantidad: 1 }], 0).total;

    expect(screen.queryByText(FRASE_DUFFMAN)).toBeNull();
    expect(
      screen.getByText("Total a pagar: " + formatoPrecio(sinExtra)),
    ).toBeTruthy();

    fireEvent.click(screen.getByLabelText(/Quiero que Duffman/));

    expect(screen.getByText(FRASE_DUFFMAN)).toBeTruthy();
    expect(
      screen.getByText("Total a pagar: " + formatoPrecio(sinExtra + 1990)),
    ).toBeTruthy();
  });

  it("si el formulario tiene errores muestra un aviso D'oh!", () => {
    renderCheckout();

    fireEvent.click(screen.getByRole("button", { name: /Pagar ahora/ }));

    expect(
      screen.getByText("Revisa los campos marcados en rojo."),
    ).toBeTruthy();
  });

  it("en la compra exitosa aparecen el Sr. Burns y Otto con su bus", () => {
    renderCheckout();
    llenarFormulario();

    fireEvent.click(screen.getByRole("button", { name: /Pagar ahora/ }));

    expect(screen.getByText(FRASE_BURNS)).toBeTruthy();
    expect(screen.getByText(FRASE_OTTO)).toBeTruthy();
  });

  it("en el pago rechazado aparece el Gordo Tony", () => {
    renderCheckout();
    llenarFormulario();
    escribir(/Simulador de pago/, "rechazado");

    fireEvent.click(screen.getByRole("button", { name: /Pagar ahora/ }));

    expect(screen.getByText("Gordo Tony")).toBeTruthy();
    expect(screen.getByText(/Tony no perdona las deudas/)).toBeTruthy();
  });
});
