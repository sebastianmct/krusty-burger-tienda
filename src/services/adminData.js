// "Backend" simulado: guarda productos y usuarios del panel admin en localStorage.
// Cada función lee la lista guardada, la modifica y la vuelve a guardar.

import { CATEGORIAS_BASE, obtenerCatalogo } from "../data/productos";

const CLAVE_PRODUCTOS = "krustyAdminProductos";
const CLAVE_USUARIOS = "krustyAdminUsuarios";
const CLAVE_ELIMINADOS = "krustyProductosEliminados";
const CLAVE_CATEGORIAS = "krustyAdminCategorias";
const CLAVE_ORDENES = "krustyOrdenes";

// ---------- Datos iniciales ----------

// Productos iniciales: salen del catálogo de la tienda
function productosIniciales() {
  return obtenerCatalogo().map((producto, indice) => ({
    id: producto.id,
    codigo: "KB-" + String(indice + 1).padStart(3, "0"),
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: 25 + indice * 4,
    stockCritico: 5,
    categoria: producto.categoria,
    categoriaLabel: producto.categoriaLabel,
    imagen: producto.imagen,
  }));
}

// Usuarios iniciales: la familia y vecinos de Springfield
function usuariosIniciales() {
  return [
    {
      id: "u-homero",
      run: "19011022K",
      nombre: "Homero",
      apellidos: "Simpson",
      correo: "homero.simpson@gmail.com",
      fechaNacimiento: "1985-05-12",
      tipoUsuario: "Cliente",
      region: "Metropolitana de Santiago",
      comuna: "Maipu",
      direccion: "Av. Siempreviva 742",
    },
    {
      id: "u-marge",
      run: "18456723K",
      nombre: "Marge",
      apellidos: "Simpson",
      correo: "marge.simpson@gmail.com",
      fechaNacimiento: "1986-10-01",
      tipoUsuario: "Cliente",
      region: "Metropolitana de Santiago",
      comuna: "Maipu",
      direccion: "Av. Siempreviva 742",
    },
    {
      id: "u-bart",
      run: "205678912",
      nombre: "Bart",
      apellidos: "Simpson",
      correo: "bart.simpson@gmail.com",
      fechaNacimiento: "2011-04-01",
      tipoUsuario: "Cliente",
      region: "Metropolitana de Santiago",
      comuna: "Maipu",
      direccion: "Av. Siempreviva 742",
    },
    {
      id: "u-lisa",
      run: "206789013",
      nombre: "Lisa",
      apellidos: "Simpson",
      correo: "lisa.simpson@gmail.com",
      fechaNacimiento: "2013-05-09",
      tipoUsuario: "Cliente",
      region: "Metropolitana de Santiago",
      comuna: "Maipu",
      direccion: "Av. Siempreviva 742",
    },
    {
      id: "u-krusty",
      run: "112345676",
      nombre: "Krusty",
      apellidos: "El Payaso",
      correo: "krusty@duoc.cl",
      fechaNacimiento: "1965-01-17",
      tipoUsuario: "Administrador",
      region: "Metropolitana de Santiago",
      comuna: "Las Condes",
      direccion: "Estudios de Canal 6, oficina del payaso",
    },
    {
      id: "u-wiggum",
      run: "134567897",
      nombre: "Clancy",
      apellidos: "Wiggum",
      correo: "jefe.wiggum@profesor.duoc.cl",
      fechaNacimiento: "1972-08-23",
      tipoUsuario: "Vendedor",
      region: "Metropolitana de Santiago",
      comuna: "Providencia",
      direccion: "Cuartel de Policía de Springfield",
    },
    {
      id: "u-diamante",
      run: "145678903",
      nombre: "Joe",
      apellidos: "Quimby",
      correo: "alcalde.diamante@duoc.cl",
      fechaNacimiento: "1968-03-30",
      tipoUsuario: "Vendedor",
      region: "Metropolitana de Santiago",
      comuna: "Santiago",
      direccion: "Municipalidad de Springfield",
    },
    {
      id: "u-moe",
      run: "156789019",
      nombre: "Moe",
      apellidos: "Szyslak",
      correo: "moe.taberna@gmail.com",
      fechaNacimiento: "1962-11-11",
      tipoUsuario: "Cliente",
      region: "Metropolitana de Santiago",
      comuna: "San Miguel",
      direccion: "Taberna de Moe, calle sin nombre",
    },
  ];
}

// ---------- Funciones de apoyo ----------

// Lee una lista de localStorage; si no hay nada guardado, guarda y devuelve los datos iniciales
function cargarLista(clave, datosIniciales) {
  try {
    const guardada = JSON.parse(localStorage.getItem(clave) || "null");
    if (Array.isArray(guardada) && guardada.length) return guardada;
  } catch {
    // si el JSON está dañado, seguimos con los datos iniciales
  }
  const inicial = datosIniciales();
  localStorage.setItem(clave, JSON.stringify(inicial));
  return inicial;
}

function guardarLista(clave, lista) {
  try {
    localStorage.setItem(clave, JSON.stringify(lista));
  } catch (error) {
    window.alert(
      "No se pudo guardar: el almacenamiento del navegador está lleno (suele pasar con imágenes muy pesadas). Prueba con una imagen más liviana.",
    );
    throw error;
  }
}

