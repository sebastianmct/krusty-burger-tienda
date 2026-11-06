export const CDN_IMAGENES = "https://cdn.thesimpsonsapi.com/500";

export function urlFotoPorId(id) {
  return CDN_IMAGENES + "/character/" + id + ".webp";
}

export function urlFotoDeRuta(rutaRetrato) {
  return CDN_IMAGENES + rutaRetrato;
}

export const PERSONAJES = {
  homero: {
    nombre: "Homero Simpson",
    apiId: 1,
    foto: "assets/homero-simpson.jpg",
  },
  bart: { nombre: "Bart Simpson", apiId: 3 },
  lisa: { nombre: "Lisa Simpson", apiId: 4 },
  burns: { nombre: "Sr. Burns", apiId: 13, foto: "assets/burns.jpg" },
  krusty: {
    nombre: "Krusty el Payaso",
    apiId: 15,
    foto: "assets/krusty-el-payaso.webp",
  },
  cookieKwan: { nombre: "Cookie Kwan", buscar: /cookie kwan/i },
  moe: { nombre: "Moe", apiId: 16, foto: "assets/moe.jpg" },
  apu: { nombre: "Apu", apiId: 17 },
  skinner: { nombre: "Director Skinner", apiId: 18 },
  wiggum: { nombre: "Jefe Gorgory", buscar: /clancy wiggum/i },
  rafa: { nombre: "Rafa Gorgory", buscar: /ralph wiggum/i },
  lou: { nombre: "Policía Lou", buscar: /^lou$/i },
  eddie: { nombre: "Policía Eddie", buscar: /^eddie$/i },
  snake: { nombre: "Snake", buscar: /snake/i },
  tony: { nombre: "Gordo Tony", buscar: /fat tony|d'amico/i },
  cletus: { nombre: "Cletus", buscar: /cletus/i },
  hibbert: { nombre: "Dr. Hibbert", buscar: /julius hibbert|dr\. hibbert/i },
  duffman: { nombre: "Duffman", buscar: /duffman|barry huffman/i },
  otto: { nombre: "Otto", buscar: /^otto/i },
};

export function inicialesDe(nombre) {
  return nombre
    .split(" ")
    .filter((palabra) => !palabra.endsWith("."))
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0).toUpperCase())
    .join("");
}
