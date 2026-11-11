import { useLayoutEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  Flip,
  SplitText,
  useGSAP,
  animacionesActivas,
  retrasoEntrada,
  refrescarScroll,
} from "./gsap";
import {
  activarMagnetico,
  activarRebote,
  animarFocoCampos,
  animarMensajesExito,
} from "./efectos";

function esperaInicial(elemento, retraso) {
  return ScrollTrigger.isInViewport(elemento) ? retraso : 0;
}

function revelar(selector, desde = {}, retraso = 0) {
  gsap.utils.toArray(selector).forEach((elemento) => {
    gsap.from(elemento, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "transform,opacity",
      ...desde,
      delay: esperaInicial(elemento, retraso),
      scrollTrigger: { trigger: elemento, start: "top 88%", once: true },
    });
  });
}

function entradaPorLotes(selector, retraso = 0, desde = { y: 60, scale: 0.9 }) {
  const elementos = gsap.utils.toArray(selector);
  if (!elementos.length) return;

  const hasta = { opacity: 1 };
  Object.keys(desde).forEach((clave) => {
    hasta[clave] = clave === "scale" ? 1 : 0;
  });

  elementos.forEach((elemento) => elemento.classList.add("kb-gsap-anim"));
  gsap.set(elementos, { opacity: 0, ...desde });

  const inicio = performance.now();
  ScrollTrigger.batch(elementos, {
    start: "top 90%",
    once: true,
    onEnter: (lote) => {
      const espera = Math.max(0, retraso - (performance.now() - inicio) / 1000);
      gsap.to(lote, {
        ...hasta,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.5)",
        delay: espera,
        overwrite: true,
        clearProps: "transform,opacity",
        onComplete: () =>
          lote.forEach((elemento) => elemento.classList.remove("kb-gsap-anim")),
      });
    },
  });
}

function tituloPorLetras(selector, retraso) {
  SplitText.create(selector, {
    type: "words,chars",
    autoSplit: true,
    onSplit(division) {
      return gsap.from(division.chars, {
        yPercent: 120,
        rotation: 12,
        opacity: 0,
        duration: 0.7,
        stagger: 0.025,
        ease: "back.out(1.7)",
        delay: retraso,
      });
    },
  });
}

export function useEntradaTarjetas(selector, dependencias = []) {
  useGSAP(
    () => {
      if (!animacionesActivas()) return;
      entradaPorLotes(selector, retrasoEntrada());
      refrescarScroll();
    },
    { dependencies: dependencias, revertOnUpdate: true },
  );
}

export function useFlipLista(selector, clave) {
  const claveAnterior = useRef(clave);
  const estado = useRef(null);

  if (claveAnterior.current !== clave) {
    claveAnterior.current = clave;
    if (animacionesActivas()) estado.current = Flip.getState(selector);
  }

  useLayoutEffect(() => {
    if (!estado.current) return;
    const guardado = estado.current;
    estado.current = null;
    Flip.from(guardado, {
      duration: 0.65,
      ease: "power2.inOut",
      stagger: 0.03,
      onEnter: (elementos) =>
        gsap.fromTo(
          elementos,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            clearProps: "transform,opacity",
          },
        ),
    });
  }, [clave]);
}


export function useAnimacionesInicio() {
  useGSAP(
    () => {
      if (!animacionesActivas()) return;
      const retraso = retrasoEntrada();

      // Portada cinematográfica
      tituloPorLetras(".kb-hero-title", retraso);
      gsap.from(".kb-hero-text", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: retraso + 0.45,
      });
      gsap.from(".hero-text .btn-kb-hero", {
        scale: 0.6,
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.15,
        ease: "back.out(2)",
        delay: retraso + 0.7,
        clearProps: "transform,opacity",
      });
      gsap.from(".kb-hero-img", {
        scale: 0.2,
        opacity: 0,
        rotation: -90,
        duration: 1.1,
        ease: "back.out(1.5)",
        delay: retraso + 0.2,
      });
      gsap.to(".kb-hero-img", {
        y: -16,
        rotation: 5,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: retraso + 1.4,
      });
      gsap
        .timeline({ repeat: -1, repeatDelay: 3.5, delay: retraso + 2.6 })
        .to(".kb-hero-title > span", { opacity: 0.3, duration: 0.06 })
        .to(".kb-hero-title > span", { opacity: 1, duration: 0.06 })
        .to(".kb-hero-title > span", { opacity: 0.55, duration: 0.05 })
        .to(".kb-hero-title > span", { opacity: 1, duration: 0.12 });

      revelar(".kb-section-title", { x: -80, y: 0 }, retraso);
      gsap.from(".kb-filtro", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(2)",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".kb-menu-section", start: "top 85%", once: true },
      });

      revelar(".kb-personaje", { y: 70 }, retraso);
      revelar(".kb-vecinos-titulo", { y: 40 }, retraso);
      gsap.from(".kb-vecinos-grid > *", {
        scale: 0.8,
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.6)",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".kb-vecinos-grid", start: "top 88%", once: true },
      });

      const club = { trigger: ".kb-club-section", start: "top 75%", once: true };
      gsap.from(".kb-club-imagen", {
        x: -140,
        rotation: -14,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: club,
      });
      gsap.from(".kb-club-contenido > *", {
        x: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: club,
      });
      gsap.fromTo(
        ".kb-club-imagen img",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".kb-club-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.to(".btn-kb-club", {
        scale: 1.06,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const limpiarMagnetico = activarMagnetico(".hero-text .btn-kb-hero", 0.3);
      refrescarScroll();
      return limpiarMagnetico;
    },
    { dependencies: [] },
  );
}

