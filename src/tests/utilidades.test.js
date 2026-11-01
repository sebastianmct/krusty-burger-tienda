import {
  calcularTotales,
  contarHamburguesasPesadas,
  hayBebidas,
} from "../utils/carrito";
import { formatoPrecio } from "../utils/formato";

describe("calcularTotales()", () => {
  it("calcula subtotal, impuestos (19%), despacho y total", () => {
    const totales = calcularTotales([{ precio: 4990, cantidad: 2 }]);

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

describe("calcularTotales() con entrega especial", () => {
  it("suma el cobro extra al total", () => {
    const totales = calcularTotales([{ precio: 4990, cantidad: 2 }], 1990);

    expect(totales.extra).toBe(1990);
    expect(totales.total).toBe(13976 + 1990);
  });

  it("no cobra el extra si el carrito está vacío", () => {
    expect(calcularTotales([], 1990).total).toBe(0);
  });
});

describe("Carrito: hamburguesas pesadas y bebidas", () => {
  it("cuenta solo las hamburguesas pesadas", () => {
    const items = [
      { id: "the-clogger", cantidad: 2 },
      { id: "double-krusty-burger", cantidad: 1 },
      { id: "krusty-burger", cantidad: 5 },
    ];

    expect(contarHamburguesasPesadas(items)).toBe(3);
  });

  it("hayBebidas() detecta si hay alguna bebida", () => {
    expect(hayBebidas([{ id: "buzz-cola", cantidad: 1 }])).toBe(true);
    expect(hayBebidas([{ id: "krusty-burger", cantidad: 1 }])).toBe(false);
  });
});
