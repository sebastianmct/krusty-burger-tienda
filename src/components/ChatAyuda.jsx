import { useState } from "react";
import { Link } from "react-router-dom";
import { SALUDOS_RAFA } from "../data/frases";
import Personaje from "./Personaje";

const PREGUNTAS = [
  {
    pregunta: "¿Cómo hago mi pedido?",
    claves: ["pedido", "comprar", "compra", "pedir"],
    respuesta:
      'Elige lo que quieras en el Menú, agrégalo al carrito y presiona "Continuar con el pago". ¡Es fácil, hasta yo pude!',
  },
  {
    pregunta: "¿Cuánto demora el despacho?",
    claves: ["despacho", "demora", "tarda", "entrega", "otto"],
    respuesta:
      "Otto maneja el bus y llega en unos 30 a 45 minutos. Apenas pagas, tu pedido va en camino.",
  },
  {
    pregunta: "¿Hay ofertas?",
    claves: ["oferta", "descuento", "barato"],
    respuesta: "¡Sí, Hay productos con hasta 30% de descuento! ",
    enlace: { texto: "Ver ofertas", a: "/ofertas" },
  },
  {
    pregunta: "¿Cómo me registro?",
    claves: ["registr", "cuenta", "crear"],
    respuesta:
      "Entra a Registrarme y llena el formulario. Mi Papá vigila que no falte ningún dato.",
    enlace: { texto: "Ir al registro", a: "/registro" },
  },
  {
    pregunta: "¿Puedo pagar con tarjeta real?",
    claves: ["tarjeta", "pago", "pagar"],
    respuesta:
      "No. El pago es de mentira, como el helado de crayón. Solo es una simulación.",
  },
];

const NO_ENTENDI =
  "No entendí, pero me gusta tu cara. Prueba con una de las preguntas de abajo.";

function buscarRespuesta(texto) {
  const minusculas = texto.toLowerCase();
  return PREGUNTAS.find(
    (p) =>
      p.pregunta.toLowerCase() === minusculas ||
      p.claves.some((clave) => minusculas.includes(clave)),
  );
}

function ChatAyuda() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [escrito, setEscrito] = useState("");

  function abrirChat() {
    if (mensajes.length === 0) {
      const saludo =
        SALUDOS_RAFA[Math.floor(Math.random() * SALUDOS_RAFA.length)];
      setMensajes([
        { de: "rafa", texto: saludo },
        { de: "rafa", texto: "Soy Rafa. ¿En qué te puedo ayudar?" },
      ]);
    }
    setAbierto(true);
  }

  function preguntar(texto) {
    if (!texto.trim()) return;
    const encontrada = buscarRespuesta(texto);
    setMensajes((anteriores) => [
      ...anteriores,
      { de: "yo", texto },
      {
        de: "rafa",
        texto: encontrada ? encontrada.respuesta : NO_ENTENDI,
        enlace: encontrada ? encontrada.enlace : null,
      },
    ]);
    setEscrito("");
  }

  if (!abierto) {
    return (
      <button
        type="button"
        className="kb-chat-boton"
        aria-label="Abrir chat de ayuda"
        onClick={abrirChat}
      >
        <Personaje quien="rafa" tam="sm" />
        <span>Ayuda</span>
      </button>
    );
  }

  return (
    <section className="kb-chat" aria-label="Chat de ayuda">
      <header className="kb-chat-cabecera">
        <Personaje quien="rafa" tam="sm" />
        <div>
          <strong>Rafa Gorgory</strong>
          <small>Ayuda en línea</small>
        </div>
        <button
          type="button"
          className="kb-chat-cerrar"
          aria-label="Cerrar chat de ayuda"
          onClick={() => setAbierto(false)}
        >
          <i className="ti ti-x"></i>
        </button>
      </header>

      <div className="kb-chat-mensajes" aria-live="polite">
        {mensajes.map((mensaje, indice) => (
          <div
            key={indice}
            className={
              "kb-chat-mensaje " + (mensaje.de === "yo" ? "yo" : "rafa")
            }
          >
            {mensaje.texto}
            {mensaje.enlace && (
              <Link
                to={mensaje.enlace.a}
                className="kb-chat-enlace"
                onClick={() => setAbierto(false)}
              >
                {mensaje.enlace.texto}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="kb-chat-preguntas">
        {PREGUNTAS.map((p) => (
          <button
            type="button"
            key={p.pregunta}
            onClick={() => preguntar(p.pregunta)}
          >
            {p.pregunta}
          </button>
        ))}
      </div>

      <form
        className="kb-chat-form"
        onSubmit={(evento) => {
          evento.preventDefault();
          preguntar(escrito);
        }}
      >
        <input
          type="text"
          value={escrito}
          maxLength="100"
          placeholder="Escribe tu pregunta..."
          aria-label="Escribe tu pregunta"
          onChange={(evento) => setEscrito(evento.target.value)}
        />
        <button type="submit" aria-label="Enviar pregunta">
          <i className="ti ti-send"></i>
        </button>
      </form>
    </section>
  );
}

export default ChatAyuda;
