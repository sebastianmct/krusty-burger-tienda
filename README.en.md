![Banner](https://capsule-render.vercel.app/api?type=waving&color=0:F59E0B,100:1A1A2E&height=140&section=header&text=Krusty+Burger&fontSize=42&fontColor=fff&fontAlign=50&fontAlignY=55)

# Krusty Burger Store

> Fast-food online store inspired by The Simpsons, built with React (Vite) and Bootstrap. Project for the Fullstack Development II (DSY1104) course at Duoc UC.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

**Demo:** https://sebastianmct.github.io/krusty-burger-tienda/

**[Leer en español](README.md)**

---

## What is this?

A Krusty Burger virtual store with a cartoon style and a Simpsons theme. It includes a **public store** and an **admin panel**.

**Store:** home, menu (with search), categories, deals, product details, cart, checkout (successful and failed payments), blog (with article details), about us, promotions, contact, sign-up, login, and user account.

**Admin panel:** dashboard, orders and receipts, products (with critical stock and inventory), categories, users (with purchase history), reports, and profile.

The original version was built with plain HTML, CSS, and JavaScript; this version migrates it to **React** while preserving the same design and logic.

---

## Stack

- **React 19** + **Vite** (components, props, and state).
- **React Router** (`HashRouter`) for page navigation.
- **Bootstrap 5** (installed with npm) for the grid, forms, and responsive design.
- **Tabler Icons** for iconography.
- **Jasmine + Karma** (with React Testing Library) for unit tests (see [PRUEBAS.md](PRUEBAS.md)).
- **The Simpsons API** and **JSONPlaceholder** (with `fetch`) for the character of the day and the contact form.
- Custom **CSS** (one stylesheet per page, as in the original version).
- **`localStorage` / `sessionStorage`** for the cart, admin data, and session.

---

## Quick start

```bash
npm install
npm run dev      # development server
npm run build    # production build (dist folder)
npm test         # unit tests (requires Google Chrome)
npm run coverage # tests + coverage
```

To access the admin panel: sign up with an `@duoc.cl` email address (you will be created as an Administrator), sign in, and use the "Are you an administrator or vendor? Enter the panel" link on the login page.

---

## Structure

```
public/assets/            # Images and audio
src/
├── main.jsx              # Entry point (Bootstrap, icons, and <App />)
├── App.jsx               # Application routes
├── components/           # Navbar, Footer, TarjetaProducto, GaleriaProducto, MensajeError...
│   └── admin/            # PaginaAdmin, ModalEliminar, ToastAdmin
├── pages/                # One page per store route
│   └── admin/            # Admin panel pages
├── context/              # CarritoContext (cart state)
├── hooks/                # useFormulario (forms) and useEstilos (page CSS)
├── services/             # adminData (products/users in localStorage), auth (login/sign-up), and api (fetch)
├── tests/                # Unit tests (Jasmine + Karma)
├── data/                 # Product catalog and regions/communes
├── utils/                # Validation (ALL in one file), formatting, cart
└── styles/               # Stylesheets for each page
```

## Validation

All validation rules are in `src/utils/validaciones.js`. Each form (login, sign-up, contact, product, and admin user) calls a single function (`validarLogin`, `validarRegistro`, ...) that returns the errors, and the `useFormulario` hook displays them.

---

## Springfield atmosphere

The store is full of Simpsons characters (dialogues are in `src/data/frases.js` and photos are in `src/data/personajes.js`):

- **Photos:** fetched from The Simpsons API. If a photo fails to load, a local photo is used; if that is unavailable too, a badge with the character's initials is displayed. To use your own images, set the path in the character's `foto` field (in the `public/assets` folder).
- **User account:** the navbar displays the user's name with a menu (My Account, Admin Panel, Sign Out). When signing out, Homer or Krusty says goodbye.
- **Help chat:** Ralph answers frequently asked questions.
- **Alerts:** Dr. Hibbert warns you if there are more than 3 heavy burgers in the cart; error alerts use "D'OH!".
- **Checkout:** special drink delivery with Duffman, Otto is "on his way," and Mr. Burns appears after a successful payment; Fat Tony appears after a declined payment.
- **Other views:** police officers on sign-up, Snake on login, Bart on deals, Cletus on foolproof products, Lisa on the blog, and Apu as the character of the day.
- **Special search:** searching for "steamed hams" displays the traditional combo with a Principal Skinner sticker.

---

![Simpsons](./public/assets/nuestro-equipo.png)

<div align="center">

Created by **Sebastián Caamaño** and **Vicente Ordenes**

*I am Groot.*
</div>
