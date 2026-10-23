import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import GaleriaProducto from "../components/GaleriaProducto";
import useEstilos from "../hooks/useEstilos";
import { useCarrito } from "../context/CarritoContext";
import { buscarProducto, precioFinal } from "../data/productos";
import { formatoPrecio } from "../utils/formato";
import estiloHome from "../styles/style-home.css?inline";
import estiloDetalle from "../styles/style-detalle-producto.css?inline";

const estilos = [estiloHome, estiloDetalle];

function DetalleProducto() {
  useEstilos(estilos);

  const { id } = useParams(); // el id viene en la URL: /producto/:id
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const producto = buscarProducto(id);

  function agregarAlCarrito() {
    agregar(producto.id);
    setAgregado(true);
  }

  return (
    <main className="detalle-pagina">
      <Link className="volver-menu" to="/menu">
        <i className="ti ti-arrow-left" aria-hidden="true"></i> Volver al menú
      </Link>

      {!producto ? (
        <section className="detalle-invalido">
          <h1>Producto no encontrado</h1>
          <p>No encontramos ese producto. Vuelve al menú para elegir otra opción.</p>
          <Link className="volver-menu" to="/menu">
            Ir al menú
          </Link>
        </section>
      ) : (
        <section className="detalle-producto detalle-predeterminado">
          <div className="detalle-media">
            <GaleriaProducto producto={producto} />
            <div className="comentario personaje-millhouse">
              <img src="assets/millhouse.jpg" alt="Millhouse" />
              <p>“{producto.millhouse}”</p>
            </div>
          </div>

          <div className="detalle-info">
            <p className="detalle-categoria">{producto.categoriaLabel}</p>
            <h1>{producto.nombre}</h1>
            <p className="detalle-descripcion">{producto.descripcion}</p>
            <strong className="detalle-precio">
              {producto.descuento > 0 && <span className="precio-anterior">{formatoPrecio(producto.precio)}</span>}
              {formatoPrecio(precioFinal(producto))}
              {producto.descuento > 0 && (
                <span className="etiqueta-oferta etiqueta-oferta-inline">-{producto.descuento}%</span>
              )}
            </strong>
            <p className="detalle-nota">{producto.nota}</p>
            <button className="boton-carrito" type="button" onClick={agregarAlCarrito}>
              {agregado ? (
                "Agregado al carrito"
              ) : (
                <>
                  Agregar al carrito <i className="ti ti-shopping-cart" aria-hidden="true"></i>
                </>
              )}
            </button>
            <div className="comentario personaje-burns">
              <img src="assets/burns.jpg" alt="Señor Burns" />
              <p>“{producto.burns}”</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default DetalleProducto;
