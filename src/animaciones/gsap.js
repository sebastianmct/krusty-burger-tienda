import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

// Un único punto donde se registran los plugins de GSAP que usa la tienda.
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  Flip,
  SplitText,
  MorphSVGPlugin,
  MotionPathPlugin,
);

// Las animaciones se apagan si la persona pidió "reducir movimiento" en su
// sistema y también durante las pruebas de Karma (así los tests siguen
// midiendo la lógica y no el movimiento).
export function animacionesActivas() {
  if (typeof window === "undefined") return false;
  if (window.__karma__) return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Espera a que termine la intro de Krusty (primera carga) o la cortina de
// cambio de página antes de empezar las animaciones de entrada.
export function retrasoEntrada() {
  const segundos = performance.now() / 1000;
  return segundos < 1.6 ? 1.7 - segundos : 0.45;
}

// Recalcula las posiciones de ScrollTrigger cuando ya cargaron imágenes y
// tipografías (si no, los disparadores quedan desfasados).
export function refrescarScroll() {
  const refrescar = () => ScrollTrigger.refresh();
  if (document.readyState === "complete") {
    window.setTimeout(refrescar, 300);
  } else {
    window.addEventListener("load", refrescar, { once: true });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refrescar);
}

export {
  gsap,
  ScrollTrigger,
  Flip,
  SplitText,
  MorphSVGPlugin,
  MotionPathPlugin,
  useGSAP,
};