function generarId(prefijo) {
  return prefijo + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// Si aparece un producto nuevo en el catálogo de la tienda que el admin aún no tiene, lo agrega.
// Nunca pisa los productos que el admin ya editó.
function sincronizarConCatalogo(lista) {
  let hayCambios = false;

  obtenerCatalogo().forEach((fuente, indice) => {
    if (!lista.some((producto) => producto.id === fuente.id)) {
      lista.push({
        id: fuente.id,
        codigo: "KB-" + String(indice + 1).padStart(3, "0"),
        nombre: fuente.nombre,
        descripcion: fuente.descripcion,
        precio: fuente.precio,
        stock: 25,
        stockCritico: 5,
        categoria: fuente.categoria,
        categoriaLabel: fuente.categoriaLabel,
        imagen: fuente.imagen,
      });
      hayCambios = true;
    }
  });

  if (hayCambios) guardarLista(CLAVE_PRODUCTOS, lista);
  return lista;
}

// La tienda usa un catálogo fijo; para que un producto eliminado en el admin
// deje de aparecer en la tienda, guardamos su id en esta lista.
function marcarProductoEliminado(id) {
  try {
    const lista = JSON.parse(localStorage.getItem(CLAVE_ELIMINADOS) || "[]");
    if (!lista.includes(id)) {
      lista.push(id);
      localStorage.setItem(CLAVE_ELIMINADOS, JSON.stringify(lista));
    }
  } catch {
    localStorage.setItem(CLAVE_ELIMINADOS, JSON.stringify([id]));
  }
}

// ---------- Productos ----------

export function listarProductos() {
  return sincronizarConCatalogo(cargarLista(CLAVE_PRODUCTOS, productosIniciales));
}

export function obtenerProducto(id) {
  return listarProductos().find((producto) => producto.id === id) || null;
}

// Si el producto trae id lo actualiza; si no, lo crea
export function guardarProducto(producto) {
  const lista = listarProductos();
  const indice = producto.id ? lista.findIndex((p) => p.id === producto.id) : -1;

  if (indice >= 0) {
    lista[indice] = { ...lista[indice], ...producto };
    guardarLista(CLAVE_PRODUCTOS, lista);
    return lista[indice];
  }

  const nuevo = { ...producto, id: generarId("prod") };
  lista.push(nuevo);
  guardarLista(CLAVE_PRODUCTOS, lista);
  return nuevo;
}

export function eliminarProducto(id) {
  const lista = listarProductos().filter((producto) => producto.id !== id);
  guardarLista(CLAVE_PRODUCTOS, lista);
  marcarProductoEliminado(id);
}

// ---------- Usuarios ----------

export function listarUsuarios() {
  return cargarLista(CLAVE_USUARIOS, usuariosIniciales);
}

export function obtenerUsuario(id) {
  return listarUsuarios().find((usuario) => usuario.id === id) || null;
}

export function guardarUsuario(usuario) {
  const lista = listarUsuarios();
  const indice = usuario.id ? lista.findIndex((u) => u.id === usuario.id) : -1;

  if (indice >= 0) {
    lista[indice] = { ...lista[indice], ...usuario };
    guardarLista(CLAVE_USUARIOS, lista);
    return lista[indice];
  }

  const nuevo = { ...usuario, id: generarId("user") };
  lista.push(nuevo);
  guardarLista(CLAVE_USUARIOS, lista);
  return nuevo;
}

export function eliminarUsuario(id) {
  const lista = listarUsuarios().filter((usuario) => usuario.id !== id);
  guardarLista(CLAVE_USUARIOS, lista);
}

// ---------- Categorías ----------

export function listarCategorias() {
  return cargarLista(CLAVE_CATEGORIAS, () => CATEGORIAS_BASE);
}

export function obtenerCategoria(valor) {
  return listarCategorias().find((categoria) => categoria.valor === valor) || null;
}

// "Papas Fritas" -> "papas-fritas" (identificador de la categoría)
export function crearIdCategoria(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Si la categoría ya existe (mismo valor) la actualiza; si no, la crea
export function guardarCategoria(categoria) {
  const lista = listarCategorias();
  const indice = lista.findIndex((c) => c.valor === categoria.valor);

  if (indice >= 0) {
    lista[indice] = { ...lista[indice], ...categoria };
  } else {
    lista.push({ icono: "ti-tag", ...categoria });
  }
  guardarLista(CLAVE_CATEGORIAS, lista);
  return categoria;
}

// No se puede eliminar una categoría que todavía tiene productos
export function eliminarCategoria(valor) {
  const productos = listarProductos().filter((producto) => producto.categoria === valor);
  if (productos.length > 0) {
    return { ok: false, error: "No se puede eliminar: tiene " + productos.length + " producto(s) asociados." };
  }
  guardarLista(
    CLAVE_CATEGORIAS,
    listarCategorias().filter((categoria) => categoria.valor !== valor),
  );
  return { ok: true };
}

// ---------- Órdenes de compra ----------

function leerOrdenes() {
  try {
    const lista = JSON.parse(localStorage.getItem(CLAVE_ORDENES) || "[]");
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

// Las más nuevas primero
export function listarOrdenes() {
  return leerOrdenes().reverse();
}

export function obtenerOrden(id) {
  return leerOrdenes().find((orden) => orden.id === id) || null;
}

// Historial de compras de un cliente (por su correo)
export function listarOrdenesDeCorreo(correo) {
  const buscado = (correo || "").trim().toLowerCase();
  return listarOrdenes().filter((orden) => orden.cliente.correo.trim().toLowerCase() === buscado);
}

// Guarda una orden nueva. Le agrega id, fecha y número (ej: 20261021-003)
export function crearOrden(orden) {
  const lista = leerOrdenes();
  const fecha = new Date();
  const dia = fecha.toISOString().slice(0, 10).replace(/-/g, "");
  const delDia = lista.filter((o) => o.numero.startsWith(dia)).length + 1;

  const nueva = {
    ...orden,
    id: generarId("ord"),
    numero: dia + "-" + String(delDia).padStart(3, "0"),
    fecha: fecha.toISOString(),
  };
  lista.push(nueva);
  guardarLista(CLAVE_ORDENES, lista);
  return nueva;
}
