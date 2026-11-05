import { useState } from "react";
import AlertaDoh from "../components/AlertaDoh";
import TarjetaProducto from "../components/TarjetaProducto";
import useEstilos from "../hooks/useEstilos";
import { obtenerCatalogo, precioFinal } from "../data/productos";
import { buscarProductos } from "../utils/busqueda";
import estiloHome from "../styles/style-home.css?inline";
import estiloMenu from "../styles/style-menu.css?inline";

const estilos = [estiloHome, estiloMenu];

const categorias = [
  {
    valor: "todos",
    icono: "ti-layout-grid",
    nombre: "Todos",
    detalle: "Ver el menú completo",
  },
  {
    valor: "hamburguesas",
    icono: "ti-burger",
    nombre: "Hamburguesas",
    detalle: "Las favoritas",
  },
  {
    valor: "combos",
    icono: "ti-tools-kitchen-2",
    nombre: "Combos",
    detalle: "Para compartir",
  },
  {
    valor: "dulces",
    icono: "ti-chart-donut",
    nombre: "Rosquillas",
    detalle: "Dulces y glaseadas",
  },
  {
    valor: "bebidas",
    icono: "ti-cup",
    nombre: "Bebidas",
    detalle: "Frías y refrescantes",
  },
];

function ordenar(productos, criterio) {
  const copia = [...productos];
  if (criterio === "menor")
    return copia.sort((a, b) => precioFinal(a) - precioFinal(b));
  if (criterio === "mayor")
    return copia.sort((a, b) => precioFinal(b) - precioFinal(a));
  return copia;
}

function Menu() {
  useEstilos(estilos);

  const [productos] = useState(obtenerCatalogo);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [orden, setOrden] = useState("popularidad");
  const [consulta, setConsulta] = useState("");

  const { productos: encontrados, especial } = buscarProductos(
    productos,
    consulta,
  );
  const visibles = especial
    ? encontrados
    : encontrados.filter(
        (producto) =>
          categoriaActiva === "todos" || producto.categoria === categoriaActiva,
      );

  return (
    <main className="pagina-menu">
      <div className="row g-4">
        <aside className="col-lg-3 kb-menu-lateral">
          <div className="kb-burbuja-menu">
            <p>
              ¿Hamburguesas?
              <br />
              ¿Rosquillas?
              <br />
              ¿Felicidad?
            </p>
            <span>
              Todo en el mismo lugar,
              <br />
              ¡qué buena idea!
            </span>
          </div>
          <div className="kb-barney-ilustracion">
            <img
              src="assets/barney-menu.png"
              alt="Barney sosteniendo una cerveza"
            />
          </div>
          <div className="kb-categorias">
            <h2>Categorías</h2>
            {categorias.map((categoria) => (
              <button
                key={categoria.valor}
                type="button"
                className={
                  "categoria-filtro" +
                  (categoriaActiva === categoria.valor ? " activo" : "")
                }
                aria-pressed={categoriaActiva === categoria.valor}
                onClick={() => setCategoriaActiva(categoria.valor)}
              >
                <i className={"ti " + categoria.icono}></i>
                <span>
                  {categoria.nombre}
                  <small>{categoria.detalle}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="col-lg-9 kb-productos-menu">
          <div className="kb-encabezado-menu d-flex align-items-end justify-content-between flex-wrap gap-3">
            <div>
              <p className="kb-etiqueta-menu mb-2">La carta de Springfield</p>
              <h1 className="mb-0">Nuestros productos</h1>
            </div>
            <label htmlFor="orden-menu" className="kb-orden-label">
              Ordenar por:{" "}
              <select
                id="orden-menu"
                name="orden-menu"
                className="form-select d-inline-block w-auto kb-orden-select"
                value={orden}
                onChange={(evento) => setOrden(evento.target.value)}
              >
                <option value="popularidad">Más populares</option>
                <option value="menor">Precio menor</option>
                <option value="mayor">Precio mayor</option>
              </select>
            </label>
          </div>

          <form
            className="kb-buscador"
            role="search"
            onSubmit={(evento) => evento.preventDefault()}
          >
            <input
              type="search"
              value={consulta}
              maxLength="60"
              placeholder="Buscar productos (ej: hamburguesas al vapor)"
              aria-label="Buscar productos"
              onChange={(evento) => setConsulta(evento.target.value)}
            />
            {consulta && (
              <button
                type="button"
                className="kb-buscador-limpiar"
                onClick={() => setConsulta("")}
              >
                Limpiar
              </button>
            )}
          </form>
          {consulta && (
            <p className="kb-buscador-resumen">
              {visibles.length}{" "}
              {visibles.length === 1 ? "resultado" : "resultados"} para "
              {consulta}"
            </p>
          )}
          {consulta && visibles.length === 0 && (
            <AlertaDoh>
              No encontramos nada con esa búsqueda. Prueba con otra palabra.
            </AlertaDoh>
          )}

          <div className="productos-grilla" id="productos-grilla">
            {ordenar(visibles, orden).map((producto) => (
              <TarjetaProducto
                key={producto.id}
                producto={producto}
                variante="menu"
                sticker={especial || undefined}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Menu;
