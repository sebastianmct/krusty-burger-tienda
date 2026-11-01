import { createContext, useContext, useEffect, useState } from "react";

const CLAVE = "krustyBurgerCart";
const CarritoContext = createContext(null);

function itemValido(item) {
  return (
    item &&
    typeof item.id === "string" &&
    Number.isInteger(item.cantidad) &&
    item.cantidad > 0
  );
}

function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE) || "[]");
    return Array.isArray(guardado) ? guardado.filter(itemValido) : [];
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(cargarCarrito);

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items));
  }, [items]);

  function agregar(id, cantidad = 1) {
    const existe = items.some((item) => item.id === id);
    if (existe) {
      setItems(
        items.map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        ),
      );
    } else {
      setItems([...items, { id, cantidad }]);
    }
  }

  function actualizar(id, cantidad) {
    setItems(
      items
        .map((item) => (item.id === id ? { ...item, cantidad } : item))
        .filter(itemValido),
    );
  }

  function vaciar() {
    setItems([]);
  }

  function eliminar(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <CarritoContext.Provider
      value={{ items, agregar, actualizar, eliminar, vaciar }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
