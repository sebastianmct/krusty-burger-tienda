import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { FRASE_HIBBERT } from "../data/frases";
import { contarHamburguesasPesadas } from "../utils/carrito";
import Dialogo from "./Dialogo";

const MAX_HAMBURGUESAS_PESADAS = 3;

function AvisoHibbert() {
  const { items } = useCarrito();
  const pesadas = contarHamburguesasPesadas(items);
  const [cerrado, setCerrado] = useState(false);

  if (pesadas <= MAX_HAMBURGUESAS_PESADAS && cerrado) setCerrado(false);

  if (pesadas <= MAX_HAMBURGUESAS_PESADAS || cerrado) return null;

  return (
    <aside className="kb-aviso-hibbert" role="alert">
      <button
        type="button"
        className="kb-aviso-cerrar"
        aria-label="Cerrar aviso"
        onClick={() => setCerrado(true)}
      >
        <i className="ti ti-x"></i>
      </button>
      <Dialogo quien="hibbert" frase={FRASE_HIBBERT} tam="md">
        <small className="kb-globo-nota">
          Llevas {pesadas} hamburguesas pesadas.
        </small>
      </Dialogo>
    </aside>
  );
}

export default AvisoHibbert;
