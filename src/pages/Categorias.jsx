import { Link, useParams } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import useEstilos from "../hooks/useEstilos";
import { obtenerCatalogo, obtenerCategorias } from "../data/productos";
import estiloHome from "../styles/style-home.css?inline";
import estiloMenu from "../styles/style-menu.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloMenu, estiloExtra];

// /categorias            -> muestra las categorías
// /categorias/:categoria -> además muestra los productos de esa categoría
function Categorias() {
  useEstilos(estilos);

  const { categoria } = useParams();
  const categorias = obtenerCategorias();
  const productos = obtenerCatalogo();

  const categoriaActiva = categorias.find((c) => c.valor === categoria);
  const productosDeLaCategoria = productos.filter((producto) => producto.categoria === categoria);

  return (
    <main className="kb-pagina">
      <div className="kb-pagina-cabecera">
        <span className="kb-etiqueta">Todo el menú, ordenado</span>
        <h1 className="kb-pagina-titulo">
          Nuestras <span>categorías</span>
        </h1>
        <p className="kb-pagina-texto">Elige una categoría para ver solo los productos que te dan hambre.</p>
      </div>

      <div className="kb-categorias-grid">
        {categorias.map((c) => (
          <Link
            key={c.valor}
            to={"/categorias/" + c.valor}
            className={"kb-categoria-card" + (c.valor === categoria ? " activa" : "")}
          >
            <i className={"ti " + c.icono}></i>
            <strong>{c.etiqueta}</strong>
            <span>{productos.filter((producto) => producto.categoria === c.valor).length} productos</span>
          </Link>
        ))}
      </div>

      {categoria && !categoriaActiva && (
        <div className="kb-vacio">
          Esa categoría no existe. Elige una de las de arriba o <Link to="/menu">mira el menú completo</Link>.
        </div>
      )}

      {categoriaActiva && (
        <section>
          <h2 className="kb-seccion-titulo">
            {categoriaActiva.etiqueta} <small>{categoriaActiva.descripcion}</small>
          </h2>
          <hr className="kb-hr" />
          {productosDeLaCategoria.length === 0 ? (
            <div className="kb-vacio">Todavía no hay productos en esta categoría.</div>
          ) : (
            <div className="productos-grilla">
              {productosDeLaCategoria.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} variante="menu" />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Categorias;
