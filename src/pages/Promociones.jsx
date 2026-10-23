import { Link } from "react-router-dom";
import useEstilos from "../hooks/useEstilos";
import estiloPromociones from "../styles/style-promociones.css?inline";

const estilos = [estiloPromociones];

function Promociones() {
  useEstilos(estilos);

  return (
    <>
      <div className="puerco-caminando" aria-hidden="true">
        <img src="assets/puerco_araña.png" alt="" />
      </div>
      <section className="hero-promo px-4 px-lg-5 py-5">
        <div className="hero-text">
          <h1>OFERTAS QUE NO PUEDES RECHAZAR</h1>
          <p>
            Aprovecha nuestros combos especiales. Diseñados para saciar el hambre más voraz con el auténtico sabor de
            Springfield.
          </p>
          <div className="botones">
            <Link to="/menu">
              <button>Ordenar Ahora</button>
            </Link>
            <Link to="/menu">
              <button>Ver Menú</button>
            </Link>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="oferta-combo">
              <img src="assets/krusty_combo_promo.png" alt="Combo Krusty con hamburguesa, papas y bebida" />
              <h2 className="tag">EL CLÁSICO</h2>
              <h2 className="titulo-oferta">Krusty Combo</h2>
              <p>
                La experiencia completa. Burger con queso derretido,ración doble de papas fritas y una bebida gigante
                para pasar el bocado.
              </p>
              <span className="precio">$9.990</span>
              <Link to="/menu">
                <button>AGREGAR</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="oferta-dos-por-uno">
              <img src="assets/2x1.webp" alt="Promoción 2x1 en burgers" />
              <h3>2x1 en Burgers</h3>
              <p>Porque una nunca es suficiente. ven con un amigo o cómetelas tu solo.</p>
              <Link to="/menu">
                <button>ORDENAR AHORA</button>
              </Link>
            </div>
          </div>
          <div className="col-12">
            <div className="oferta-kids">
              <img src="assets/krusty_kids.jpg" alt="Caja Krusty para niños" />
              <h2>Caja Krusty para Niños</h2>
              <p>
                La diversión en una caja. Incluye una burger pequeña, papitas, bebida y un juguete coleccionable
                exclusivo de nuestra nueva serie.
              </p>
              <p className="badge">INCLUYE JUGUETE</p>
              <button>VER JUGUETES</button>
            </div>
          </div>
        </div>
      </section>
      <section className="historia px-4 px-lg-5 py-5">
        <h3>HISTORIA OFICIAL</h3>
        <h2>LA HISTORIA DETRÁS DE LA BURGER</h2>
        <p className="intro">Todo comenzó con un payaso, un sueño y una parrilla sospechosamente barata.</p>
        <p>
          En las vibrantes calles de Springfield, donde lo ordinario se encuentra con lo absurdo, nació una leyenda
          culinaria. Krusty el Payaso, buscando diversificar su imperio mediático más allá de los programas infantiles y
          los campamentos de verano de dudosa reputación, decidió incursionar en el noble arte de la comida rápida.
        </p>
        <p>
          Nuestra receta original sigue siendo un secreto celosamente guardado (principalmente por razones legales). Nos
          enorgullecemos de utilizar ingredientes que cumplen con casi todas las normativas de salud locales vigentes.
        </p>
        <img src="assets/krusty_burguer_fisica.jpg" alt="Dona Homero en la historia de Krusty Burger" />
      </section>
    </>
  );
}

export default Promociones;
