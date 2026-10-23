import useEstilos from "../hooks/useEstilos";
import estiloNosotros from "../styles/style-nosotros.css?inline";

const estilos = [estiloNosotros];

function Nosotros() {
  useEstilos(estilos);

  return (
    <main className="nosotros">
      <section className="historia-nosotros px-4 px-lg-5 py-5">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-lg-6 historia-texto">
            <p className="sello">Archivo Krusty Burger</p>
            <h1>
              Nuestra historia <span>(la que podemos contar)</span>
            </h1>
            <div className="ficha-secreta">
              <strong>TOP SECRET</strong>
              <p>
                Todo comenzó con Krusty el Payaso y una idea sencilla: poner su cara en una hamburguesa y esperar que
                Springfield hiciera el resto.
              </p>
              <p>
                Desde entonces, servimos comida rápida, decisiones cuestionables y suficiente salsa para mantener el
                misterio.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="noticias-nosotros">
              <img src="assets/noticias_simpson.webp" alt="Noticias de Springfield" />
              <span>Fundador desde 1989</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mision-nosotros px-4 px-lg-5 py-5">
        <div className="titulo-seccion">
          <p className="sello">Manifiesto de la casa</p>
          <h2>Nuestra misión: alimentar Springfield</h2>
          <p>No prometemos perfección. Prometemos que siempre habrá una mesa, una bandeja y una excusa para volver.</p>
        </div>
        <div className="valores row g-3">
          <article className="col-md-4">
            <i className="ti ti-burger"></i>
            <h3>Sabor inolvidable</h3>
            <p>Una receta tan secreta que ni Krusty recuerda todos sus ingredientes.</p>
          </article>
          <article className="col-md-4">
            <i className="ti ti-coin"></i>
            <h3>Precios para todos</h3>
            <p>Porque el hambre no debería depender del sueldo del señor Burns.</p>
          </article>
          <article className="col-md-4">
            <i className="ti ti-mood-happy"></i>
            <h3>Humor incluido</h3>
            <p>Cada pedido viene con una historia, una sorpresa o una sospecha razonable.</p>
          </article>
        </div>
      </section>

      <section className="equipo-nosotros px-4 px-lg-5 py-5">
        <div className="equipo-cabecera">
          <p className="sello">Personal autorizado</p>
          <h2>Nuestro equipo</h2>
          <p>
            Un grupo de Springfield que trabaja duro para que tu hamburguesa llegue antes de que cambies de opinión.
          </p>
        </div>
        <div className="equipo-grilla row g-3">
          <article className="persona persona-krusty col-lg-6 col-md-6">
            <img src="assets/krusty-el-payaso.webp" alt="Krusty el Payaso" />
            <h3>Krusty el Payaso</h3>
            <p>Fundador y experto en sonreír para las cámaras.</p>
          </article>
          <article className="persona col-lg-3 col-md-6 col-6">
            <img src="assets/homero-simpson.jpg" alt="Homero Simpson y Krusty" />
            <h3>Homero Simpson</h3>
            <p>Probador oficial de hamburguesas. Siempre disponible.</p>
          </article>
          <article className="persona persona-azul col-lg-3 col-md-6 col-6">
            <img src="assets/señor-burns.jpg" alt="El señor Burns" />
            <h3>Señor Burns</h3>
            <p>Inversionista. Prefiere que la salsa sea rentable.</p>
          </article>
          <article className="persona persona-amarilla col-lg-3 col-md-6 col-6">
            <img src="assets/barney-gumble.jpg" alt="Barney Gumble" />
            <h3>Barney Gumble</h3>
            <p>Especialista en bebidas y pausas estratégicas.</p>
          </article>
          <article className="persona col-lg-3 col-md-6 col-6">
            <img src="assets/millhouse1.webp" alt="Millhouse Van Houten" />
            <h3>Millhouse</h3>
            <p>Asistente de promociones y amigo de confianza.</p>
          </article>
          <article className="persona persona-roja col-lg-3 col-md-6 col-6">
            <img src="assets/moe.jpg" alt="Moe Szyslak" />
            <h3>Moe Szyslak</h3>
            <p>Encargado de que nadie se robe las papas.</p>
          </article>
          <article className="persona persona-azul col-lg-3 col-md-6 col-6">
            <img src="assets/policia-springfield.jpg" alt="Policía de Springfield" />
            <h3>Policía de Springfield</h3>
            <p>Control de calidad. Llega por una rosquilla y se queda por el combo.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Nosotros;
