import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap, useGSAP, animacionesActivas } from "../animaciones/gsap";

// Cortina amarilla y roja que se levanta cada vez que se cambia de página.
function TransicionPagina() {
  const { pathname } = useLocation();
  const cortinaRef = useRef(null);
  const rutaAnterior = useRef(pathname);

  useGSAP(
    () => {
      if (rutaAnterior.current === pathname) return;
      rutaAnterior.current = pathname;
      if (!animacionesActivas() || !cortinaRef.current) return;

      const franjas = cortinaRef.current.querySelectorAll("span");
      gsap.set(cortinaRef.current, { autoAlpha: 1 });
      gsap.set(franjas, { yPercent: 0 });
      gsap.to(franjas, {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.07,
        delay: 0.12,
        onComplete: () => gsap.set(cortinaRef.current, { autoAlpha: 0 }),
      });
    },
    { dependencies: [pathname], scope: cortinaRef },
  );

  return (
    <div className="kb-cortina" ref={cortinaRef} aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default TransicionPagina;
