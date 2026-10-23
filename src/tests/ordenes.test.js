import {
  crearOrden,
  listarOrdenes,
  listarOrdenesDeCorreo,
  crearIdCategoria,
  guardarCategoria,
  eliminarCategoria,
  listarCategorias,
} from "../services/adminData";

// Orden de ejemplo
function ordenDe(correo) {
  return {
    cliente: { nombre: "Homero", apellidos: "Simpson", correo },
    entrega: { calle: "Av. Siempreviva 742", region: "Metropolitana de Santiago", comuna: "Maipu" },
    lineas: [{ id: "krusty-burger", nombre: "Hamburguesa Krusty", precio: 4990, cantidad: 1 }],
    totales: { subtotal: 4990, impuestos: 948, despacho: 2100, total: 8038 },
    estado: "Pagada",
  };
}

describe("Órdenes de compra", () => {
  it("crearOrden() le agrega id, fecha y un número con el formato AAAAMMDD-001", () => {
    const orden = crearOrden(ordenDe("homero@gmail.com"));

    expect(orden.id).toBeTruthy();
    expect(orden.numero).toMatch(/^\d{8}-001$/);
  });

  it("el número de orden sube con cada compra del día", () => {
    crearOrden(ordenDe("homero@gmail.com"));
    const segunda = crearOrden(ordenDe("homero@gmail.com"));

    expect(segunda.numero).toMatch(/-002$/);
    expect(listarOrdenes().length).toBe(2);
  });

  it("listarOrdenesDeCorreo() solo devuelve las compras de ese cliente", () => {
    crearOrden(ordenDe("homero@gmail.com"));
    crearOrden(ordenDe("marge@gmail.com"));

    expect(listarOrdenesDeCorreo("marge@gmail.com").length).toBe(1);
  });
});

describe("Categorías", () => {
  it("crearIdCategoria() convierte el nombre en un identificador", () => {
    expect(crearIdCategoria("Papas Fritas")).toBe("papas-fritas");
  });

  it("guardarCategoria() agrega una categoría nueva", () => {
    const antes = listarCategorias().length;

    guardarCategoria({ valor: "combos", etiqueta: "Combos", descripcion: "Para compartir" });

    expect(listarCategorias().length).toBe(antes + 1);
  });

  it("no deja eliminar una categoría que tiene productos", () => {
    const resultado = eliminarCategoria("hamburguesas");

    expect(resultado.ok).toBe(false);
  });

  it("deja eliminar una categoría sin productos", () => {
    guardarCategoria({ valor: "combos", etiqueta: "Combos" });

    expect(eliminarCategoria("combos").ok).toBe(true);
  });
});
