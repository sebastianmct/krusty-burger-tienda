import { gsap, animacionesActivas } from "./gsap";

// Botón "Agregar al carrito" basado en el ejemplo de Aaron Iker (GSAP + MorphSVG),
// con la camiseta reemplazada por una hamburguesa.

// La hamburguesa tiene SIEMPRE la misma cantidad de comandos en las tres
// formas, así MorphSVG puede deformarla sin saltos.
export const HAMBURGUESA = {
  reposo:
    "M3 11C3 6.2 7 2.5 12 2.5C17 2.5 21 6.2 21 11L21 17.5C21 19.9 19.9 21.5 18 21.5L6 21.5C4.1 21.5 3 19.9 3 17.5Z",
  aplastada:
    "M1.5 14.5C1.5 10.9 6 8.8 12 8.8C18 8.8 22.5 10.9 22.5 14.5L22.5 18.5C22.5 20.4 21.4 21.5 19.5 21.5L4.5 21.5C2.6 21.5 1.5 20.4 1.5 18.5Z",
  estirada:
    "M4 9.5C4 4.8 7.6 1.5 12 1.5C16.4 1.5 20 4.8 20 9.5L20 17.5C20 19.9 19 21.5 17.5 21.5L6.5 21.5C5 21.5 4 19.9 4 17.5Z",
};

// Detalles (se dibujan con el color de contraste): separadores de las capas y
// semillas de sésamo.
export const DETALLES_HAMBURGUESA = [
  "M3 11H21V12H3Z",
  "M3 16H21V17H3Z",
  "M8.1 6.5a0.9 0.5 0 1 0 1.8 0a0.9 0.5 0 1 0 -1.8 0Z",
  "M12.1 5a0.9 0.5 0 1 0 1.8 0a0.9 0.5 0 1 0 -1.8 0Z",
  "M15 8a0.9 0.5 0 1 0 1.8 0a0.9 0.5 0 1 0 -1.8 0Z",
];

export const CURVA_PLANA = "M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z";
const CURVA_PICO =
  "M0 12C6 12 20 10 32 0C43.9024 9.99999 58 12 64 12V13H0V12Z";

const TEXTO_X = 14;

const VARIABLES = [
  "--background-scale",
  "--shirt-scale",
  "--shirt-y",
  "--shirt-second-y",
  "--cart-x",
  "--cart-y",
  "--cart-scale",
  "--cart-rotate",
  "--cart-clip",
  "--cart-clip-x",
  "--cart-tick-offset",
  "--text-o",
  "--text-x",
];

// Calcula dónde descansa el carrito (a la izquierda del texto) según el ancho
// real del texto del botón.
export function ajustarReposoBoton(boton) {
  const texto = boton.querySelector(".kb-add-texto");
  if (!texto || !texto.offsetWidth) return;
  const reposo = -(texto.offsetWidth / 2) - 5.5;
  boton.style.setProperty("--cart-rest-x", `${reposo}px`);
}

export function presionarBoton(boton) {
  if (!animacionesActivas() || boton.classList.contains("active")) return;
  gsap.to(boton, { "--background-scale": 0.97, duration: 0.15 });
}

export function soltarBoton(boton) {
  if (!animacionesActivas() || boton.classList.contains("active")) return;
  gsap.to(boton, { "--background-scale": 1, duration: 0.3 });
}

function limpiar(boton) {
  VARIABLES.forEach((variable) => boton.style.removeProperty(variable));
  boton.style.overflow = "";
  boton.classList.remove("active");
}

