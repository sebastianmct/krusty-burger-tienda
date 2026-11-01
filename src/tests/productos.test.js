import {
  esHamburguesaPesada,
  obtenerCatalogo,
  obtenerPruebaDeTontos,
} from "../data/productos";

describe("Catálogo (nombres y detalle de la comida)", () => {
  const catalogo = obtenerCatalogo();

  it("los productos tienen los nombres verificados de la serie", () => {
    const nombres = catalogo.map((producto) => producto.nombre);

    [
      "The Clogger",
      "Ribwich",
      "Donut Burger",
      "Squishee",
      "Balde de flan",
      "Khlav Kalash",
      "Tomacco",
    ].forEach((nombre) => {
      expect(nombres).toContain(nombre);
    });
  });

  it("todos los productos tienen ingredientes y calorías", () => {
    expect(
      catalogo.every(
        (producto) => producto.ingredientes.length > 0 && producto.calorias > 0,
      ),
    ).toBe(true);
  });

  it("solo las hamburguesas de 900 calorías o más son pesadas", () => {
    const pesadas = catalogo
      .filter(esHamburguesaPesada)
      .map((producto) => producto.id);

    expect(pesadas).toEqual([
      "double-krusty-burger",
      "the-clogger",
      "donut-burger",
    ]);
  });

  it("hay productos a prueba de tontos", () => {
    expect(obtenerPruebaDeTontos().length).toBeGreaterThan(0);
  });
});
