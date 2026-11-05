import { Link } from "react-router-dom";
import LogoKrusty from "./LogoKrusty";

function Footer() {
  return (
    <footer className="kb-footer px-4 px-lg-5 pt-5 pb-3">
      <h2 className="kb-footer-title">
        <Link to="/">
          <LogoKrusty className="kb-logo-img kb-logo-img-nav" />
        </Link>
      </h2>
      <ul className="nav gap-4 mb-3">
        <li className="nav-item">
          <Link className="nav-link p-0 kb-footer-link" to="/">
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link p-0 kb-footer-link" to="/menu">
            Menú
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link p-0 kb-footer-link" to="/contacto">
            Contacto
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link p-0 kb-footer-link" to="/promociones">
            Promociones
          </Link>
        </li>
        <li className="nav-item ms-auto">
          <a
            className="nav-link p-0 kb-footer-link kb-footer-github"
            href="https://github.com/sebastianmct/krusty-burger-tienda"
            target="_blank"
            rel="noreferrer"
            aria-label="Ver el proyecto en GitHub (se abre en una pestaña nueva)"
          >
            <i className="ti ti-brand-github" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
      <p className="kb-footer-copy">
        &copy; 2026 Krusty Burguer. Todos los derechos reservados.
      </p>
      <img src="assets/cerdo-footer.png" alt="Imagen del cerdo de Krusty Burger" />

      <div className="krusty-homero-caminando" aria-hidden="true">
        <div className="krusty-homero-ruta">
          <img
            className="krusty-homero-paso"
            src="assets/krusty-homero.jpg"
            alt=""
          />
          <span className="krusty-homero-sombra" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
