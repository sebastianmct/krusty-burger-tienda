// Se ejecuta antes de las pruebas (está listado primero en karma.conf.cjs).
// Después de cada prueba dejamos todo limpio para que una prueba no afecte a la siguiente.
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup(); // desmonta los componentes renderizados
  localStorage.clear(); // borra carrito, usuarios, órdenes, etc.
  sessionStorage.clear(); // borra la sesión
});