export function useAnimacionesPromociones() {
  useGSAP(
    () => {
      if (!animacionesActivas()) return;
      const retraso = retrasoEntrada();

      tituloPorLetras(".hero-promo h1", retraso);
      gsap.from(".hero-promo .hero-text p", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: retraso + 0.5,
      });
      gsap.from(".hero-promo .botones button", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(2.4)",
        delay: retraso + 0.75,
        clearProps: "transform,opacity",
      });

      gsap.utils
        .toArray(".oferta-combo, .oferta-dos-por-uno, .oferta-kids")
        .forEach((oferta, i) => {
          gsap.from(oferta, {
            y: 90,
            opacity: 0,
            rotation: i % 2 ? 3 : -3,
            duration: 0.9,
            ease: "back.out(1.3)",
            clearProps: "transform,opacity",
            delay: esperaInicial(oferta, retraso + 0.3),
            scrollTrigger: { trigger: oferta, start: "top 88%", once: true },
          });
        });

      gsap.fromTo(
        ".oferta-combo img",
        { clipPath: "inset(0% 50% 0% 50%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.inOut",
          clearProps: "clipPath",
          delay: retraso + 0.5,
          scrollTrigger: { trigger: ".oferta-combo", start: "top 85%", once: true },
        },
      );

      gsap.from(".oferta-combo .precio", {
        scale: 0.2,
        opacity: 0,
        rotation: -8,
        transformOrigin: "left center",
        duration: 1,
        ease: "elastic.out(1, 0.4)",
        delay: retraso + 0.8,
        scrollTrigger: { trigger: ".oferta-combo", start: "top 85%", once: true },
      });

      [
        [".oferta-combo img", -10, 2.4],
        [".oferta-dos-por-uno img", -8, 3],
        [".oferta-kids img", -8, 2.7],
      ].forEach(([selector, y, duracion], i) => {
        gsap.to(selector, {
          y,
          duration: duracion,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: retraso + 1.8 + i * 0.4,
        });
      });

      gsap.from(".historia > h3, .historia > h2, .historia > p", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".historia", start: "top 75%", once: true },
      });
      gsap.fromTo(
        ".historia img",
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.inOut",
          clearProps: "clipPath",
          scrollTrigger: { trigger: ".historia", start: "top 70%", once: true },
        },
      );

      refrescarScroll();
    },
    { dependencies: [] },
  );
}

export function useAnimacionesNosotros() {
  useGSAP(
    () => {
      if (!animacionesActivas()) return;
      const retraso = retrasoEntrada();

      gsap.from(".historia-texto > *", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: retraso,
        clearProps: "transform,opacity",
      });
      gsap.from(".noticias-nosotros", {
        x: 120,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.4)",
        delay: retraso + 0.2,
        clearProps: "transform,opacity",
      });

      revelar(".mision-cabecera > *", { y: 40 }, retraso);
      entradaPorLotes(".mision-card", retraso, { y: 80, scale: 0.92 });

      revelar(".equipo-cabecera > *", { y: 40 }, retraso);
      gsap.from(".fundador", {
        x: -120,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".fundador", start: "top 85%", once: true },
      });
      entradaPorLotes(".credencial", retraso, { y: 70, rotation: -5, scale: 0.9 });

      gsap.fromTo(
        ".fundador-foto img",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ".fundador",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      refrescarScroll();
    },
    { dependencies: [] },
  );
}

export function useAnimacionesContacto() {
  useGSAP(
    () => {
      if (!animacionesActivas()) return undefined;
      const retraso = retrasoEntrada();
      const formulario = "#contacto-form";

      tituloPorLetras(".kb-titulo-h1", retraso);
      gsap.from(".kb-titulo p", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: retraso + 0.5,
      });
      gsap.from(".kb-mou-container", {
        x: -120,
        rotation: -12,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.6)",
        delay: retraso + 0.3,
      });

      gsap
        .timeline({
          delay: retraso + 0.3,
          defaults: { duration: 0.7, ease: "power3.out" },
        })
        .from(".kb-formulario-contenedor", { y: 60, opacity: 0 })
        .from(`${formulario} .row > div:first-child`, { x: -60, opacity: 0 }, "-=0.35")
        .from(`${formulario} .row > div:last-child`, { x: 60, opacity: 0 }, "<")
        .from(`${formulario} > div:not(.row)`, { y: 40, opacity: 0 }, "-=0.45")
        .from(
          ".btn-kb-enviar",
          { scale: 0, rotation: -10, ease: "back.out(2.4)" },
          "-=0.3",
        );

      gsap.from(".kb-info-contacto", {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: retraso + 0.5,
      });

      const limpiezas = [
        animarFocoCampos(document.querySelector(formulario)),
        animarMensajesExito(),
      ];
      return () => limpiezas.forEach((limpiar) => limpiar());
    },
    { dependencies: [] },
  );
}

