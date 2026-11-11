import { gsap, animacionesActivas } from "./gsap";

function hayPuntero() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// Imagen del producto que se inclina en 3D siguiendo el mouse.
export function inclinarImagen(evento) {
  if (evento.pointerType && evento.pointerType !== "mouse") return;
  if (!animacionesActivas()) return;
  const tarjeta = evento.currentTarget;
  const imagen = tarjeta.querySelector(".enlace-producto > img");
  if (!imagen) return;
  const caja = tarjeta.getBoundingClientRect();
  const x = (evento.clientX - caja.left) / caja.width - 0.5;
  const y = (evento.clientY - caja.top) / caja.height - 0.5;
  gsap.to(imagen, {
    rotationY: x * 18,
    rotationX: -y * 18,
    scale: 1.1,
    y: -6,
    transformPerspective: 700,
    transformOrigin: "50% 60%",
    duration: 0.35,
    ease: "power2.out",
    overwrite: "auto",
  });
}

export function reponerImagen(evento) {
  if (!animacionesActivas()) return;
  const imagen = evento.currentTarget.querySelector(".enlace-producto > img");
  if (!imagen) return;
  gsap.to(imagen, {
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    y: 0,
    duration: 0.7,
    ease: "elastic.out(1, 0.5)",
    overwrite: "auto",
  });
}

// Botones "magnéticos" (demo Magnetic Button del GSAP Demo Hub): el elemento
// se acerca al cursor y vuelve con rebote al soltarlo.
export function activarMagnetico(elementos, fuerza = 0.35) {
  if (!animacionesActivas() || !hayPuntero()) return () => {};
  const limpiezas = [];

  gsap.utils.toArray(elementos).forEach((elemento) => {
    const mueveX = gsap.quickTo(elemento, "x", {
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });
    const mueveY = gsap.quickTo(elemento, "y", {
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });
    let centro = null;

    const entrar = () => {
      const caja = elemento.getBoundingClientRect();
      centro = { x: caja.left + caja.width / 2, y: caja.top + caja.height / 2 };
    };
    const mover = (evento) => {
      if (!centro) entrar();
      mueveX((evento.clientX - centro.x) * fuerza);
      mueveY((evento.clientY - centro.y) * fuerza);
    };
    const salir = () => {
      centro = null;
      mueveX(0);
      mueveY(0);
    };

    elemento.addEventListener("pointerenter", entrar);
    elemento.addEventListener("pointermove", mover);
    elemento.addEventListener("pointerleave", salir);
    limpiezas.push(() => {
      elemento.removeEventListener("pointerenter", entrar);
      elemento.removeEventListener("pointermove", mover);
      elemento.removeEventListener("pointerleave", salir);
      gsap.set(elemento, { clearProps: "x,y" });
    });
  });

  return () => limpiezas.forEach((limpiar) => limpiar());
}

// Los campos de formulario "respiran" al recibir el foco.
export function animarFocoCampos(contenedor) {
  if (!animacionesActivas() || !contenedor) return () => {};
  const campos = "input:not([type=checkbox]):not([type=radio]), textarea, select";

  const entrar = (evento) => {
    if (!evento.target.matches(campos)) return;
    gsap.to(evento.target, {
      scale: 1.02,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  const salir = (evento) => {
    if (!evento.target.matches(campos)) return;
    gsap.to(evento.target, {
      scale: 1,
      duration: 0.35,
      ease: "back.out(2)",
      overwrite: "auto",
    });
  };

  contenedor.addEventListener("focusin", entrar);
  contenedor.addEventListener("focusout", salir);
  return () => {
    contenedor.removeEventListener("focusin", entrar);
    contenedor.removeEventListener("focusout", salir);
  };
}

// Cualquier mensaje de éxito que aparezca en pantalla entra con un rebote.
export function animarMensajesExito() {
  if (!animacionesActivas() || typeof MutationObserver === "undefined") {
    return () => {};
  }
  const observador = new MutationObserver((cambios) => {
    cambios.forEach((cambio) => {
      cambio.addedNodes.forEach((nodo) => {
        if (nodo.nodeType !== 1) return;
        const mensajes = nodo.matches(".mensaje-exito")
          ? [nodo]
          : nodo.querySelectorAll(".mensaje-exito");
        if (mensajes.length) {
          gsap.from(mensajes, {
            scale: 0.5,
            opacity: 0,
            y: 24,
            rotation: -4,
            duration: 0.7,
            ease: "back.out(2.2)",
          });
        }
      });
    });
  });
  observador.observe(document.body, { childList: true, subtree: true });
  return () => observador.disconnect();
}

// Rebote al pasar el mouse (íconos, botones pequeños).
export function activarRebote(elementos) {
  if (!animacionesActivas() || !hayPuntero()) return () => {};
  const limpiezas = [];
  gsap.utils.toArray(elementos).forEach((elemento) => {
    const entrar = () =>
      gsap.to(elemento, {
        y: -5,
        rotation: 12,
        scale: 1.2,
        duration: 0.35,
        ease: "back.out(3)",
        overwrite: "auto",
      });
    const salir = () =>
      gsap.to(elemento, {
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });
    elemento.addEventListener("pointerenter", entrar);
    elemento.addEventListener("pointerleave", salir);
    limpiezas.push(() => {
      elemento.removeEventListener("pointerenter", entrar);
      elemento.removeEventListener("pointerleave", salir);
      gsap.set(elemento, { clearProps: "transform" });
    });
  });
  return () => limpiezas.forEach((limpiar) => limpiar());
}
