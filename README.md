![Banner](https://capsule-render.vercel.app/api?type=waving&color=0:F59E0B,100:1A1A2E&height=140&section=header&text=Krusty+Burger&fontSize=42&fontColor=fff&fontAlign=50&fontAlignY=55)

# Krusty Burger Tienda

> Tienda online de comida rápida inspirada en Los Simpsons, desarrollada con HTML, CSS, JavaScript y Bootstrap. Proyecto de la Evaluación 1 (30%) del ramo Desarrollo Frontend (DSY1104) de Duoc UC.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

**Demo:** https://sebastianmct.github.io/krusty-burger-tienda/

---

## ¿Qué es esto?

Este proyecto es una tienda virtual de Krusty Burger, con estilo cartoon y temática de Los Simpsons. Está compuesto por dos partes: una **tienda pública** (inicio, menú, detalle de producto, carrito, nosotros, promociones, contacto, registro y login) y un **panel administrador** para gestionar productos y usuarios (listar, crear, editar, ver y eliminar).

>*La idea fue crear una experiencia visual simple y dinámica para mostrar productos, promociones y la identidad del restaurante de una forma amigable y moderna.*

---

## Stack

- **HTML5** semántico.
- **CSS3** propio (una hoja de estilos externa por página/sección).
- **JavaScript** vanilla (sin frameworks) para renderizado dinámico, validaciones y persistencia.
- **[Bootstrap 5.3.3](https://getbootstrap.com/)** (CSS + JS bundle, vía CDN jsDelivr) para grid, componentes (navbar, formularios, toasts) y utilidades responsive.
- **[Tabler Icons](https://tabler.io/icons)** (vía CDN) para la iconografía.
- **`localStorage`** como persistencia del lado del cliente (carrito de compras y datos del panel admin).
- **Git / GitHub** para control de versiones (ramas `main`, `rama-s`, `rama-v`).

---

## Funcionalidades

### Tienda
- **Página principal (`index.html`)** con hero, filtro rápido de categorías y grilla de productos destacados.
- **Menú (`menu.html`)** con listado completo de productos, filtro por categoría en barra lateral y orden por precio/popularidad.
- **Detalle de producto (`detalle-producto.html`)** con selector de cantidad y botón para añadir al carrito.
- **Carrito de compras (`carrito.html`)**, persistido en `localStorage`, con edición de cantidades, cálculo de subtotal, impuestos, despacho y total.
- **Registro (`registrarse.html`)** y **login (`login.html`)** con validaciones en tiempo real (RUN con dígito verificador, email, contraseña, región/comuna en cascada).
- **Contacto (`contacto.html`)** con formulario validado (nombre, email opcional, comentario).
- **Nosotros (`nosotros.html`)** y **Promociones (`promociones.html`)** con contenido institucional y destacados.
- **Diseño responsive** con el grid de Bootstrap y estilos propios por página.

### Panel administrador (`/admin`)
- **Dashboard (`admin/index.html`)** con resumen y navegación lateral.
- **Mantenedor de productos**: listar (`productos.html`), crear (`producto-nuevo.html`), editar (`producto-editar.html`) y ver ficha (`producto-mostrar.html`), con validaciones (código, nombre, precio, stock, stock crítico, categoría).
- **Mantenedor de usuarios**: listar (`usuarios.html`), crear (`usuario-nuevo.html`), editar (`usuario-editar.html`) y ver ficha (`usuario-mostrar.html`), con validación de RUN, dominios de correo permitidos (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`) y región/comuna en cascada.
- Datos de ejemplo (seed) y persistencia en `localStorage`.

---

## Inicio rápido

1. Clona el repositorio:

```bash
git clone https://github.com/sebastianmct/krusty-burger-tienda.git
cd krusty-burger-tienda
```

2. Abre `index.html` en el navegador (no se necesita servidor ni instalación, es un sitio 100% estático):

```bash
index.html
```

3. Navega el sitio desde el menú superior. Para entrar al panel admin, usa el enlace "¿Eres administrador o vendedor? Entra al panel" en `login.html`, o abre directamente `admin/index.html`.

---

## Estructura

```
.
├── index.html                     # Página principal
├── menu.html                      # Listado de productos
├── detalle-producto.html          # Detalle de un producto
├── carrito.html                   # Carrito de compras
├── login.html                     # Inicio de sesión
├── registrarse.html               # Registro de usuario
├── contacto.html                  # Formulario de contacto
├── nosotros.html                  # Información del restaurante
├── promociones.html               # Promociones destacadas
├── README.md                      # Documentación del proyecto
│
├── css/                           # Hojas de estilo de la tienda (una por vista)
│   ├── style-home.css
│   ├── style-menu.css
│   ├── style-detalle-producto.css
│   ├── style-carrito.css
│   ├── style-login.css
│   ├── style-registrarse.css
│   ├── style-contacto.css
│   ├── style-nosotros.css
│   └── style-promociones.css
│
├── js/                             # Lógica de la tienda
│   ├── productos.js                # Catálogo de productos (datos)
│   ├── menu.js                     # Filtros y render del menú
│   ├── detalle.js                  # Render de la vista de detalle
│   ├── carrito.js                  # API del carrito (localStorage)
│   ├── carrito-pagina.js           # Render de la vista carrito.html
│   ├── validaciones-formularios.js # Validaciones de login/registro/contacto
│   └── nelson.js                   # Easter egg en login
│
├── admin/                          # Panel administrador
│   ├── index.html                  # Dashboard
│   ├── productos.html              # Listado de productos
│   ├── producto-nuevo.html         # Crear producto
│   ├── producto-editar.html        # Editar producto
│   ├── producto-mostrar.html       # Ficha de producto
│   ├── usuarios.html               # Listado de usuarios
│   ├── usuario-nuevo.html          # Crear usuario
│   ├── usuario-editar.html         # Editar usuario
│   ├── usuario-mostrar.html        # Ficha de usuario
│   ├── css/style-admin.css         # Estilos del panel admin
│   └── js/
│       ├── admin-data.js           # "Backend" simulado (localStorage) + validación RUN
│       ├── admin-ui.js             # Sidebar, toggles, utilidades UI
│       ├── admin-productos.js      # Lógica de productos (CRUD)
│       └── admin-usuarios.js       # Lógica de usuarios (CRUD)
│
└── assets/                         # Imágenes y recursos multimedia del proyecto
```

---

<div align="center">

Creado por **Sebastián Caamaño** y **Vicente Ordenes**

*I am Groot.*
</div>