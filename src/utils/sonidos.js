function normalizarEtiqueta(elemento) {
  return `${elemento.getAttribute("aria-label") || ""} ${elemento.textContent || ""}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const SELECTOR_PRESIONABLE =
  'a[href], button, input[type="checkbox"], input[type="radio"], [role="button"], [role="switch"], summary';
const SELECTOR_ESCRIBIBLE =
  'input:not([type]), input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="tel"], input[type="url"], input[type="number"], textarea, [contenteditable="true"]';
const SELECTOR_CAMPO = `${SELECTOR_ESCRIBIBLE}, select`;

function esBotonDeEnvio(elemento) {
  return (
    elemento.matches('button[type="submit"], input[type="submit"]') ||
    (elemento.matches("button") && elemento.form && elemento.type === "submit")
  );
}

function cueExplicito(elemento, tipoEvento) {
  const cuePorEvento = elemento.getAttribute(`data-uisfx-${tipoEvento}`);
  if (cuePorEvento) return cuePorEvento;
  return tipoEvento === "click" ? elemento.getAttribute("data-uisfx") : null;
}

function obtenerCueDeClic(elemento) {
  const etiqueta = normalizarEtiqueta(elemento);
  const esEnlace = elemento.matches("a[href]");
  const expandido = elemento.getAttribute("aria-expanded");

  if (esBotonDeEnvio(elemento)) return null;
  if (expandido === "false") return "open";
  if (expandido === "true") return "close";
  if (
    /\b(cerrar sesion|cerrar sesión|salir|log out|logout)\b/.test(etiqueta)
  ) {
    return "lock";
  }
  if (
    /\b(iniciar sesion|iniciar sesión|entrar|acceder|log in|login)\b/.test(
      etiqueta,
    )
  ) {
    return "unlock";
  }
  if (
    /\b(agregar|anadir|añadir|add)\b/.test(etiqueta) &&
    /\b(carrito|cart|pedido)\b/.test(etiqueta)
  ) {
    return "add-to-cart";
  }
  if (
    /\b(quitar|remove|eliminar)\b/.test(etiqueta) &&
    /\b(carrito|cart|pedido)\b/.test(etiqueta)
  ) {
    return "remove-from-cart";
  }
  if (/\b(eliminar|borrar|delete)\b/.test(etiqueta)) return "delete";
  if (/\b(comprar|pagar|checkout|finalizar compra)\b/.test(etiqueta)) {
    return "checkout";
  }
  if (/\b(cancelar|cancel)\b/.test(etiqueta)) return "cancel";
  if (/\b(volver|regresar|back)\b/.test(etiqueta)) return "back";
  if (/\b(cerrar|close)\b/.test(etiqueta)) return "close";
  if (/\b(abrir|expandir|mostrar)\b/.test(etiqueta)) return "open";
  if (/\b(desplegar|expand)\b/.test(etiqueta)) return "expand";
  if (/\b(ocultar|contraer|collapse)\b/.test(etiqueta)) return "collapse";
  if (/\b(confirmar|confirm)\b/.test(etiqueta)) return "confirm";
  if (/\b(reintentar|intentar nuevamente|retry)\b/.test(etiqueta)) {
    return "retry";
  }
  if (esEnlace) return "forward";
  return null;
}

export function obtenerCueSonido(elemento, tipoEvento = "click", evento) {
  if (
    !elemento ||
    elemento.disabled ||
    elemento.closest("[data-sound-control]") ||
    elemento.hasAttribute("data-uisfx-ignore")
  ) {
    return null;
  }

  const cueDeclarado = cueExplicito(elemento, tipoEvento);
  if (cueDeclarado) return cueDeclarado;

  switch (tipoEvento) {
    case "pointerover":
      return elemento.closest(SELECTOR_PRESIONABLE) ? "hover" : null;
    case "pointerdown":
      return !esBotonDeEnvio(elemento) &&
        elemento.closest(SELECTOR_PRESIONABLE)
        ? "press"
        : null;
    case "pointerup":
      return !esBotonDeEnvio(elemento) &&
        elemento.closest(SELECTOR_PRESIONABLE)
        ? "release"
        : null;
    case "dblclick":
      return elemento.closest(SELECTOR_PRESIONABLE) ? "double-click" : null;
    case "focusin":
      return elemento.matches(SELECTOR_CAMPO) ? "focus" : null;
    case "input":
      return elemento.matches(SELECTOR_ESCRIBIBLE) ? "typing" : null;
    case "change": {
      if (elemento.matches('input[type="checkbox"]')) {
        return elemento.checked ? "check" : "uncheck";
      }
      if (elemento.matches('[role="switch"]')) {
        return elemento.getAttribute("aria-checked") === "true"
          ? "toggle-on"
          : "toggle-off";
      }
      if (elemento.matches('input[type="radio"]')) {
        return elemento.checked ? "select" : "deselect";
      }
      return elemento.matches("select") ? "select" : null;
    }
    case "submit":
      if (!elemento.matches("form")) return null;
      return (
        elemento.getAttribute("data-uisfx-submit") ||
        (elemento.matches("#contacto-form, .kb-chat-form")
          ? "send"
          : elemento.matches("#login-form")
            ? "unlock"
            : "start")
      );
    case "copy":
    case "paste":
      return elemento.matches(SELECTOR_ESCRIBIBLE) ? tipoEvento : null;
    case "dragstart":
      return elemento.draggable || elemento.matches("[data-uisfx-draggable]")
        ? "drag-start"
        : null;
    case "drop":
      return elemento.closest("[data-uisfx-drop]") ? "drop" : null;
    case "swipe":
      return elemento.closest("[data-uisfx-swipe]") ? "swipe" : null;
    case "longpress":
      return elemento.closest("[data-uisfx-long-press]") ? "long-press" : null;
    case "keydown":
      if (evento?.key === "Escape") return "cancel";
      if (
        (evento?.key === "Enter" || evento?.key === " ") &&
        elemento.closest(SELECTOR_PRESIONABLE)
      ) {
        return "press";
      }
      if (evento?.ctrlKey || evento?.metaKey) {
        if (evento.key.toLowerCase() === "z" && evento.shiftKey) return "redo";
        if (evento.key.toLowerCase() === "z") return "undo";
        if (evento.key.toLowerCase() === "y") return "redo";
      }
      return null;
    case "keyup":
      return (evento?.key === "Enter" || evento?.key === " ") &&
        elemento.closest(SELECTOR_PRESIONABLE)
        ? "release"
        : null;
    case "play":
      return elemento.matches("audio, video") ? "play" : null;
    case "pause":
      return elemento.matches("audio, video") ? "pause" : null;
    case "seeking":
      return elemento.matches("audio, video") ? "seek" : null;
    case "volumechange":
      return elemento.matches("audio, video") ? "volume-change" : null;
    default:
      return tipoEvento === "click" ? obtenerCueDeClic(elemento) : null;
  }
}

export function obtenerCueEstado(elemento, estado) {
  if (!elemento || elemento.hasAttribute("data-uisfx-ignore")) return null;

  if (estado === "busy-start") {
    return elemento.getAttribute("data-uisfx-loop") || "loading";
  }
  if (estado === "mount") {
    return elemento.getAttribute("data-uisfx-on-mount");
  }
  if (estado !== "live-region") return null;

  const cueDeclarado = elemento.getAttribute("data-uisfx");
  if (cueDeclarado) return cueDeclarado;
  if (elemento.closest(".kb-chat-mensajes")) return "receive";
  if (elemento.getAttribute("role") === "alert") return "error";
  if (elemento.classList.contains("mensaje-exito")) return "success";
  return elemento.getAttribute("role") === "status" ||
    elemento.hasAttribute("aria-live")
    ? "notification"
    : null;
}
