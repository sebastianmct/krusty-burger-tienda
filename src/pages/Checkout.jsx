import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MensajeError from "../components/MensajeError";
import TablaProductosCompra from "../components/TablaProductosCompra";
import useEstilos from "../hooks/useEstilos";
import useFormulario from "../hooks/useFormulario";
import { useCarrito } from "../context/CarritoContext";
import { buscarProducto, precioFinal } from "../data/productos";
import { comunasPorRegion } from "../data/regiones";
import { crearOrden, obtenerUsuario } from "../services/adminData";
import { obtenerSesion } from "../services/auth";
import { calcularTotales } from "../utils/carrito";
import { formatoPrecio } from "../utils/formato";
import { validarCheckout } from "../utils/validaciones";
import estiloHome from "../styles/style-home.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloExtra];

// Datos con los que parte el formulario:
//  - si venimos de un pago rechazado, los datos de esa compra
//  - si el cliente inició sesión, sus datos de usuario
//  - si no, el formulario vacío
function datosIniciales(ordenPrevia) {
  const base = { departamento: "", indicaciones: "", resultadoPago: "aprobado" };

  if (ordenPrevia) {
    return { ...base, ...ordenPrevia.cliente, ...ordenPrevia.entrega };
  }

  const sesion = obtenerSesion();
  const usuario = sesion ? obtenerUsuario(sesion.id) : null;
  return {
    ...base,
    nombre: usuario ? usuario.nombre : "",
    apellidos: usuario ? usuario.apellidos : "",
    correo: usuario ? usuario.correo : "",
    calle: usuario ? usuario.direccion || "" : "",
    region: usuario ? usuario.region || "" : "",
    comuna: usuario ? usuario.comuna || "" : "",
  };
}

