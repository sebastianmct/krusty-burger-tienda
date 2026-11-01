const catalogoBase = [
  {
    id: "krusty-burger",
    nombre: "Hamburguesa Krusty",
    categoria: "hamburguesas",
    categoriaLabel: "Hamburguesas",
    descripcion:
      "La hamburguesa clásica de Krusty Burger, directamente desde Springfield.",
    precio: 4990,
    imagen: "assets/krusty-burger.webp",
    imagenes: [
      "assets/krusty-burger1.jpg",
      "assets/krusty-burger2.jpg",
      "assets/krusty-burger.webp",
    ],
    alt: "Krusty Burger",
    tema: "",
    nota: "La clásica hamburguesa de Springfield.",
    millhouse: "¡Es la Krusty Burger original!",
    burns: "Un clásico con excelentes márgenes.",
    original: "Krusty Burger",
    ingredientes: [
      "Pan de sésamo",
      "Carne de res",
      "Queso cheddar",
      "Lechuga",
      "Tomate",
      "Pepinillos",
      "Salsa secreta Krusty",
    ],
    alergenos: ["Gluten", "Lácteos", "Sésamo"],
    calorias: 650,
    pruebaDeTontos: true,
  },

  {
    id: "double-krusty-burger",
    descuento: 15,
    nombre: "Doble Krusty Burger",
    categoria: "hamburguesas",
    categoriaLabel: "Hamburguesas",
    descripcion: "Doble carne, doble queso y todo el sabor de Krusty Burger.",
    precio: 5990,
    imagen: "assets/doble-krusty-burger.jpg",
    imagenes: [
      "assets/doble-krusty-burger1.jpg",
      "assets/doble-krusty-burger2.jpg",
      "assets/doble-krusty-burger.jpg",
    ],
    alt: "Double Krusty Burger",
    tema: "producto-amarillo",
    nota: "Porque una Krusty Burger nunca es suficiente.",
    millhouse: "¡Dos carnes! ¡Esto es increíble!",
    burns: "Dos carnes significan mayores ganancias.",
    original: "Double Krusty Burger",
    ingredientes: [
      "Pan de sésamo",
      "Doble carne de res",
      "Doble queso cheddar",
      "Lechuga",
      "Tomate",
      "Salsa secreta Krusty",
    ],
    alergenos: ["Gluten", "Lácteos", "Sésamo"],
    calorias: 920,
  },

  {
    id: "the-clogger",
    nombre: "The Clogger",
    categoria: "hamburguesas",
    categoriaLabel: "Hamburguesas",
    descripcion:
      "La enorme hamburguesa creada por Homer. Con carne, tocino y todo lo necesario para bloquear tus arterias.",
    precio: 6990,
    imagen: "assets/the-clogger.jpg",
    imagenes: [
      "assets/the-clogger1.webp",
      "assets/the-clogger2.jpg",
      "assets/the-clogger.jpg",
    ],
    alt: "The Clogger",
    tema: "producto-rosa",
    nota: "Si buscas algo saludable, definitivamente no es esta.",
    millhouse: "¡Creo que puedo sentir mis arterias!",
    burns: "Excelente. Nadie pidió que fueran saludable.",
    original: "The Clogger",
    ingredientes: [
      "Pan especial",
      "Dos carnes de res (2/3 de libra)",
      "Tocino ahumado",
      "Salsa de queso cheddar",
      "Salsa secreta",
      "Tomate gigante",
      "Lechuga",
    ],
    alergenos: ["Gluten", "Lácteos"],
    calorias: 1250,
  },

  {
    id: "ribwich",
    descuento: 20,
    nombre: "Ribwich",
    categoria: "hamburguesas",
    categoriaLabel: "Hamburguesas",
    descripcion: "El famoso sándwich de costillas que volvió loco a Homer.",
    precio: 6490,
    imagen: "assets/ribwich.webp",
    imagenes: [
      "assets/ribwich1.gif",
      "assets/ribwich2.jpg",
      "assets/ribwich.webp",
    ],
    alt: "Ribwich",
    tema: "",
    nota: "Disponible por tiempo limitado. ¡Corre antes de que desaparezca!",
    millhouse: "¡Homer no puede dejar de comerla!",
    burns: "Un producto limitado siempre aumenta la demanda.",
    original: "Ribwich",
    ingredientes: [
      "Pan blando",
      "Carne moldeada con forma de costillas",
      "Salsa barbacoa",
    ],
    alergenos: ["Gluten"],
    calorias: 780,
  },

  {
    id: "donut-burger",
    nombre: "Donut Burger",
    categoria: "hamburguesas",
    categoriaLabel: "Hamburguesas",
    descripcion:
      "La hamburguesa servida entre dos mitades de rosquilla glaseada. Springfield nunca pregunta cómo.",
    precio: 6490,
    imagen: "assets/doughnut-burger.jpg",
    imagenes: [
      "assets/doughnut-burger1.jpg",
      "assets/doughnut-burger2.jpg",
      "assets/doughnut-burger.jpg",
    ],
    alt: "Doughnut Burger",
    tema: "producto-rosa",
    nota: "Hamburguesa y rosquilla. Una combinación muy Springfield.",
    millhouse: "¡Hamburguesa y rosquilla juntas!",
    burns: "Una combinación muy rentable.",
    original: "Donut Burger",
    ingredientes: [
      "Dos mitades de rosquilla glaseada",
      "Carne de res",
      "Queso",
      "Tocino",
    ],
    alergenos: ["Gluten", "Lácteos", "Huevo"],
    calorias: 1050,
  },

  {
    id: "krusty-fries",
    nombre: "Papas Krusty",
    categoria: "papas",
    categoriaLabel: "Papas",
    descripcion: "Las clásicas papas fritas de Krusty Burger.",
    precio: 2490,
    imagen: "assets/krusty-fries.png",
    imagenes: [
      "assets/krusty-fries1.jpg",
      "assets/krusty-fries2.jpg",
      "assets/krusty-fries.png",
    ],
    alt: "Krusty Fries",
    tema: "",
    nota: "Doradas, crujientes y listas para acompañar tu Krusty Burger.",
    millhouse: "¡Estas papas necesitan ketchup!",
    burns: "Un acompañamiento de bajo costo.",
    original: "Krusty Fries",
    ingredientes: ["Papas", "Aceite vegetal", "Sal"],
    alergenos: [],
    calorias: 380,
    pruebaDeTontos: true,
  },

  {
    id: "krusty-curly-fries",
    descuento: 10,
    nombre: "Papas rizadas Krusty",
    categoria: "papas",
    categoriaLabel: "Papas",
    descripcion: "Papas fritas rizadas con queso al estilo Krusty Burger.",
    precio: 2990,
    imagen: "assets/krusty-curly-fries.jpg",
    imagenes: [
      "assets/krusty-curly-fries1.jpg",
      "assets/krusty-curly-fries2.jpg",
      "assets/krusty-curly-fries.jpg",
    ],
    alt: "Krusty Curly Fries",
    tema: "producto-amarillo",
    nota: "Rizadas, crujientes y con queso.",
    millhouse: "¡Son papas con curvas!",
    burns: "Más queso significa más ganancias.",
    original: "Krusty Curly Fries",
    ingredientes: ["Papas rizadas", "Queso cheddar fundido", "Sazón Krusty"],
    alergenos: ["Lácteos"],
    calorias: 520,
  },

  {
    id: "krusty-nuggets",
    nombre: "Nuggets Krusty",
    categoria: "papas",
    categoriaLabel: "Acompañamientos",
    descripcion: "Nuggets de pollo inspirados en el menú de Krusty Burger.",
    precio: 2990,
    imagen: "assets/krusty-nuggets.jpg",
    imagenes: [
      "assets/krusty-nuggets1.jpg",
      "assets/krusty-nuggets2.webp",
      "assets/krusty-nuggets.jpg",
    ],
    alt: "Krusty Nuggets",
    tema: "",
    nota: "Disponibles en 6, 12 o 24 piezas.",
    millhouse: "¡Voy a necesitar muchas más!",
    burns: "Compra más unidades y aumenta el margen.",
    original: "Krusty Nuggets",
    ingredientes: ["Pollo empanizado", "Aceite vegetal", "Salsa agridulce"],
    alergenos: ["Gluten", "Huevo"],
    calorias: 450,
  },

  {
    id: "bacon-balls",
    nombre: "Bolitas de tocino",
    categoria: "papas",
    categoriaLabel: "Acompañamientos",
    descripcion: "Bolitas de tocino del menú de Krusty Burger.",
    precio: 2790,
    imagen: "assets/bacon.png",
    imagenes: ["assets/bacon.png", "assets/bacon1.jpg", "assets/bacon2.avif"],
    alt: "Bacon Balls",
    tema: "producto-rosa",
    nota: "Una pequeña bomba de tocino.",
    millhouse: "¡Todo sabe mejor con tocino!",
    burns: "Una inversión pequeña y deliciosa.",
    original: "Bacon Balls",
    ingredientes: ["Tocino picado", "Queso", "Empanizado crujiente"],
    alergenos: ["Gluten", "Lácteos"],
    calorias: 480,
  },

  {
    id: "buffalo-things",
    nombre: "Buffalo Things",
    categoria: "papas",
    categoriaLabel: "Acompañamientos",
    descripcion: "Un acompañamiento picante del extraño menú de Krusty Burger.",
    precio: 2790,
    imagen: "assets/buffalo.jpg",
    imagenes: [
      "assets/buffalo1.jpg",
      "assets/buffalo2.jpg",
      "assets/buffalo.jpg",
    ],
    alt: "Buffalo Things",
    tema: "",
    nota: "Para quienes quieren algo diferente.",
    millhouse: "¡Esto pica!",
    burns: "El picante genera clientes fieles.",
    original: "Buffalo Things",
    ingredientes: [
      "Trozos de pollo",
      "Salsa búfalo picante",
      "Aderezo de queso azul",
    ],
    alergenos: ["Lácteos"],
    calorias: 510,
    picante: true,
  },

  {
    id: "buzz-cola",
    nombre: "Buzz Cola",
    categoria: "bebidas",
    categoriaLabel: "Bebidas",
    descripcion:
      "La famosa bebida de Springfield. Dulce, energética y muy reconocible.",
    precio: 2990,
    imagen: "assets/buzz-cola.jpg",
    imagenes: [
      "assets/buzz-cola1.webp",
      "assets/buzz-cola2.png",
      "assets/buzz-cola.jpg",
    ],
    alt: "Buzz Cola",
    tema: "producto-rosa",
    nota: "La bebida oficial para acompañar cualquier Krusty Burger.",
    millhouse: "¡Más azúcar, más cafeína!",
    burns: "Una bebida con excelente potencial comercial.",
    original: "Buzz Cola",
    ingredientes: [
      "Agua carbonatada",
      "Azúcar",
      "Cafeína",
      "Colorante caramelo",
      "Sabor secreto Buzz",
    ],
    alergenos: [],
    calorias: 210,
    pruebaDeTontos: true,
  },

  {
    id: "diet-buzz",
    nombre: "Diet Buzz Cola",
    categoria: "bebidas",
    categoriaLabel: "Bebidas",
    descripcion: "La versión sin azúcar de la famosa Buzz Cola.",
    precio: 2990,
    imagen: "assets/diet-buzz-cola.png",
    imagenes: [
      "assets/diet-buzz-cola1.jpg",
      "assets/diet-buzz-cola.png",
      "assets/diet-buzz-cola1.jpg",
    ],
    alt: "Diet Buzz",
    tema: "",
    nota: "Menos azúcar. El mismo Springfield.",
    millhouse: "¡Es Buzz Cola pero dietética!",
    burns: "Un nuevo mercado siempre es una oportunidad.",
    original: "Diet Buzz Cola",
    ingredientes: [
      "Agua carbonatada",
      "Edulcorante",
      "Cafeína",
      "Colorante caramelo",
    ],
    alergenos: [],
    calorias: 5,
  },

  {
    id: "krusty-orange-drink",
    nombre: "Bebida de naranja Krusty",
    categoria: "bebidas",
    categoriaLabel: "Bebidas",
    descripcion: "La bebida de naranja de la marca Krusty.",
    precio: 2490,
    imagen: "assets/orange-drink.webp",
    imagenes: [
      "assets/orange-drink.webp",
      "assets/orange-drink1.jpg",
      "assets/orange-drink.webp",
    ],
    alt: "Krusty Orange Drink",
    tema: "producto-amarillo",
    nota: "Dulce, naranja y sospechosamente brillante.",
    millhouse: "¡Tiene sabor a naranja!",
    burns: "El color naranja vende muy bien.",
    original: "Krusty Orange Drink",
    ingredientes: ["Agua", "Concentrado de naranja", "Azúcar", "Vitamina C"],
    alergenos: [],
    calorias: 180,
  },

  {
    id: "krusty-shake",
    descuento: 25,
    nombre: "Malteada Krusty",
    categoria: "bebidas",
    categoriaLabel: "Bebidas",
    descripcion: "El clásico batido de Krusty Burger.",
    precio: 2990,
    imagen: "assets/krusty-shake.jpg",
    imagenes: [
      "assets/krusty-shake1.webp",
      "assets/krusty-shake2.jpg",
      "assets/krusty-shake.jpg",
    ],
    alt: "Krusty Shake",
    tema: "producto-rosa",
    nota: "Perfecto para acompañar una hamburguesa.",
    millhouse: "¡Quiero uno de chocolate!",
    burns: "El batido aumenta considerablemente el ticket.",
    original: "Krusty Shake",
    ingredientes: ["Leche", "Helado de vainilla", "Jarabe de chocolate"],
    alergenos: ["Lácteos"],
    calorias: 420,
  },

  {
    id: "squishee",
    nombre: "Squishee",
    categoria: "bebidas",
    categoriaLabel: "Bebidas",
    descripcion:
      "La bebida congelada del Kwik-E-Mart de Apu, favorita de los niños de Springfield.",
    precio: 2490,
    imagen: "assets/squishee.webp",
    imagenes: [
      "assets/squishee1.jpg",
      "assets/squishee2.jpg",
      "assets/squishee.webp",
    ],
    alt: "Squishee",
    tema: "",
    nota: "Frío, dulce y perfecto para Springfield.",
    millhouse: "¡Un Squishee gigante!",
    burns: "Los niños siempre compran más.",
    original: "Squishee",
    ingredientes: ["Hielo", "Jarabe de cereza", "Colorante"],
    alergenos: [],
    calorias: 240,
  },

  {
    id: "rosquilla-homer",
    descuento: 30,
    nombre: "Rosquilla de Homero",
    categoria: "dulces",
    categoriaLabel: "Dulces",
    descripcion: "La clásica rosquilla rosada con glaseado y sprinkles.",
    precio: 1990,
    imagen: "assets/homero-rosquilla.webp",
    imagenes: [
      "assets/homero-rosquilla1.jpg",
      "assets/homero-rosquilla2.jpg",
      "assets/homero-rosquilla.webp",
    ],
    alt: "Rosquilla rosada de Homero",
    tema: "producto-rosa",
    nota: "Mmm... rosquillas.",
    millhouse: "¡Mmm... rosquillas!",
    burns: "Una rosquilla siempre mejora las ventas.",
    ingredientes: ["Masa frita", "Glaseado rosado", "Chispas de colores"],
    alergenos: ["Gluten", "Huevo", "Lácteos"],
    calorias: 300,
  },

  {
    id: "krusty-ice-cream",
    nombre: "Helado Krusty",
    categoria: "dulces",
    categoriaLabel: "Dulces",
    descripcion: "Helado de la marca Krusty para terminar el banquete.",
    precio: 2290,
    imagen: "assets/krusty-ice-cream.jpg",
    imagenes: [
      "assets/krusty-ice-cream1.webp",
      "assets/krusty-ice-cream2.webp",
      "assets/krusty-ice-cream.jpg",
    ],
    alt: "Krusty Ice Cream",
    tema: "producto-amarillo",
    nota: "El postre perfecto después de una Krusty Burger.",
    millhouse: "¡Helado!",
    burns: "El postre es donde está el verdadero margen.",
    original: "Krusty Ice Cream",
    ingredientes: ["Leche", "Crema", "Azúcar", "Vainilla"],
    alergenos: ["Lácteos"],
    calorias: 280,
  },

  {
    id: "krusty-cookies",
    nombre: "Galletas Krusty",
    categoria: "dulces",
    categoriaLabel: "Dulces",
    descripcion: "Galletas de la marca Krusty.",
    precio: 1990,
    imagen: "assets/krusty-cookies.jpg",
    imagenes: [
      "assets/krusty-cookies1.jpg",
      "assets/krusty-cookies2.jpg",
      "assets/krusty-cookies.jpg",
    ],
    alt: "Krusty Cookies",
    tema: "",
    nota: "Pequeñas, dulces y listas para acompañar tu pedido.",
    millhouse: "¡Dame una caja completa!",
    burns: "Un producto económico de producir.",
    original: "Krusty Cookies",
    ingredientes: ["Harina", "Mantequilla", "Chispas de chocolate", "Azúcar"],
    alergenos: ["Gluten", "Lácteos", "Huevo"],
    calorias: 220,
  },

  {
    id: "bucket-flan",
    nombre: "Balde de flan",
    categoria: "dulces",
    categoriaLabel: "Dulces",
    descripcion: "Un enorme balde de flan para compartir... o no.",
    precio: 3490,
    imagen: "assets/flanders.jpg",
    imagenes: [
      "assets/flanders1.jpg",
      "assets/flanders2.jpg",
      "assets/flanders.jpg",
    ],
    alt: "Party-Size Bucket of Flan",
    tema: "producto-rosa",
    nota: "Sí. Es un balde de flan.",
    millhouse: "¿¡Todo ese flan es para mí!?",
    burns: "Excelente relación cantidad-precio.",
    original: "Bucket of Flan",
    ingredientes: ["Leche", "Huevos", "Azúcar", "Caramelo"],
    alergenos: ["Lácteos", "Huevo"],
    calorias: 1400,
  },

  {
    id: "krusty-os",
    nombre: "Krusty-O's",
    categoria: "dulces",
    categoriaLabel: "Cereales",
    descripcion:
      "Los famosos cereales de Krusty, directamente desde Springfield.",
    precio: 2990,
    imagen: "assets/krusty-os.webp",
    imagenes: [
      "assets/krusty-os1.jpg",
      "assets/krusty-os2.jpg",
      "assets/krusty-os.webp",
    ],
    alt: "Krusty-O's",
    tema: "producto-amarillo",
    nota: "Parte de un desayuno digno de Springfield.",
    millhouse: "¡Los cereales de Krusty!",
    burns: "Una marca dentro de otra marca. Magnífico.",
    ingredientes: [
      "Cereal de maíz",
      "Azúcar",
      "Vitaminas",
      "Sello de aprobación de Krusty",
    ],
    alergenos: ["Gluten"],
    calorias: 190,
  },
  {
    id: "tomacco",
    nombre: "Tomacco",
    categoria: "especiales",
    categoriaLabel: "Especiales",
    descripcion: "El famoso invento de Homer: mitad tomate y mitad tabaco.",
    precio: 3990,
    imagen: "assets/tomacco.jpg",
    imagenes: [
      "assets/tomacco1.jpg",
      "assets/tomacco2.jpg",
      "assets/tomacco.jpg",
    ],
    alt: "Tomacco",
    tema: "",
    nota: "50% tomate. 50% tabaco. 100% Springfield.",
    millhouse: "¿Esto realmente se puede comer?",
    burns: "¡Tomate y tabaco! Una combinación brillante.",
    original: "Tomacco",
    ingredientes: ["Tomate", "Hojas de tabaco (según Homero)", "Sal"],
    alergenos: [],
    calorias: 90,
  },

  {
    id: "khlav-kalash",
    descuento: 15,
    nombre: "Khlav Kalash",
    categoria: "especiales",
    categoriaLabel: "Especiales",
    descripcion:
      "El misterioso plato vendido por el vendedor callejero de Springfield.",
    precio: 3990,
    imagen: "assets/khlav-kalash.jpg",
    imagenes: [
      "assets/khlav-kalash1.jpg",
      "assets/khlav-kalash2.jpg",
      "assets/khlav-kalash.jpg",
    ],
    alt: "Khlav Kalash",
    tema: "producto-rosa",
    nota: "¡No se sirve con agua mineral! Se sirve con jugo de cangrejo.",
    millhouse: "¡¿Qué clase de comida es esta?!",
    burns: "Extraordinariamente exótico.",
    original: "Khlav Kalash",
    ingredientes: ["Ingredientes secretos del vendedor callejero"],
    alergenos: [],
    calorias: 400,
  },

  {
    id: "duff-beer",
    nombre: "Cerveza Duff",
    categoria: "bebidas",
    categoriaLabel: "Bebidas",
    descripcion:
      "La cerveza favorita de Homero y una de las marcas más famosas de Springfield. Solo para mayores de 18 años.",
    precio: 2490,
    imagen: "assets/cerveza-duff.webp",
    imagenes: [
      "assets/cerveza-duff1.jpg",
      "assets/cerveza-duff2.webp",
      "assets/cerveza-duff.webp",
    ],
    alt: "Duff Beer",
    tema: "producto-amarillo",
    nota: "La bebida favorita de Homer.",
    millhouse: "¡Duff!",
    burns: "Una marca extraordinariamente rentable.",
    original: "Duff Beer",
    ingredientes: ["Agua", "Malta", "Lúpulo", "Levadura"],
    alergenos: ["Gluten"],
    calorias: 150,
  },

  {
    id: "sideshow-bob-footlong",
    nombre: "Hot dog Sideshow Bob",
    categoria: "especiales",
    categoriaLabel: "Especiales",
    descripcion:
      "Un enorme hot dog inspirado en uno de los productos más absurdos de Springfield.",
    precio: 4490,
    imagen: "assets/sideshow-bob-footlong.jpg",
    imagenes: [
      "assets/sideshow-bob-footlong1.jpg",
      "assets/sideshow-bob-footlong2.jpg",
      "assets/sideshow-bob-footlong.jpg",
    ],
    alt: "Sideshow Bob Footlong",
    tema: "",
    nota: "Un hot dog tan largo como los planes de Sideshow Bob.",
    millhouse: "¡Eso es demasiado grande!",
    burns: "Más largo significa más producto.",
    original: "Sideshow Bob Foot Long",
    ingredientes: ["Salchicha extra larga", "Pan largo", "Mostaza", "Cebolla"],
    alergenos: ["Gluten"],
    calorias: 620,
  },

  {
    id: "combo-tradicional",
    nombre: "Combo Tradicional Krusty",
    categoria: "combos",
    categoriaLabel: "Combos",
    descripcion:
      "El combo de siempre: Hamburguesa Krusty, Papas Krusty y una Buzz Cola bien helada.",
    precio: 8490,
    imagen: "assets/krusty-combo.jpg",
    imagenes: [
      "assets/krusty-combo.jpg",
      "assets/krusty-combo-promo.png",
      "assets/krusty-burger.webp",
    ],
    alt: "Combo Tradicional Krusty",
    tema: "",
    nota: "Todo lo que necesitas, sin pensar demasiado.",
    millhouse: "¡Con papas y bebida incluidas!",
    burns: "Tres productos por el precio de... casi tres.",
    ingredientes: ["Hamburguesa Krusty", "Papas Krusty", "Buzz Cola"],
    alergenos: ["Gluten", "Lácteos", "Sésamo"],
    calorias: 1240,
    pruebaDeTontos: true,
  },
];

