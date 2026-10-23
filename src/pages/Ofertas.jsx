import { Link } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import useEstilos from "../hooks/useEstilos";
import { obtenerOfertas } from "../data/productos";
import estiloHome from "../styles/style-home.css?inline";
import estiloMenu from "../styles/style-menu.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloMenu, estiloExtra];

function Ofertas() {
  useEstilos(estilos);

  // Primero las ofertas con más descuento
  const ofertas = obtenerOfertas().sort((a, b) => b.descuento - a.descuento);

  return (
    <main className="kb-pagina">
      <div className="kb-banner-ofertas">
        <div>
          <h1>Ofertas que no puedes rechazar</h1>
          <p>Descuentos reales en hamburguesas, papas, bebidas y rosquillas. Mientras duren las existencias.</p>
        </div>
        <Link to="/promociones" className="kb-boton-claro">
          Ver promociones
        </Link>
      </div>

      {ofertas.length === 0 ? (
        <div className="kb-vacio">Por ahora no hay ofertas. Vuelve pronto, Krusty está pensando una.</div>
      ) : (
        <div className="productos-grilla">
          {ofertas.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} variante="menu" />
          ))}
        </div>
      )}
    </main>
  );
}

export default Ofertas;