export function useAnimacionesLogin() {
  useGSAP(
    () => {
      if (!animacionesActivas()) return undefined;
      const retraso = retrasoEntrada();

      gsap.from(".tarjeta-login", {
        opacity: 0,
        rotationX: 30,
        y: 60,
        transformPerspective: 800,
        duration: 1,
        ease: "power3.out",
        delay: retraso,
        clearProps: "transform,opacity",
      });
      gsap.from(".gif-krusty", {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "bounce.out",
        delay: retraso + 0.3,
        clearProps: "transform,opacity",
      });
      gsap.from(".icono-hamburguesa", {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: "back.out(2)",
        delay: retraso + 0.5,
        clearProps: "transform",
      });
      gsap.from(".formulario-login > *", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: retraso + 0.6,
        clearProps: "transform,opacity",
      });

      const limpiezas = [
        animarFocoCampos(document.querySelector(".tarjeta-login")),
        animarMensajesExito(),
      ];
      return () => limpiezas.forEach((limpiar) => limpiar());
    },
    { dependencies: [] },
  );
}

export function useAnimacionesRegistro() {
  useGSAP(
    () => {
      if (!animacionesActivas()) return undefined;
      const retraso = retrasoEntrada();

      gsap.from(".registro .titulo", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: retraso,
        clearProps: "transform,opacity",
      });
      gsap.from(".registro .texto", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: retraso + 0.3,
        clearProps: "transform,opacity",
      });
      gsap.from(".kb-policia", {
        x: -120,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)",
        delay: retraso + 0.5,
        clearProps: "transform,opacity",
      });
      gsap.from(".formulario-registro", {
        opacity: 0,
        rotationX: 30,
        y: 60,
        transformPerspective: 800,
        duration: 1,
        ease: "power3.out",
        delay: retraso + 0.2,
        clearProps: "transform,opacity",
      });

      const limpiezas = [
        animarFocoCampos(document.querySelector(".formulario-registro")),
        animarMensajesExito(),
      ];
      return () => limpiezas.forEach((limpiar) => limpiar());
    },
    { dependencies: [] },
  );
}

export function useAnimacionesCarrito() {
  useGSAP(
    () => {
      if (!animacionesActivas()) return;
      const retraso = retrasoEntrada();

      gsap.from(".carrito h1", {
        x: -60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: retraso,
        clearProps: "transform,opacity",
      });
      gsap.from(".linea-titulo", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power3.inOut",
        delay: retraso + 0.2,
        clearProps: "transform",
      });
      gsap.from(".lista-productos .producto", {
        x: -80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.4)",
        delay: retraso + 0.35,
        clearProps: "transform,opacity",
      });
      gsap.from(".carrito-vacio", {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.8)",
        delay: retraso + 0.35,
        clearProps: "transform,opacity",
      });
      gsap.from(".carrito-lateral .krusty-imagen", {
        y: -60,
        opacity: 0,
        duration: 0.9,
        ease: "bounce.out",
        delay: retraso + 0.3,
        clearProps: "transform,opacity",
      });
      gsap.from(".carrito-lateral .resumen", {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: retraso + 0.45,
        clearProps: "transform,opacity",
      });
    },
    { dependencies: [] },
  );
}

export function useAnimacionesNavbar(navRef, cantidadCarrito) {
  const cantidadAnterior = useRef(cantidadCarrito);

  useGSAP(
    () => {
      if (!animacionesActivas() || !navRef.current) return undefined;
      const retraso = retrasoEntrada();

      gsap.from(navRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: retraso,
        clearProps: "transform,opacity",
      });
      gsap.from(".kb-nav-link", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
        delay: retraso + 0.25,
        clearProps: "transform,opacity",
      });

      return activarMagnetico(
        navRef.current.querySelectorAll(".btn-kb-primario, .kb-icon-link"),
        0.3,
      );
    },
    { scope: navRef, dependencies: [] },
  );

  useGSAP(
    () => {
      const subio = cantidadCarrito > cantidadAnterior.current;
      cantidadAnterior.current = cantidadCarrito;
      if (!subio || !animacionesActivas()) return;
      gsap.fromTo(
        ".contador-carrito",
        { scale: 2, rotation: -25 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        },
      );
    },
    { scope: navRef, dependencies: [cantidadCarrito] },
  );
}

export function useAnimacionesGlobales() {
  useGSAP(
    () => {
      if (!animacionesActivas()) return undefined;
      return activarRebote(".kb-footer-github");
    },
    { dependencies: [] },
  );
}
