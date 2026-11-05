import { useEffect, useRef, useState } from "react";
import { createUISFX } from "uisfx";
import { SonidoContext } from "./sonido-context";
import { obtenerCueEstado, obtenerCueSonido } from "../utils/sonidos";

function crearReproductorSonido(sonido) {
  let desbloqueado = false;
  let desbloqueando = null;

  function desbloquear() {
    if (desbloqueado) return Promise.resolve(true);
    if (desbloqueando) return desbloqueando;

    desbloqueando = sonido
      .unlock()
      .then(
        (resultado) => {
          desbloqueado = resultado;
          return resultado;
        },
        (error) => {
          console.error(
            "No se pudieron reproducir los sonidos de interfaz.",
            error,
          );
          return false;
        },
      )
      .finally(() => {
        desbloqueando = null;
      });

    return desbloqueando;
  }

  function reproducir(cue, permitirDesbloqueo = false) {
    if (!cue || !sonido.isEnabled()) return Promise.resolve(null);

    const accesoAudio = desbloqueado
      ? Promise.resolve(true)
      : desbloqueando ||
        (permitirDesbloqueo ? desbloquear() : Promise.resolve(false));

    return accesoAudio
      .then((listo) => {
        if (listo && sonido.isEnabled()) return sonido.play(cue);
        return null;
      })
      .catch((error) => {
        console.error(
          "No se pudieron reproducir los sonidos de interfaz.",
          error,
        );
        return null;
      });
  }

  return { desbloquear, reproducir };
}

