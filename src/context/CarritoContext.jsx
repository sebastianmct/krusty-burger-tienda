import { createContext, useContext, useEffect, useState } from "react";

// El carrito se comparte entre varias páginas (menú, detalle, carrito),
// por eso vive en un Context. Solo guardamos id y cantidad de cada producto.

const CLAVE = "krustyBurgerCart";
const CarritoContext = createContext(null);

function itemValido(item) {
  return item && typeof item.id === "string" && Number.isInteger(item.cantidad) && item.cantidad > 0;
}

// Lee el carrito guardado en localStorage (si no hay nada, empieza vacío)
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

  // Cada vez que cambia el carrito se guarda en localStorage
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items));
  }, [items]);

  function agregar(id, cantidad = 1) {
    const existe = items.some((item) => item.id === id);
    if (existe) {
      setItems(items.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + cantidad } : item)));
    } else {
      setItems([...items, { id, cantidad }]);
    }
  }

  // Si la cantidad llega a 0 el producto se quita del carrito
  function actualizar(id, cantidad) {
    setItems(items.map((item) => (item.id === id ? { ...item, cantidad } : item)).filter(itemValido));
  }

  function vaciar() {
    setItems([]);
  }

  function eliminar(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <CarritoContext.Provider value={{ items, agregar, actualizar, eliminar, vaciar }}>
      {children}
    </CarritoContext.Provider>
  );
}

// Hook para usar el carrito desde cualquier componente
// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  return useContext(CarritoContext);
}
