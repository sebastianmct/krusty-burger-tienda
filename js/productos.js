(function () {
    "use strict";

    // Un solo arreglo alimenta el menú, el detalle y el carrito.
    window.KrustyProductos = [
        {
            id: "krusty-doble",
            nombre: "Súper Krusty Doble",
            categoria: "hamburguesas",
            categoriaLabel: "Hamburguesas",
            descripcion: "Doble carne, doble queso, lechuga fresca, tomate y la salsa secreta de Krusty Burger.",
            precio: 5990,
            imagen: "assets/krusty-doble.jpg",
            imagenes: ["assets/krusty-doble.jpg", "assets/krusty_combo_promo.png", "assets/krusty-burger.jpg"],
            alt: "Súper Krusty Doble",
            tema: "",
            nota: "Preparado al momento. Ideal para un hambre de campeonato.",
            millhouse: "¡Esto sí que es una hamburguesa, Bart!",
            burns: "Excelente... para aumentar las ganancias."
        },
        {
            id: "combo-familiar",
            nombre: "Combo familiar",
            categoria: "combos",
            categoriaLabel: "Combos",
            descripcion: "Dos hamburguesas clásicas, papas grandes y bebidas para compartir en Springfield.",
            precio: 8990,
            imagen: "assets/krusty-combo.jpg",
            imagenes: ["assets/krusty-combo.jpg", "assets/krusty_combo_promo.png", "assets/krusty-burger.jpg"],
            alt: "Combo familiar Krusty",
            tema: "producto-amarillo",
            nota: "Una solución familiar para cuando nadie quiere cocinar.",
            millhouse: "¡Hay suficiente para todos!",
            burns: "Compartir es una palabra muy costosa."
        },
        {
            id: "krusty-clasico",
            nombre: "Krusty clásico",
            categoria: "bebidas",
            categoriaLabel: "Bebidas",
            descripcion: "El sabor original de Krusty Burger para acompañar tus papas y hamburguesas favoritas.",
            precio: 2990,
            imagen: "assets/krusty-bienvenida.jpg",
            imagenes: ["assets/krusty-bienvenida.jpg", "assets/krusty_burguer_fisica.jpg", "assets/krusty-burger.jpg"],
            alt: "Krusty clásico",
            tema: "producto-rosa",
            nota: "Fresco, dulce y listo para acompañar el banquete.",
            millhouse: "Krusty, esto merece una servilleta extra.",
            burns: "Una bebida con potencial financiero."
        },
        {
            id: "rosquillas",
            nombre: "Rosquillas surtidas",
            categoria: "dulces",
            categoriaLabel: "Dulces",
            descripcion: "Rosquillas glaseadas, de chocolate o con sprinkles. El pecado perfecto.",
            precio: 1990,
            imagen: "assets/rosquilla-homero.png",
            imagenes: ["assets/rosquilla-homero.png", "assets/krusty-burger.jpg", "assets/krusty-bienvenida.jpg"],
            alt: "Rosquillas surtidas",
            tema: "producto-rosa",
            nota: "Una selección dulce para cerrar el pedido como corresponde.",
            millhouse: "¡Mmm... rosquillas!",
            burns: "Dulce, redonda y muy rentable."
        },
        {
            id: "papas-krusty",
            nombre: "Papas Krusty",
            categoria: "papas",
            categoriaLabel: "Papas",
            descripcion: "Papas crujientes con el toque secreto de Krusty Burger.",
            precio: 2490,
            imagen: "assets/krusty_combo_promo.png",
            imagenes: ["assets/krusty_combo_promo.png", "assets/krusty-combo.jpg", "assets/krusty-burger.jpg"],
            alt: "Papas Krusty",
            tema: "",
            nota: "Doradas, crujientes y listas para compartir.",
            millhouse: "¡Estas papas necesitan una salsa extra!",
            burns: "Una inversión crujiente."
        },
        {
            id: "cerveza-duff",
            nombre: "Cerveza Duff",
            categoria: "bebidas",
            categoriaLabel: "Bebidas",
            descripcion: "La clásica cerveza de Springfield, fuerte y con carácter.",
            precio: 1490,
            imagen: "assets/barney-cerveza.jpg",
            imagenes: ["assets/barney-cerveza.jpg", "assets/barney-cerveza1.png", "assets/krusty-bienvenida.jpg"],
            alt: "Cerveza Duff",
            tema: "producto-amarillo",
            nota: "Servida bien fría para acompañar cualquier Krusty Burger.",
            millhouse: "Barney dice que esta es la mejor.",
            burns: "No apta para empleados en horario laboral."
        },
        {
            id: "combo-infantil",
            nombre: "Combo infantil",
            categoria: "combos",
            categoriaLabel: "Combos",
            descripcion: "Hamburguesa, papas, bebida y una sorpresa para compartir.",
            precio: 3490,
            imagen: "assets/krusty_kids.jpg",
            imagenes: ["assets/krusty_kids.jpg", "assets/krusty-combo.jpg", "assets/rosquilla-homero.png"],
            alt: "Combo infantil Krusty",
            tema: "",
            nota: "Un pequeño banquete para grandes aventuras.",
            millhouse: "¡Incluye diversión y papas!",
            burns: "Los niños también conocen el valor."
        }
    ];

    window.KrustyBuscarProducto = function (id) {
        return window.KrustyProductos.find(function (producto) {
            return producto.id === id;
        });
    };
}());