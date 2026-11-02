import { Link } from "react-router-dom";
import Dialogo from "../components/Dialogo";
import TarjetaProducto from "../components/TarjetaProducto";
import useEstilos from "../hooks/useEstilos";
import { obtenerOfertas, obtenerPruebaDeTontos } from "../data/productos";
import estiloHome from "../styles/style-home.css?inline";
import estiloMenu from "../styles/style-menu.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloMenu, estiloExtra];

function Ofertas() {
  useEstilos(estilos);

  const ofertas = obtenerOfertas().sort((a, b) => b.descuento - a.descuento);
  const aPruebaDeTontos = obtenerPruebaDeTontos();

  return (
    <main className="kb-pagina">
      <div className="kb-banner-ofertas">
        <div className="kb-banner-ofertas-contenido">
          <h1>Ofertas que no puedes rechazar</h1>
          <p>
            Descuentos reales en hamburguesas, papas, bebidas y rosquillas.
            Mientras duren las existencias.
          </p>
          <Link to="/promociones" className="kb-boton-claro mt-3">
            Ver promociones
          </Link>
        </div>
        <img
          className="kb-banner-ofertas-imagen"
          src={`${import.meta.env.BASE_URL}assets/bart-mesa.png`}
          alt="Bart sorprende a los vecinos mientras comparten hamburguesas"
        />
      </div>

      <div className="kb-ofertas-contenido">
        {ofertas.length === 0 ? (
          <div className="kb-vacio">
            Por ahora no hay ofertas. Vuelve pronto, Krusty está pensando una.
          </div>
        ) : (
          <div className="productos-grilla" id="ofertas-grilla">
            {ofertas.map((producto) => (
              <TarjetaProducto
                key={producto.id}
                producto={producto}
                variante="menu"
              />
            ))}
          </div>
        )}
        <aside className="kb-ofertas-gif">
          <img
            className="gif-krusty"
            src={`${import.meta.env.BASE_URL}assets/ay-caramba.gif`}
            alt="Krusty aparece detrás de las cortinas"
          />
        </aside>
      </div>

      <section className="mt-5">
        <h2 className="kb-seccion-titulo">Productos a prueba de tontos</h2>
        <Dialogo
          quien="cletus"
          frase="¡Ñaa! Hasta yo los puedo pedir: sin ingredientes raros ni combinaciones difíciles."
          tam="lg"
          className="mb-4"
        />
        <div className="productos-grilla" id="tontos-grilla">
          {aPruebaDeTontos.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              variante="menu"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Ofertas;