export function animarBotonCarrito(boton) {
  if (!boton || !animacionesActivas()) return null;
  if (boton.classList.contains("active")) return null;

  ajustarReposoBoton(boton);

  const curva = boton.querySelector(".kb-add-curva path");
  const hamburguesas = boton.querySelectorAll(".kb-add-burger svg > path");
  const reposoX = parseFloat(boton.style.getPropertyValue("--cart-rest-x")) || -48;
  const salidaX = boton.offsetWidth / 2 + 40;

  boton.classList.add("active");

  const tl = gsap.timeline({ onComplete: () => limpiar(boton) });

  // 1. El botón se hunde y rebota.
  tl.to(
    boton,
    {
      keyframes: [
        { "--background-scale": 0.97, duration: 0.15 },
        {
          "--background-scale": 1,
          delay: 0.125,
          duration: 1.2,
          ease: "elastic.out(1, .6)",
        },
      ],
    },
    0,
  );

  // 2. La hamburguesa sube, cae y se "mete" en el carrito.
  tl.to(
    boton,
    {
      keyframes: [
        {
          "--shirt-scale": 1,
          "--shirt-y": "-42px",
          "--cart-x": "0px",
          "--cart-scale": 1,
          duration: 0.4,
          ease: "power1.in",
        },
        { "--shirt-y": "-40px", duration: 0.3 },
        {
          "--shirt-y": "16px",
          "--shirt-scale": 0.9,
          duration: 0.25,
          ease: "none",
        },
        { "--shirt-scale": 0, duration: 0.3, ease: "none" },
      ],
    },
    0,
  );

  tl.to(boton, { "--shirt-second-y": "0px", duration: 0.12 }, 0.835);
  tl.to(boton, { "--text-o": 0, duration: 0.3 }, 0);

  // 3. El carrito se llena, aparece el visto bueno y se va.
  tl.to(boton, { "--cart-clip": "12px", "--cart-clip-x": "3px", duration: 0.06 }, 0.9);
  tl.to(boton, { "--cart-y": "2px", duration: 0.1 }, 0.96);
  tl.to(
    boton,
    { "--cart-tick-offset": "0px", "--cart-y": "0px", duration: 0.2 },
    1.06,
  );
  tl.call(
    () => {
      boton.style.overflow = "hidden";
    },
    null,
    1.26,
  );
  tl.to(
    boton,
    { "--cart-x": `${salidaX / 2}px`, "--cart-rotate": "-15deg", duration: 0.2 },
    1.26,
  );
  tl.to(
    boton,
    { "--cart-x": `${salidaX}px`, "--cart-rotate": "0deg", duration: 0.2 },
    1.46,
  );

  // 4. El carrito vuelve a entrar desde la izquierda y reaparece el texto.
  tl.call(
    () => {
      boton.style.setProperty("--text-o", "0");
      boton.style.setProperty("--text-x", "0px");
      boton.style.setProperty("--cart-x", `${-salidaX}px`);
      boton.style.setProperty("--cart-rotate", "0deg");
      boton.style.setProperty("--cart-scale", "0.75");
      boton.style.setProperty("--cart-clip", "0px");
      boton.style.setProperty("--cart-clip-x", "0px");
      boton.style.setProperty("--cart-tick-offset", "10px");
    },
    null,
    1.65,
  );
  tl.to(
    boton,
    {
      "--text-o": 1,
      "--text-x": `${TEXTO_X}px`,
      "--cart-x": `${reposoX}px`,
      duration: 0.25,
    },
    1.66,
  );

  // 5. La "joroba" del botón se deforma y la hamburguesa se aplasta y rebota.
  if (curva) {
    tl.to(
      curva,
      {
        keyframes: [
          { morphSVG: CURVA_PICO, duration: 0.25, ease: "power1.out" },
          { morphSVG: CURVA_PLANA, duration: 0.15, ease: "none" },
        ],
      },
      0,
    );
  }
  if (hamburguesas.length) {
    tl.to(
      hamburguesas,
      {
        keyframes: [
          { morphSVG: HAMBURGUESA.aplastada, duration: 0.25, delay: 0.25 },
          {
            morphSVG: HAMBURGUESA.estirada,
            duration: 0.85,
            ease: "elastic.out(1, .5)",
          },
          { morphSVG: HAMBURGUESA.reposo, duration: 0 },
        ],
      },
      0,
    );
  }

  return tl;
}

export function detenerBotonCarrito(boton, tl) {
  if (tl) tl.kill();
  if (boton) {
    gsap.killTweensOf(boton);
    limpiar(boton);
  }
}
