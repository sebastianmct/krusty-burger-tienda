import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatosCompra from "../components/DatosCompra";
import TablaProductosCompra from "../components/TablaProductosCompra";
import useEstilos from "../hooks/useEstilos";
import { obtenerOrden } from "../services/adminData";
import { formatoPrecio } from "../utils/formato";
import estiloHome from "../styles/style-home.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloExtra];

// Pantalla que se muestra cuando el pago fue aprobado: /compra/exitosa/:id
function CompraExitosa() {
  useEstilos(estilos);

  const { id } = useParams();
  const [orden] = useState(() => obtenerOrden(id));
  const [emailEnviado, setEmailEnviado] = useState(false);

  if (!orden || orden.estado !== "Pagada") {
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
          <h1 className="kb-estado ok">
            <i className="ti ti-circle-check"></i> Se ha realizado la compra. nro #{orden.numero}
          </h1>
        </div>
        <p className="kb-panel-subtitulo">Código de orden: {orden.id}</p>

        <DatosCompra orden={orden} />
        <TablaProductosCompra lineas={orden.lineas} />

        <div className="kb-checkout-total">
          <span>Total pagado</span>
          <strong>{formatoPrecio(orden.totales.total)}</strong>
        </div>

        <div className="kb-acciones">
          <button type="button" className="kb-boton-rojo" onClick={() => window.print()}>
            Imprimir boleta en PDF
          </button>
          <button type="button" className="kb-boton-claro" onClick={() => setEmailEnviado(true)}>
            Enviar boleta por email
          </button>
          <Link to="/menu" className="kb-boton-claro">
            Seguir comprando
          </Link>
        </div>
        {emailEnviado && <p className="kb-aviso-ok">Te enviamos la boleta a {orden.cliente.correo}.</p>}
      </section>
    </main>
  );
}

export default CompraExitosa;
