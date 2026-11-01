import useEstilos from "../hooks/useEstilos";
import { FRASES_DESPEDIDA } from "../data/frases";
import Dialogo from "./Dialogo";
import estiloPersonajes from "../styles/style-personajes.css?inline";

const estilos = [estiloPersonajes];

function Despedida({ quien, onCerrar }) {
  useEstilos(estilos);

  return (
    <div
      className="kb-despedida"
      role="dialog"
      aria-modal="true"
      aria-label="Sesión cerrada"
    >
      <div className="kb-despedida-caja">
        <span className="kb-despedida-etiqueta">Sesión cerrada</span>
        <Dialogo quien={quien} frase={FRASES_DESPEDIDA[quien]} tam="xl" />
        <button type="button" className="kb-despedida-boton" onClick={onCerrar}>
          Volver a la tienda
        </button>
      </div>
    </div>
  );
}

export default Despedida;
