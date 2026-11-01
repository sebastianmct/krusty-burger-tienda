import useEstilos from "../hooks/useEstilos";
import estiloNosotros from "../styles/style-nosotros.css?inline";

const estilos = [estiloNosotros];

const equipo = [
  {
    nombre: "Homero Simpson",
    cargo: "Probador oficial",
    texto: "Probador oficial de hamburguesas. Siempre disponible.",
    img: "assets/homero-simpson.gif",
    alt: "Homero Simpson y Krusty",
    color: "amarilla",
  },
  {
    nombre: "Señor Burns",
    cargo: "Inversionista",
    texto: "Prefiere que la salsa sea rentable.",
    img: "assets/sr-burns.gif",
    alt: "El señor Burns",
    color: "azul",
  },
  {
    nombre: "Barney Gumble",
    cargo: "Bebidas",
    texto: "Especialista en bebidas y pausas estratégicas.",
    img: "assets/barney-gumble.gif",
    alt: "Barney Gumble",
    color: "roja",
  },
  {
    nombre: "Millhouse",
    cargo: "Promociones",
    texto: "Asistente de promociones y amigo de confianza.",
    img: "assets/millhouse1.webp",
    alt: "Millhouse Van Houten",
    color: "azul",
  },
  {
    nombre: "Moe Szyslak",
    cargo: "Seguridad de papas",
    texto: "Encargado de que nadie se robe las papas.",
    img: "assets/moe.gif",
    alt: "Moe Szyslak",
    color: "roja",
  },
  {
    nombre: "Policía de Springfield",
    cargo: "Control de calidad",
    texto: "Llega por una rosquilla y se queda por el combo.",
    img: "assets/policia-springfield.gif",
    alt: "Policía de Springfield",
    color: "amarilla",
  },
];

const valores = [
  {
    icono: "sabor-inolvidable.gif",
    titulo: "Sabor inolvidable",
    texto:
      "Una receta tan secreta que ni Krusty recuerda todos sus ingredientes.",
  },
  {
    icono: "precios-para-todos.gif",
    titulo: "Precios para todos",
    texto: "Porque el hambre no debería depender del sueldo del señor Burns.",
  },
  {
    icono: "humor-incluido.gif",
    titulo: "Humor incluido",
    texto:
      "Cada pedido viene con una historia, una sorpresa o una sospecha razonable.",
  },
];
 
const frasesTicker = [
  "Sabor inolvidable",
  "Precios para todos",
  "Humor incluido",
  "Una mesa para ti",
  "Salsa secreta",
  "Krusty aprueba",
];

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
                Todo comenzó con Krusty el Payaso y una idea sencilla: poner su
                cara en una hamburguesa y esperar que Springfield hiciera el
                resto.
              </p>
              <p>
                Desde entonces, servimos comida rápida, decisiones cuestionables
                y suficiente salsa para mantener el misterio.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="noticias-nosotros">
              <img
                src="assets/kent-brockman.gif"
                alt="Noticias de Springfield"
              />
              <span>Fundador desde 1989</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mision-nosotros pt-5 pb-0">
        <div className="mision-nubes" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
 
        <div className="mision-contenido px-4 px-lg-5">
          <div className="mision-cabecera">
            <p className="mision-sello">Manifiesto de la casa</p>
            <h2>
              Nuestra misión: <span>alimentar Springfield</span>
            </h2>
            <p className="mision-bajada">
              No prometemos perfección. Prometemos que siempre habrá una mesa,
              una bandeja y una excusa para volver.
            </p>
 
            <div className="mision-sticker" aria-hidden="true">
              <img src="assets/alimentar-springfield.gif" alt="" />
            </div>
          </div>
 
          <div className="row g-4 mision-valores">
            {valores.map((valor, i) => (
              <div key={valor.titulo} className="col-md-4">
                <article className={`mision-card mision-card-${i + 1}`}>
                  <span className="mision-num">0{i + 1}</span>
                  <div className="mision-icono">
                    <img src={`assets/${valor.icono}`} alt={valor.titulo} />
                  </div>
                  <h3>{valor.titulo}</h3>
                  <p>{valor.texto}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
 
        <div className="mision-ticker" aria-hidden="true">
          <div className="mision-ticker-pista">
            {[0, 1].map((copia) => (
              <div key={copia} className="mision-ticker-grupo">
                {frasesTicker.map((frase, i) => (
                  <span key={`${copia}-${i}`}>{frase}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="equipo-nosotros px-4 px-lg-5 py-5">
        <div className="equipo-cabecera">
          <p className="sello">Personal autorizado</p>
          <h2>Nuestro equipo</h2>
          <p>
            Un grupo de Springfield que trabaja duro para que tu hamburguesa
            llegue antes de que cambies de opinión.
          </p>
        </div>

        <article className="fundador row g-0">
          <div className="col-md-5 fundador-foto">
            <img src="assets/krusty-clown.gif" alt="Krusty el Payaso" />
          </div>
          <div className="col-md-7 fundador-info">
            <span className="chip">Fundador · ID 0001</span>
            <h3>Krusty el Payaso</h3>
            <p>Fundador y experto en sonreír para las cámaras.</p>
            <blockquote>“¡Hey hey! Una hamburguesa a la vez.”</blockquote>
          </div>
        </article>

        <div className="row g-3 g-lg-4">
          {equipo.map((persona, i) => (
            <div key={persona.nombre} className="col-6 col-md-4">
              <article className={`credencial credencial-${persona.color}`}>
                <div className="credencial-tope">
                  <span className="credencial-hueco"></span>
                  <small>Krusty Burger Staff</small>
                </div>
                <img src={persona.img} alt={persona.alt} />
                <div className="credencial-cuerpo">
                  <span className="credencial-cargo">{persona.cargo}</span>
                  <h3>{persona.nombre}</h3>
                  <p>{persona.texto}</p>
                  <small className="credencial-id">
                    ID 000{i + 2}
                  </small>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Nosotros;
