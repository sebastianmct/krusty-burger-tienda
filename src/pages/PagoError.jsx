import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlertaDoh from "../components/AlertaDoh";
import DatosCompra from "../components/DatosCompra";
import Dialogo from "../components/Dialogo";
import TablaProductosCompra from "../components/TablaProductosCompra";
import useEstilos from "../hooks/useEstilos";
import { obtenerOrden } from "../services/adminData";
import { formatoPrecio } from "../utils/formato";
import estiloHome from "../styles/style-home.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloExtra];

function PagoError() {
  useEstilos(estilos);

  const { id } = useParams();
  const navigate = useNavigate();
  const [orden] = useState(() => obtenerOrden(id));

  if (!orden || orden.estado === "Pagada") {
    return (
      <main className="kb-pagina">
        <div className="kb-vacio">
          <p>No encontramos esa compra.</p>
          <Link to="/menu" className="kb-boton-rojo">
            Ir al menú
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="kb-pagina">
      <section className="kb-panel">
        <div className="kb-panel-cabecera">
          <h1 className="kb-estado error">
            <i className="ti ti-circle-x"></i> No se pudo realizar el pago. nro
            #{orden.numero}
          </h1>
        </div>
        <p className="kb-panel-subtitulo">
          Detalle de la compra. Tu carrito sigue guardado: puedes intentarlo de
          nuevo.
        </p>

        <AlertaDoh>
          Tu pago fue rechazado. Revisa tus datos e inténtalo otra vez.
        </AlertaDoh>
        <Dialogo
          quien="tony"
          frase="¡Tu pago no pasó, amigo! Tony no perdona las deudas... pero te deja intentarlo de nuevo."
          tam="lg"
        />

        <div className="kb-acciones">
          <button
            type="button"
            className="kb-boton-rojo"
            onClick={() => navigate("/checkout", { state: { orden } })}
          >
            Volver a realizar el pago
          </button>
        </div>

        <DatosCompra orden={orden} />
        <TablaProductosCompra lineas={orden.lineas} />

        <div className="kb-checkout-total">
          <span>Total a pagar</span>
          <strong>{formatoPrecio(orden.totales.total)}</strong>
        </div>
      </section>
    </main>
  );
}

export default PagoError;
