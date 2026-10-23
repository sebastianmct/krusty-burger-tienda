# Pruebas unitarias (Jasmine + Karma)

- **Jasmine** es el framework con el que se escriben las pruebas: `describe` → `it` → `expect`.
- **Karma** es el programa que abre un navegador (Chrome sin ventana), carga las pruebas y muestra los resultados.
- **React Testing Library** sirve para renderizar los componentes y simular lo que hace el usuario (clics, escribir).
- **webpack + esbuild** empaquetan las pruebas (Karma no entiende JSX por sí solo).

Todo corre en tu computador, no necesitas internet ni ningún servicio en la nube. **Necesitas Google Chrome instalado.**

## Comandos

```bash
npm test             # corre todas las pruebas una vez (Chrome sin ventana)
npm run test:watch   # abre Chrome y vuelve a correr las pruebas cada vez que guardas un archivo
npm run coverage     # corre las pruebas y muestra el % de cobertura (también crea coverage/index.html)
```

Si no tienes Chrome pero sí Edge, indícale a Karma dónde está (Windows, PowerShell):

```powershell
$env:CHROME_BIN="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"; npm test
```

## Configuración

| Archivo | Para qué sirve |
| --- | --- |
| `karma.conf.cjs` | Configuración de Karma: usa Jasmine, empaqueta con webpack, abre `ChromeHeadless` y define la cobertura |
| `src/tests/setup.js` | Se ejecuta primero: después de cada prueba limpia el DOM, `localStorage` y `sessionStorage` |
| `src/tests/ayudas.jsx` | `renderConTienda()`: renderiza un componente con Router y carrito, como en la tienda real |
| `src/tests/cobertura-todo.js` | Solo para `npm run coverage`: incluye en el % también los archivos que no tienen pruebas |

## Qué prueba cada archivo (`src/tests/`)

| Archivo | Qué verifica | Tipo |
| --- | --- | --- |
| `validaciones.test.js` | RUN, correo, contraseña y validación de cada formulario | Lógica |
| `utilidades.test.js` | Totales del carrito (19% + despacho) y formato de precio | Lógica |
| `precios.test.js` | Precio con descuento y listado de ofertas | Lógica |
| `MensajeError.test.jsx` | Muestra el error solo si hay texto | Renderizado condicional |
| `ModalEliminar.test.jsx` | Recibe título y mensaje, y llama a `onConfirmar` / `onCancelar` | Props y eventos |
| `TarjetaProducto.test.jsx` | Muestra nombre y precio; "Agregar" cambia el texto y guarda en el carrito | Props, estado y eventos |
| `Menu.test.jsx` | Lista todos los productos, filtra por categoría y ordena por precio | Lista y estado |
| `Ofertas.test.jsx` | Solo se muestran productos en oferta, con su etiqueta | Lista |
| `Categorias.test.jsx` | Links por categoría, filtro por URL y categoría inexistente | Rutas y filtro |
| `Blog.test.jsx` | Listado de artículos y detalle según la URL | Lista y rutas |
| `Carrito.test.jsx` | Carrito vacío, total a pagar, botón +, botón Eliminar | Estado y eventos |
| `Checkout.test.jsx` | Errores del formulario, pago aprobado y pago rechazado | Flujo completo |
| `Contacto.test.jsx` | Escribir en el formulario, errores y envío (con API simulada) | Estado, eventos y mocks |
| `Login.test.jsx` | Errores del formulario y credenciales incorrectas / correctas | Formulario |
| `Rutas.test.jsx` | Detalle por URL, link del Navbar y ruta protegida del admin | Navegación |
| `auth.test.js` | Registrar, iniciar y cerrar sesión | Lógica con localStorage |
| `ordenes.test.js` | Órdenes (número, historial) y categorías (crear, eliminar) | Lógica con localStorage |
| `api.test.js` | GET y POST a las APIs con `fetch` simulado | Mocks |
| `PersonajeDelDia.test.jsx` | Cargando → datos → error al traer un personaje de la API | Mocks y asincronía |

## Mocks que usamos (Jasmine)

- `jasmine.createSpy()` → función falsa para saber si fue llamada (`ModalEliminar.test.jsx`).
- `spyOn(window, "fetch").and.returnValue(...)` → reemplaza `fetch` para no llamar a internet. Jasmine lo restaura solo al terminar cada prueba (`api.test.js`, `PersonajeDelDia.test.jsx`, `Contacto.test.jsx`).
- `expect(espia).toHaveBeenCalled()`, `.toHaveBeenCalledTimes(1)`, `.toHaveBeenCalledWith(...)` → comprueban cómo se usó el espía.
- `await expectAsync(promesa).toBeRejectedWithError("mensaje")` → comprueba que una función async falla.

## APIs que usa la tienda (`src/services/api.js`)

- **The Simpsons API** (`GET https://thesimpsonsapi.com/api/characters/{id}`): trae el "Personaje del día" del inicio.
- **JSONPlaceholder** (`POST https://jsonplaceholder.typicode.com/posts`): recibe las quejas del formulario de contacto.

## Cómo escribir una prueba nueva (en 4 pasos)

En Jasmine `describe`, `it`, `expect`, `beforeEach` y `afterEach` ya existen: **no se importan**.
Ejemplo: probar que `MensajeError` muestra el texto que recibe.

```jsx
// 1. Importar el componente y lo de Testing Library
import { render, screen } from "@testing-library/react";
import MensajeError from "../components/MensajeError";

// 2. Agrupar con describe y nombrar la prueba con it
describe("MensajeError", () => {
  it("muestra el texto cuando hay un error", () => {
    // 3. Renderizar el componente
    render(<MensajeError texto="El RUN es obligatorio." />);

    // 4. Comprobar el resultado
    expect(screen.getByText("El RUN es obligatorio.")).toBeTruthy();
  });
});
```

- El archivo debe llamarse `Algo.test.jsx` (o `.test.js`) y estar dentro de `src/tests/`.
- Si el componente usa `<Link>` o el carrito, usa `renderConTienda(<Componente />)` en vez de `render`.
- Para un clic: `fireEvent.click(screen.getByRole("button", { name: "Texto" }))`.
- Para escribir: `fireEvent.change(screen.getByLabelText("Etiqueta"), { target: { value: "texto" } })`.
- **Cuidado:** un `beforeEach` escrito fuera de un `describe` se aplica a TODAS las pruebas del proyecto. Escríbelo siempre dentro del `describe`.
