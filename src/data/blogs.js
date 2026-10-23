// Artículos del blog de la tienda (datos de ejemplo)
export const blogs = [
  {
    id: "historia-hamburguesa-krusty",
    titulo: "La historia de la Hamburguesa Krusty",
    resumen: "Cómo nació la hamburguesa más famosa de Springfield (y por qué nadie pregunta de qué está hecha).",
    fecha: "2026-09-14",
    autor: "Krusty el Payaso",
    imagen: "assets/krusty-burger-local.webp",
    contenido: [
      "Todo comenzó una tarde de lluvia en Springfield. Krusty tenía hambre, una parrilla y muy pocas ideas. De esa mezcla nació la Hamburguesa Krusty: simple, jugosa y con el sello de la casa.",
      "Con los años la receta fue creciendo: llegó la versión doble, la Clogger y hasta una hamburguesa con rosquilla. Cada una se prepara al momento y siempre con el mismo lema: más sabor, menos preguntas.",
      "Hoy la Hamburguesa Krusty sigue siendo la favorita de los vecinos. Si es tu primera vez, te recomendamos pedirla con papas y una Buzz Cola bien helada.",
    ],
  },
  {
    id: "como-pedir-como-un-vecino",
    titulo: "Cómo pedir como un verdadero vecino de Springfield",
    resumen: "Cuatro consejos simples para armar tu pedido perfecto y aprovechar las ofertas.",
    fecha: "2026-10-02",
    autor: "Homero Simpson",
    imagen: "assets/homero-comiendo-rosquilla.jpg",
    contenido: [
      "Primer consejo: revisa siempre la sección de Ofertas antes de elegir. Los descuentos cambian y algunos duran poco.",
      "Segundo consejo: combina una hamburguesa con papas y una bebida. Es la fórmula que nunca falla.",
      "Tercer consejo: no te olvides de las rosquillas. Mmm... rosquillas. Y por último, crea tu cuenta para que tus datos de entrega se completen solos en la próxima compra.",
    ],
  },
];

export function buscarBlog(id) {
  return blogs.find((blog) => blog.id === id);
}

// "2026-09-14" -> "14-09-2026"
export function formatoFecha(fecha) {
  return fecha.split("-").reverse().join("-");
}
