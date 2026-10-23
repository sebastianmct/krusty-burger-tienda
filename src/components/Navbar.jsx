import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // Controla si el menú está desplegado en pantallas chicas
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom border-3 border-dark px-4 px-lg-5 py-3">
      <div className="container-fluid p-0 gap-3">
        <h2 className="kb-logo m-0">Krusty Burger</h2>

        <button
          className="navbar-toggler kb-toggler ms-auto"
          type="button"
          aria-controls="menuPrincipal"
          aria-expanded={abierto}
          aria-label="Abrir menú de navegación"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={"collapse navbar-collapse" + (abierto ? " show" : "")} id="menuPrincipal">
          <ul className="navbar-nav flex-grow-1 justify-content-center text-center gap-2 gap-lg-3 mb-0">
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/" onClick={() => setAbierto(false)}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/menu" onClick={() => setAbierto(false)}>
                Menú
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/categorias" onClick={() => setAbierto(false)}>
                Categorías
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/ofertas" onClick={() => setAbierto(false)}>
                Ofertas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/blog" onClick={() => setAbierto(false)}>
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/nosotros" onClick={() => setAbierto(false)}>
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link kb-nav-link" to="/contacto" onClick={() => setAbierto(false)}>
                Contacto
              </Link>
            </li>
          </ul>
          <div className="kb-nav-acciones d-flex align-items-center justify-content-center gap-3">
            <Link to="/carrito" className="kb-icon-link" onClick={() => setAbierto(false)}>
              <i className="ti ti-shopping-cart"></i>
            </Link>
            <Link to="/login" className="kb-icon-link" onClick={() => setAbierto(false)}>
              <i className="ti ti-user"></i>
            </Link>
            <Link to="/menu" className="btn btn-kb-primario rounded-pill" onClick={() => setAbierto(false)}>
              Ordenar Ahora
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
