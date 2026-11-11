import { useRef } from "react";
import { gsap, useGSAP, animacionesActivas } from "../animaciones/gsap";

const ROSQUILLAS = [
  {
    tam: 46,
    izquierda: "4%",
    arriba: "72%",
    camino: [
      { x: 0, y: 0 },
      { x: 140, y: -120 },
      { x: 320, y: -30 },
      { x: 460, y: -170 },
    ],
    duracion: 9,
  },
  {
    tam: 34,
    izquierda: "42%",
    arriba: "10%",
    camino: [
      { x: 0, y: 0 },
      { x: -120, y: 90 },
      { x: 60, y: 190 },
      { x: -80, y: 300 },
    ],
    duracion: 11,
  },
  {
    tam: 58,
    izquierda: "70%",
    arriba: "78%",
    camino: [
      { x: 0, y: 0 },
      { x: -160, y: -90 },
      { x: -40, y: -220 },
      { x: -260, y: -300 },
    ],
    duracion: 10,
  },
  {
    tam: 28,
    izquierda: "20%",
    arriba: "6%",
    camino: [
      { x: 0, y: 0 },
      { x: 110, y: 60 },
      { x: 230, y: -10 },
      { x: 340, y: 80 },
    ],
    duracion: 8,
  },
];

function FondoFlotante() {
  const contenedorRef = useRef(null);

  useGSAP(
    () => {
      if (!animacionesActivas()) return;
      const rosquillas = gsap.utils.toArray(".kb-rosquilla-fondo");

      rosquillas.forEach((rosquilla, i) => {
        const { camino, duracion } = ROSQUILLAS[i];
        gsap.to(rosquilla, {
          motionPath: { path: camino, curviness: 1.4 },
          duration: duracion,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.6,
        });
        gsap.to(rosquilla, {
          rotation: i % 2 ? -360 : 360,
          duration: duracion * 1.4,
          repeat: -1,
          ease: "none",
        });
      });
    },
    { scope: contenedorRef },
  );

  return (
    <div className="kb-fondo-flotante" ref={contenedorRef} aria-hidden="true">
      {ROSQUILLAS.map((rosquilla) => (
        <img
          key={rosquilla.izquierda + rosquilla.arriba}
          className="kb-rosquilla-fondo"
          src="assets/rosquilla-homero.png"
          alt=""
          style={{
            width: rosquilla.tam,
            left: rosquilla.izquierda,
            top: rosquilla.arriba,
          }}
        />
      ))}
    </div>
  );
}

export default FondoFlotante;
