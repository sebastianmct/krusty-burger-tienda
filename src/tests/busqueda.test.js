import {
  buscarProductos,
  normalizar,
  ID_COMBO_TRADICIONAL,
} from "../utils/busqueda";
import { FRASE_SKINNER } from "../data/frases";
import { obtenerCatalogo } from "../data/productos";

describe("normalizar()", () => {
  it("pasa a minúsculas y quita las tildes", () => {
    expect(normalizar("  Hamburguesas AL Vapor ÁÉÍ ")).toBe(
      "hamburguesas al vapor aei",
    );
  });
});

describe("buscarProductos()", () => {
  const catalogo = obtenerCatalogo();

  it("sin texto devuelve todo el catálogo", () => {
    expect(buscarProductos(catalogo, "").productos.length).toBe(
      catalogo.length,
    );
  });

  it("busca por nombre sin importar mayúsculas ni tildes", () => {
    const ids = buscarProductos(catalogo, "BUZZ").productos.map(
      (producto) => producto.id,
    );

    expect(ids).toContain("buzz-cola");
    expect(ids).toContain("diet-buzz");
    expect(ids.length).toBeLessThan(catalogo.length);
  });

  it("también busca dentro de los ingredientes", () => {
    const { productos } = buscarProductos(catalogo, "lúpulo");

    expect(productos.some((producto) => producto.id === "duff-beer")).toBe(
      true,
    );
  });

  it("'hamburguesas al vapor' devuelve solo el combo tradicional con el sticker de Skinner", () => {
    const resultado = buscarProductos(catalogo, "Hamburguesas al Vapor");

    expect(resultado.productos.length).toBe(1);
    expect(resultado.productos[0].id).toBe(ID_COMBO_TRADICIONAL);
    expect(resultado.especial).toEqual({
      quien: "skinner",
      frase: FRASE_SKINNER,
    });
  });

  it("una búsqueda normal no activa el sticker", () => {
    expect(buscarProductos(catalogo, "papas").especial).toBeNull();
  });
});
