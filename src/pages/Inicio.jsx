import { useState } from "react";
import { Link } from "react-router-dom";
import PersonajeDelDia from "../components/PersonajeDelDia";
import VecinosSpringfield from "../components/VecinosSpringfield";
import TarjetaProducto from "../components/TarjetaProducto";
import useEstilos from "../hooks/useEstilos";
import { obtenerCatalogo, obtenerCategorias } from "../data/productos";
import estiloHome from "../styles/style-home.css?inline";

const estilos = [estiloHome];

function Inicio() {
  useEstilos(estilos);

  const categorias = obtenerCategorias();
  const [productos] = useState(obtenerCatalogo);
  const [categoriaActiva, setCategoriaActiva] = useState("hamburguesas");

  const productosVisibles = productos.filter(
    (producto) => producto.categoria === categoriaActiva,
  );

  return (
    <>
      <header className="kb-hero d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 gap-lg-5 px-4 px-lg-5 py-5">
        <div className="hero-text">
          <h1 className="kb-hero-title">
            !LA BURGER FAVORITA DE <span>SPRINGFIELD!</span>
          </h1>
          <p className="kb-hero-text">
            Hamburguesas, papas y combos preparados para satisfacer hasta al
            ciudadano más hambriento.
          </p>
          <br />
          <div className="d-flex flex-wrap gap-3">
            <Link to="/menu" className="btn btn-kb-hero btn-kb-hero-primario">
              Ordenar Ahora
            </Link>
            <Link to="/menu" className="btn btn-kb-hero btn-kb-hero-secundario">
              Ver Menú
            </Link>
          </div>
        </div>
        <img
          src="assets/rosquilla-homero.png"
          alt="Dona Homero"
          className="kb-hero-img"
        />
      </header>

      <section className="kb-menu-section px-3 px-lg-5 py-5">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <h2 className="kb-section-title">
            EL MENÚ DE <span>KRUSTY</span>
          </h2>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {categorias.map((categoria) => (
              <button
                key={categoria.valor}
                type="button"
                className={
                  "btn kb-filtro" +
                  (categoriaActiva === categoria.valor ? " active" : "")
                }
                onClick={() => setCategoriaActiva(categoria.valor)}
              >
                <i className={"ti " + categoria.icono}></i>
                {categoria.etiqueta}
              </button>
            ))}
          </div>
        </div>
        <hr className="kb-hr" />
        <div className="tarjetas" id="productos-inicio">
          {productosVisibles.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              variante="inicio"
            />
          ))}
        </div>
      </section>

      <PersonajeDelDia />

      <VecinosSpringfield />

      <section className="kb-club-section py-5 px-4 px-lg-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="kb-club-imagen d-flex justify-content-center">
              <img
                src="assets/gordo-tony.webp"
                alt="Gordo Tony"
              /><img
                src="assets/gordo-tony.jpg"
                alt="Gordo Tony"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="kb-club-contenido">
              <h2 className="kb-club-title">
                ÚNETE A LA <span>FAMILIA KRUSTY</span>
              </h2>
              <p className="kb-club-text">
                Acumula puntos con tus pedidos y recibe promociones especiales
                para disfrutar tus hamburguesas favoritas.
                <br></br><span>Tienes 24 horas. Y para que veas que vamos en serio, 12 horas.</span>
              </p>
              <Link to="/registro" className="btn btn-kb-club">
                Registrarme
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;
