![Banner](https://capsule-render.vercel.app/api?type=waving&color=0:F59E0B,100:1A1A2E&height=140&section=header&text=Krusty+Burger&fontSize=42&fontColor=fff&fontAlign=50&fontAlignY=55)

# Krusty Burger Tienda

> Tienda online de comida rápida inspirada en Los Simpsons, desarrollada con React (Vite) y Bootstrap. Proyecto del ramo Desarrollo Fullstack II (DSY1104) de Duoc UC.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

**Demo:** https://sebastianmct.github.io/krusty-burger-tienda/

---

## ¿Qué es esto?

Tienda virtual de Krusty Burger con estilo cartoon y temática de Los Simpsons. Tiene una **tienda pública** y un **panel administrador**.

**Tienda:** inicio, menú (con buscador), categorías, ofertas, detalle de producto, carrito, checkout (con pago correcto y pago con error), blog (con detalle), nosotros, promociones, contacto, registro, login y cuenta de usuario.

**Panel admin:** dashboard, órdenes y boletas, productos (con stock crítico e inventario), categorías, usuarios (con historial de compras), reportes y perfil.

La versión original estaba hecha con HTML, CSS y JavaScript puro; esta versión la migra a **React** manteniendo el mismo diseño y la misma lógica.

---

## Stack

- **React 19** + **Vite** (componentes, props y estados).
- **React Router** (`HashRouter`) para la navegación entre páginas.
- **Bootstrap 5** (instalado con npm) para grid, formularios y diseño responsive.
- **Tabler Icons** para la iconografía.
- **Jasmine + Karma** (con React Testing Library) para las pruebas unitarias (ver [PRUEBAS.md](PRUEBAS.md)).
- **The Simpsons API** y **JSONPlaceholder** (con `fetch`) para el personaje del día y el formulario de contacto.
- **CSS** propio (una hoja por página, igual que la versión original).
- **`localStorage` / `sessionStorage`** para el carrito, los datos del admin y la sesión.

---

## Inicio rápido

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # versión para producción (carpeta dist)
npm test         # pruebas unitarias (necesita Google Chrome)
npm run coverage # pruebas + cobertura
```

Para entrar al panel admin: regístrate con un correo `@duoc.cl` (se crea como Administrador), inicia sesión y usa el enlace "¿Eres administrador o vendedor? Entra al panel" en el login.

---

## Estructura

```
public/assets/            # Imágenes y audio
src/
├── main.jsx              # Punto de entrada (Bootstrap, iconos y <App />)
├── App.jsx               # Rutas de la aplicación
├── components/           # Navbar, Footer, TarjetaProducto, GaleriaProducto, MensajeError...
│   └── admin/            # PaginaAdmin, ModalEliminar, ToastAdmin
├── pages/                # Una página por ruta de la tienda
│   └── admin/            # Páginas del panel administrador
├── context/              # CarritoContext (estado del carrito)
├── hooks/                # useFormulario (formularios) y useEstilos (CSS por página)
├── services/             # adminData (productos/usuarios en localStorage), auth (login/registro) y api (fetch)
├── tests/                # Pruebas unitarias (Jasmine + Karma)
├── data/                 # Catálogo de productos y regiones/comunas
├── utils/                # validaciones (TODAS en un solo archivo), formato, carrito
└── styles/               # Hojas de estilo de cada página
```

## Validaciones

Todas las reglas de validación están en `src/utils/validaciones.js`. Cada formulario (login, registro, contacto, producto y usuario del admin) llama a una sola función (`validarLogin`, `validarRegistro`, ...) que devuelve los errores, y el hook `useFormulario` se encarga de mostrarlos.

---

<div align="center">

Creado por **Sebastián Caamaño** y **Vicente Ordenes**

*I am Groot.*
</div>

---

## Ambientación de Springfield

La tienda está llena de personajes de Los Simpson (los diálogos están en `src/data/frases.js` y las fotos en `src/data/personajes.js`):

- **Fotos:** vienen de The Simpsons API. Si una foto no carga se usa la foto local y, si tampoco hay, una insignia con las iniciales. Para usar tus propias imágenes pon la ruta en el campo `foto` del personaje (carpeta `public/assets`).
- **Cuenta de usuario:** el navbar muestra el nombre del usuario con un menú (Mi cuenta, Panel admin, Cerrar sesión). Al cerrar sesión se despide Homero o Krusty.
- **Chat de ayuda:** Rafa responde preguntas frecuentes.
- **Avisos:** el Dr. Hibbert avisa si hay más de 3 hamburguesas pesadas en el carrito; las alertas de error usan el "¡D'OH!".
- **Compra:** entrega especial de bebidas con Duffman, Otto "va en camino" y el Sr. Burns en el pago exitoso; el Gordo Tony en el pago rechazado.
- **Otras vistas:** policías en el registro, Snake en el login, Bart en las ofertas, Cletus en los productos a prueba de tontos, Lisa en el blog y Apu como personaje del día.
- **Búsqueda especial:** al buscar "hamburguesas al vapor" aparece el combo tradicional con el sticker del Director Skinner.
