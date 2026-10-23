import { calcularTotales } from "../utils/carrito";
import { formatoPrecio } from "../utils/formato";

describe("calcularTotales()", () => {
  it("calcula subtotal, impuestos (19%), despacho y total", () => {
    const totales = calcularTotales([
      { precio: 4990, cantidad: 2 }, // 9.980
    ]);

    expect(totales.subtotal).toBe(9980);
    expect(totales.impuestos).toBe(1896);
    expect(totales.despacho).toBe(2100);
    expect(totales.total).toBe(13976);
  });

  it("no cobra despacho si el carrito está vacío", () => {
    expect(calcularTotales([]).total).toBe(0);
  });
});

describe("formatoPrecio()", () => {
  it("muestra el precio con signo peso y punto de miles", () => {
    expect(formatoPrecio(4990)).toBe("$4.990");
  });
});