export function SonidoProvider({ children }) {
  const [sonido] = useState(() =>
    createUISFX({
      pack: "zen",
      volume: 0.85,
      preferences: { key: "krusty-burger:uisfx" },
    }),
  );
  const [pack, setPack] = useState(() => sonido.getPack());
  const [enabled, setEnabled] = useState(() => sonido.isEnabled());
  const [reproductor] = useState(() => crearReproductorSonido(sonido));
  const destruccionPendiente = useRef(null);

  useEffect(() => {
    destruccionPendiente.current = {};
    const loopsActivos = new Map();

    function iniciarLoop(elemento, cue) {
      if (loopsActivos.has(elemento)) return;

      const loop = { reproduccion: null, cancelado: false };
      loopsActivos.set(elemento, loop);
      reproductor.reproducir(cue).then((reproduccion) => {
        if (loop.cancelado) {
          reproduccion?.stop();
        } else if (!reproduccion) {
          loopsActivos.delete(elemento);
        } else {
          loop.reproduccion = reproduccion;
        }
      });
    }

    function detenerLoop(elemento) {
      const loop = loopsActivos.get(elemento);
      if (!loop) return;

      loop.cancelado = true;
      loop.reproduccion?.stop();
      loopsActivos.delete(elemento);
    }

    function procesarEstadoOcupado(elemento) {
      if (elemento.getAttribute("aria-busy") === "true") {
        iniciarLoop(elemento, obtenerCueEstado(elemento, "busy-start"));
      } else {
        detenerLoop(elemento);
      }
    }

    function iniciarLoopsOcupados() {
      document
        .querySelectorAll('[aria-busy="true"]')
        .forEach(procesarEstadoOcupado);
    }

    function emitirCueDeRegion(elemento) {
      if (!(elemento instanceof Element)) return;
      const region = elemento.closest(
        '[aria-live], [role="alert"], [role="status"]',
      );
      if (!region || !region.textContent.trim()) return;
      if (region.closest("[data-uisfx-on-mount]")) return;
      reproductor.reproducir(
        obtenerCueEstado(region, "live-region"),
      );
    }

    function procesarElementoAgregado(nodo) {
      if (!(nodo instanceof Element)) return;

      if (nodo.matches("[aria-busy]")) procesarEstadoOcupado(nodo);
      nodo.querySelectorAll("[aria-busy]").forEach(procesarEstadoOcupado);

      const cueAlMontar = obtenerCueEstado(nodo, "mount");
      if (cueAlMontar) reproductor.reproducir(cueAlMontar);
      nodo
        .querySelectorAll("[data-uisfx-on-mount]")
        .forEach((elemento) =>
          reproductor.reproducir(
            obtenerCueEstado(elemento, "mount"),
          ),
        );
    }

    function obtenerObjetivo(evento) {
      if (!(evento.target instanceof Element)) return null;
      return evento.target.closest(
        'a[href], button, input, textarea, select, [role="button"], [role="switch"], summary, audio, video, form, [contenteditable="true"], [draggable="true"], [data-uisfx-drop]',
      );
    }

    function reproducirEvento(evento, tipoEvento = evento.type) {
      if (!evento.isTrusted) return;
      if (tipoEvento === "pointerover" && evento.pointerType === "touch") return;
      if (
        sonido.isEnabled() &&
        ["pointerdown", "click", "keydown"].includes(tipoEvento)
      ) {
        reproductor.desbloquear();
      }

      const objetivo = obtenerObjetivo(evento);
      if (!objetivo) return;
      if (
        tipoEvento === "pointerover" &&
        objetivo.contains(evento.relatedTarget)
      ) {
        return;
      }
      const reproduccion = reproductor.reproducir(
        obtenerCueSonido(objetivo, tipoEvento, evento),
      );
      if (["pointerdown", "click", "keydown", "submit"].includes(tipoEvento)) {
        reproduccion.then(iniciarLoopsOcupados);
      }
    }

    function alHacerClic(evento) {
      reproducirEvento(evento, "click");
    }

    function alEnviarFormulario(evento) {
      reproducirEvento(evento, "submit");
    }

    function alCambiar(evento) {
      reproducirEvento(evento);
    }

    function alUsarPortapapeles(evento) {
      reproducirEvento(evento);
    }

    function alNavegarAtras(evento) {
      if (evento.isTrusted) reproductor.reproducir("back");
    }

    function alCambiarContenido(registros) {
      const regionesModificadas = new Set();

      registros.forEach((registro) => {
        if (registro.type === "attributes") {
          procesarEstadoOcupado(registro.target);
          return;
        }

        if (registro.type === "characterData") {
          regionesModificadas.add(registro.target.parentElement);
          return;
        }

        registro.addedNodes.forEach((nodo) => {
          procesarElementoAgregado(nodo);
          if (nodo instanceof Element) {
            if (
              nodo.matches('[aria-live], [role="alert"], [role="status"]')
            ) {
              regionesModificadas.add(nodo);
            }
            nodo
              .querySelectorAll(
                '[aria-live], [role="alert"], [role="status"]',
              )
              .forEach((region) => regionesModificadas.add(region));
          }
        });

        regionesModificadas.add(registro.target);
      });

      regionesModificadas.forEach(emitirCueDeRegion);
    }

    const observador = new MutationObserver(alCambiarContenido);
    observador.observe(document.body, {
      attributes: true,
      attributeFilter: ["aria-busy"],
      characterData: true,
      childList: true,
      subtree: true,
    });

    document.querySelectorAll("[aria-busy]").forEach(procesarEstadoOcupado);
    document.addEventListener("pointerover", reproducirEvento, true);
    document.addEventListener("pointerdown", reproducirEvento, true);
    document.addEventListener("pointerup", reproducirEvento, true);
    document.addEventListener("dblclick", reproducirEvento, true);
    document.addEventListener("focusin", reproducirEvento, true);
    document.addEventListener("input", reproducirEvento, true);
    document.addEventListener("click", alHacerClic, true);
    document.addEventListener("submit", alEnviarFormulario, true);
    document.addEventListener("change", alCambiar, true);
    document.addEventListener("keydown", reproducirEvento, true);
    document.addEventListener("keyup", reproducirEvento, true);
    document.addEventListener("copy", alUsarPortapapeles, true);
    document.addEventListener("paste", alUsarPortapapeles, true);
    document.addEventListener("dragstart", reproducirEvento, true);
    document.addEventListener("drop", reproducirEvento, true);
    document.addEventListener("play", reproducirEvento, true);
    document.addEventListener("pause", reproducirEvento, true);
    document.addEventListener("seeking", reproducirEvento, true);
    document.addEventListener("volumechange", reproducirEvento, true);
    window.addEventListener("popstate", alNavegarAtras);

    return () => {
      observador.disconnect();
      loopsActivos.forEach((loop) => {
        loop.cancelado = true;
        loop.reproduccion?.stop();
      });
      loopsActivos.clear();
      document.removeEventListener("pointerover", reproducirEvento, true);
      document.removeEventListener("pointerdown", reproducirEvento, true);
      document.removeEventListener("pointerup", reproducirEvento, true);
      document.removeEventListener("dblclick", reproducirEvento, true);
      document.removeEventListener("focusin", reproducirEvento, true);
      document.removeEventListener("input", reproducirEvento, true);
      document.removeEventListener("click", alHacerClic, true);
      document.removeEventListener("submit", alEnviarFormulario, true);
      document.removeEventListener("change", alCambiar, true);
      document.removeEventListener("keydown", reproducirEvento, true);
      document.removeEventListener("keyup", reproducirEvento, true);
      document.removeEventListener("copy", alUsarPortapapeles, true);
      document.removeEventListener("paste", alUsarPortapapeles, true);
      document.removeEventListener("dragstart", reproducirEvento, true);
      document.removeEventListener("drop", reproducirEvento, true);
      document.removeEventListener("play", reproducirEvento, true);
      document.removeEventListener("pause", reproducirEvento, true);
      document.removeEventListener("seeking", reproducirEvento, true);
      document.removeEventListener("volumechange", reproducirEvento, true);
      window.removeEventListener("popstate", alNavegarAtras);
      sonido.stopAll();
      const tokenDestruccion = {};
      destruccionPendiente.current = tokenDestruccion;
      queueMicrotask(() => {
        if (destruccionPendiente.current === tokenDestruccion) {
          void sonido.destroy();
        }
      });
    };
  }, [sonido, reproductor]);

  function cambiarPack(nuevoPack) {
    sonido.setPack(nuevoPack);
    setPack(nuevoPack);
  }

  function alternarSonido() {
    const nuevoEstado = !enabled;
    sonido.setEnabled(nuevoEstado);
    setEnabled(nuevoEstado);
  }

  function reproducir(cue) {
    return reproductor.reproducir(cue, true);
  }

  function probarSonido() {
    void reproducir("success");
  }

  return (
    <SonidoContext.Provider
      value={{
        pack,
        enabled,
        cambiarPack,
        alternarSonido,
        probarSonido,
        reproducir,
      }}
    >
      {children}
    </SonidoContext.Provider>
  );
}
