import { FRASE_OTTO } from "../data/frases";
import Dialogo from "./Dialogo";

function EnvioOtto() {
  return (
    <section className="kb-otto" aria-label="Seguimiento del pedido">
      <Dialogo quien="otto" frase={FRASE_OTTO} tam="lg">
        <small className="kb-globo-nota">
          Entrega estimada: 30 a 45 minutos.
        </small>
      </Dialogo>
      <div className="kb-calle" aria-hidden="true">
        <span className="kb-bus">
          <img
            src={`${import.meta.env.BASE_URL}assets/ottobus.png`}
            alt="Bus"
            width="140"
            height="50"
          />
        </span>
      </div>
    </section>
  );
}

export default EnvioOtto;
