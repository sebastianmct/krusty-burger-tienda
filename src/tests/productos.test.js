import {
  esHamburguesaPesada,
  obtenerCatalogo,
  obtenerPruebaDeTontos,
} from "../data/productos";

describe("Catálogo (nombres y detalle de la comida)", () => {
  const catalogo = obtenerCatalogo();

  it("muestra en español latino los nombres de todo el catálogo", () => {
    const nombres = catalogo.map((producto) => producto.nombre);

    expect(nombres).toEqual([
      "Hamburguesa Krusty",
      "Doble Krustyhamburguesa",
      "Taparteria",
      "Costillita",
      "Hamburguesa de rosquilla",
      "Papas fritas Krusty",
      "Papas en espiral Krusty",
      "Nuggets de pollo Krusty",
      "Bolitas de tocino",
      "Alitas de pollo estilo búfalo",
      "Buzz Cola",
      "Buzz Cola sin azúcar",
      "Refresco de naranja Krusty",
      "Malteada de Krusty",
      "Squishee",
      "Rosquilla rosa de Homero",
      "Helado de Krusty",
      "Galletas Krusty",
      "Balde de flan de Ned Flanders",
      "Cereales Krusty-O's",
      "Tomacco",
      "Khlav Kalash",
      "Cerveza Duff",
      "Hot dog de Bob Patiño",
      "Combo clásico Krusty",
    ]);
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