function Checkout() {
  useEstilos(estilos);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { items, vaciar } = useCarrito();

  // Productos del carrito con su precio final (con descuento si corresponde)
  const lineas = items
    .map((item) => ({ item, producto: buscarProducto(item.id) }))
    .filter((linea) => linea.producto)
    .map(({ item, producto }) => ({
      id: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: precioFinal(producto),
      cantidad: item.cantidad,
    }));
  const totales = calcularTotales(lineas);

  const [inicial] = useState(() => datosIniciales(state?.orden));
  const { valores, errorDe, cambiar, cambiarValor, salirDelCampo, enviar } = useFormulario(inicial, validarCheckout);

  const comunas = comunasPorRegion[valores.region] || [];

  function cambiarRegion(evento) {
    cambiar(evento);
    cambiarValor("comuna", "");
  }

  // Simula el pago: guarda la orden y lleva a la pantalla de pago correcto o con error
  function pagar(datos) {
    const aprobado = datos.resultadoPago === "aprobado";
    const sesion = obtenerSesion();

    const orden = crearOrden({
      usuarioId: sesion ? sesion.id : null,
      cliente: { nombre: datos.nombre.trim(), apellidos: datos.apellidos.trim(), correo: datos.correo.trim() },
      entrega: {
        calle: datos.calle.trim(),
        departamento: datos.departamento.trim(),
        region: datos.region,
        comuna: datos.comuna,
        indicaciones: datos.indicaciones.trim(),
      },
      lineas,
      totales,
      estado: aprobado ? "Pagada" : "Pago rechazado",
    });

    if (aprobado) {
      vaciar(); // la compra se hizo: el carrito queda vacío
      navigate("/compra/exitosa/" + orden.id);
    } else {
      navigate("/compra/error/" + orden.id);
    }
  }

  if (lineas.length === 0) {
    return (
      <main className="kb-pagina">
        <div className="kb-vacio">
          <p>Tu carrito está vacío. Agrega algo del menú para poder pagar.</p>
          <Link to="/menu" className="kb-boton-rojo">
            Ir al menú
          </Link>
        </div>
      </main>
    );
  }

  // Campo de texto del formulario (para no repetir el mismo bloque muchas veces)
  function campo(nombre, etiqueta, opciones = {}) {
    return (
      <>
        <label className="kb-checkout-label" htmlFor={nombre}>
          {etiqueta}
          {opciones.obligatorio && " *"}
        </label>
        <input
          type={opciones.tipo || "text"}
          id={nombre}
          name={nombre}
          maxLength="100"
          placeholder={opciones.placeholder}
          className="kb-checkout-input"
          value={valores[nombre]}
          onChange={cambiar}
          onBlur={salirDelCampo}
          aria-invalid={Boolean(errorDe(nombre))}
        />
        <MensajeError texto={errorDe(nombre)} />
      </>
    );
  }

  return (
    <main className="kb-pagina">
      <form className="kb-panel" noValidate onSubmit={(evento) => enviar(evento, pagar)}>
        <div className="kb-panel-cabecera">
          <div>
            <h1>Carrito de compra</h1>
            <p className="kb-panel-subtitulo mb-0">Completa la siguiente información</p>
          </div>
          <div className="kb-total-badge">Total a pagar: {formatoPrecio(totales.total)}</div>
        </div>

        <TablaProductosCompra lineas={lineas} />

        <h2>Información del cliente</h2>
        <p className="kb-panel-subtitulo">Si iniciaste sesión, tus datos se completan solos.</p>
        <div className="row g-3">
          <div className="col-md-4">{campo("nombre", "Nombre", { obligatorio: true })}</div>
          <div className="col-md-4">{campo("apellidos", "Apellidos", { obligatorio: true })}</div>
          <div className="col-md-4">{campo("correo", "Correo", { obligatorio: true, tipo: "email" })}</div>
        </div>

        <h2>Dirección de entrega de los productos</h2>
        <p className="kb-panel-subtitulo">Ingresa la dirección de forma detallada.</p>
        <div className="row g-3">
          <div className="col-md-8">{campo("calle", "Calle", { obligatorio: true })}</div>
          <div className="col-md-4">{campo("departamento", "Departamento (opcional)", { placeholder: "Ej: 603" })}</div>
          <div className="col-md-6">
            <label className="kb-checkout-label" htmlFor="region">
              Región *
            </label>
            <select
              id="region"
              name="region"
              className="kb-checkout-input"
              value={valores.region}
              onChange={cambiarRegion}
              onBlur={salirDelCampo}
              aria-invalid={Boolean(errorDe("region"))}
            >
              <option value="">Selecciona una región</option>
              {Object.keys(comunasPorRegion).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <MensajeError texto={errorDe("region")} />
          </div>
          <div className="col-md-6">
            <label className="kb-checkout-label" htmlFor="comuna">
              Comuna *
            </label>
            <select
              id="comuna"
              name="comuna"
              className="kb-checkout-input"
              disabled={comunas.length === 0}
              value={valores.comuna}
              onChange={cambiar}
              onBlur={salirDelCampo}
              aria-invalid={Boolean(errorDe("comuna"))}
            >
              <option value="">
                {comunas.length === 0 ? "Primero selecciona una región" : "Selecciona una comuna"}
              </option>
              {comunas.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>
            <MensajeError texto={errorDe("comuna")} />
          </div>
          <div className="col-12">
            <label className="kb-checkout-label" htmlFor="indicaciones">
              Indicaciones para la entrega (opcional)
            </label>
            <textarea
              id="indicaciones"
              name="indicaciones"
              rows="2"
              maxLength="300"
              placeholder="Ej: Entre calles, color del edificio, no tiene timbre."
              className="kb-checkout-input"
              value={valores.indicaciones}
              onChange={cambiar}
            ></textarea>
          </div>
        </div>

        <div className="kb-simulador">
          <label className="kb-checkout-label" htmlFor="resultadoPago">
            Simulador de pago (solo para demostración)
          </label>
          <select
            id="resultadoPago"
            name="resultadoPago"
            className="kb-checkout-input"
            value={valores.resultadoPago}
            onChange={cambiar}
          >
            <option value="aprobado">El pago es aprobado</option>
            <option value="rechazado">El pago es rechazado</option>
          </select>
        </div>

        <div className="kb-acciones">
          <Link to="/carrito" className="kb-boton-claro">
            Volver al carrito
          </Link>
          <button type="submit" className="kb-boton-rojo">
            Pagar ahora {formatoPrecio(totales.total)}
          </button>
        </div>
      </form>
    </main>
  );
}

export default Checkout;
