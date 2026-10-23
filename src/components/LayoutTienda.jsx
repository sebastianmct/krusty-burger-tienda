import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Estructura común de las páginas de la tienda: navbar arriba, la página en el medio y footer abajo
function LayoutTienda() {
  const { pathname } = useLocation();

  // Al cambiar de página volvemos arriba (antes lo hacía el navegador al recargar)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="kb-layout-tienda d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default LayoutTienda;
