import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatAyuda from "./ChatAyuda";
import AvisoHibbert from "./AvisoHibbert";
import PreferenciasCookies from "./PreferenciasCookies";
import KrustyShowIntro from "./KrustyShowIntro";
import useEstilos from "../hooks/useEstilos";
import estiloPersonajes from "../styles/style-personajes.css?inline";

const estilos = [estiloPersonajes];

function LayoutTienda() {
  const { pathname } = useLocation();
  useEstilos(estilos);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ChatAyuda />
      <AvisoHibbert />
      <PreferenciasCookies />
      <KrustyShowIntro />
    </>
  );
}

export default LayoutTienda;
