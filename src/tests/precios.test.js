import { precioFinal, obtenerOfertas, obtenerCatalogo } from "../data/productos";

describe("precioFinal()", () => {
  it("si el producto no tiene descuento devuelve su precio normal", () => {
    expect(precioFinal({ precio: 4990 })).toBe(4990);
  });

  it("si tiene descuento lo aplica (15% de 5.990 = 5.092)", () => {
    expect(precioFinal({ precio: 5990, descuento: 15 })).toBe(5092);
  });
});

describe("obtenerOfertas()", () => {
  it("devuelve solo productos con descuento", () => {
    const ofertas = obtenerOfertas();

    expect(ofertas.length).toBeGreaterThan(0);
    expect(ofertas.every((producto) => producto.descuento > 0)).toBe(true);
    expect(ofertas.length).toBeLessThan(obtenerCatalogo().length);
  });
});