function leerLista(clave) {
  try {
    const lista = JSON.parse(localStorage.getItem(clave) || "[]");
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function obtenerCatalogo() {
  const eliminados = leerLista("krustyProductosEliminados");
  const productosAdmin = leerLista("krustyAdminProductos");

  const catalogo = catalogoBase
    .filter((producto) => !eliminados.includes(producto.id))
    .map((producto) => ({ ...producto }));

  productosAdmin.forEach((admin) => {
    if (eliminados.includes(admin.id)) return;

    const existente = catalogo.find((producto) => producto.id === admin.id);
    if (existente) {
      existente.nombre = admin.nombre || existente.nombre;
      existente.descripcion = admin.descripcion || existente.descripcion;
      existente.precio = admin.precio != null ? admin.precio : existente.precio;
      existente.categoria = admin.categoria || existente.categoria;
      existente.categoriaLabel =
        admin.categoriaLabel || existente.categoriaLabel;
      if (admin.imagen) existente.imagen = admin.imagen;
    } else {
      const imagen = admin.imagen || "assets/krusty-burger.webp";
      catalogo.push({
        id: admin.id,
        nombre: admin.nombre,
        categoria: admin.categoria,
        categoriaLabel: admin.categoriaLabel,
        descripcion: admin.descripcion || "",
        precio: admin.precio,
        imagen,
        imagenes: [imagen],
        alt: admin.nombre,
        tema: "",
        nota: admin.descripcion || "Una creación especial de Krusty Burger.",
        millhouse: "¡Se ve increíble!",
        burns: "Un producto con buen margen.",
      });
    }
  });

  const categorias = obtenerCategorias();
  return catalogo.map((producto) => {
    const categoria = categorias.find((c) => c.valor === producto.categoria);
    return {
      ...producto,
      categoriaLabel: categoria ? categoria.etiqueta : producto.categoriaLabel,
    };
  });
}

export function buscarProducto(id) {
  return obtenerCatalogo().find((producto) => producto.id === id);
}

export const CATEGORIAS_BASE = [
  {
    valor: "hamburguesas",
    etiqueta: "Hamburguesas",
    descripcion: "Las favoritas de Springfield",
    icono: "ti-burger",
  },
  {
    valor: "papas",
    etiqueta: "Papas",
    descripcion: "Crujientes y bien saladas",
    icono: "ti-tools-kitchen-2",
  },
  {
    valor: "dulces",
    etiqueta: "Rosquillas",
    descripcion: "Dulces y glaseadas",
    icono: "ti-chart-donut",
  },
  {
    valor: "bebidas",
    etiqueta: "Bebidas",
    descripcion: "Frías y refrescantes",
    icono: "ti-cup",
  },
  {
    valor: "especiales",
    etiqueta: "Especiales",
    descripcion: "Para valientes",
    icono: "ti-star",
  },
  {
    valor: "combos",
    etiqueta: "Combos",
    descripcion: "Para compartir",
    icono: "ti-tools-kitchen-2",
  },
];

export function obtenerCategorias() {
  const guardadas = leerLista("krustyAdminCategorias");
  return guardadas.length > 0 ? guardadas : CATEGORIAS_BASE;
}

export function etiquetaCategoria(valor) {
  const categoria = obtenerCategorias().find((c) => c.valor === valor);
  return categoria ? categoria.etiqueta : valor;
}

export function precioFinal(producto) {
  if (!producto.descuento) return producto.precio;
  return Math.round(producto.precio * (1 - producto.descuento / 100));
}

export function obtenerOfertas() {
  return obtenerCatalogo().filter((producto) => producto.descuento > 0);
}

export function esHamburguesaPesada(producto) {
  return producto.categoria === "hamburguesas" && producto.calorias >= 900;
}

export function obtenerPruebaDeTontos() {
  return obtenerCatalogo().filter((producto) => producto.pruebaDeTontos);
}
