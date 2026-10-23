import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useEstilos from "../../hooks/useEstilos";
import { listarCategorias, listarOrdenes, listarProductos, listarUsuarios } from "../../services/adminData";
import { cerrarSesion } from "../../services/auth";
import estiloAdmin from "../../styles/admin/style-admin.css?inline";

const estilos = [estiloAdmin];

// Estructura común de todas las páginas del admin: menú lateral + barra superior + contenido.
//   miga     -> texto (o enlaces) de la ruta, ej: "Panel administrador / Gestión"
//   titulo   -> título de la página
//   acciones -> (opcional) botones que van a la derecha de la barra superior
//   children -> contenido de la página
function PaginaAdmin({ miga, titulo, acciones, children }) {
  useEstilos(estilos, "admin-body");

  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = titulo + " | Admin Krusty Burger";
  }, [titulo]);

  function salir(evento) {
    evento.preventDefault();
    cerrarSesion();
    navigate("/login");
  }

  // Marca como activo el enlace de la página actual
  function claseItem(ruta) {
    return "item" + (pathname === ruta ? " activo" : "");
  }

  return (
    <div className="admin-shell">
      <div
        className={"overlay-sidebar" + (sidebarAbierto ? " visible" : "")}
        onClick={() => setSidebarAbierto(false)}
      ></div>

      <aside className={"admin-sidebar" + (sidebarAbierto ? " abierto" : "")}>
        <div className="marca">
          <div className="logo-payaso">K</div>
          <div>
            <h1>Krusty Burger</h1>
            <span>Panel Admin</span>
          </div>
        </div>
        <nav className="admin-nav">
          <p className="grupo-titulo">General</p>
          <Link className={claseItem("/admin")} to="/admin">
            <i className="ti ti-layout-dashboard"></i> Dashboard
          </Link>
          <p className="grupo-titulo">Gestión</p>
          <Link className={claseItem("/admin/ordenes")} to="/admin/ordenes">
            <i className="ti ti-receipt"></i> Órdenes <span className="badge-mini">{listarOrdenes().length}</span>
          </Link>
          <Link className={claseItem("/admin/productos")} to="/admin/productos">
            <i className="ti ti-burger"></i> Productos <span className="badge-mini">{listarProductos().length}</span>
          </Link>
          <Link className={claseItem("/admin/categorias")} to="/admin/categorias">
            <i className="ti ti-tags"></i> Categorías <span className="badge-mini">{listarCategorias().length}</span>
          </Link>
          <Link className={claseItem("/admin/usuarios")} to="/admin/usuarios">
            <i className="ti ti-users"></i> Usuarios <span className="badge-mini">{listarUsuarios().length}</span>
          </Link>
          <p className="grupo-titulo">Análisis</p>
          <Link className={claseItem("/admin/reportes")} to="/admin/reportes">
            <i className="ti ti-chart-bar"></i> Reportes
          </Link>
          <p className="grupo-titulo">Cuenta</p>
          <Link className={claseItem("/admin/perfil")} to="/admin/perfil">
            <i className="ti ti-user-circle"></i> Perfil
          </Link>
        </nav>
        <div className="pie-sidebar">
          <Link className="item" to="/">
            <i className="ti ti-arrow-back-up"></i> Volver a la tienda
          </Link>
          <a className="item" href="#" onClick={salir}>
            <i className="ti ti-logout"></i> Cerrar sesión
          </a>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="btn btn-kb-secundario btn-menu-movil"
            type="button"
            aria-label="Abrir menú"
            onClick={() => setSidebarAbierto(!sidebarAbierto)}
          >
            <i className="ti ti-menu-2"></i>
          </button>
          <div>
            <p className="miga">{miga}</p>
            <h2>{titulo}</h2>
          </div>
          {acciones && <div className="acciones-topbar">{acciones}</div>}
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

export default PaginaAdmin;
