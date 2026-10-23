import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="kb-footer px-4 px-lg-5 pt-5 pb-3">
      <h2 className="kb-footer-title">Krusty Burguer</h2>
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
      </ul>
      <p className="kb-footer-copy">&copy; 2026 Krusty Burguer. Todos los derechos reservados.</p>
      <img src="assets/cerdo_footer.png" alt="Imagen del cerdo de Krusty Burger" />

      <div className="krusty-homero-caminando">
        <img src="assets/krusty-homero.jpg" alt="Krusty y Homero caminando" />
      </div>
    </footer>
  );
}

export default Footer;
