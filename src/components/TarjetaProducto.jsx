import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { precioFinal } from "../data/productos";
import { formatoPrecio } from "../utils/formato";

// Tarjeta de un producto. Se usa en el inicio (variante "inicio") y en el menú (variante "menu").
//   producto -> objeto del producto
//   variante -> "inicio" o "menu" (cambia el diseño de la tarjeta)
function TarjetaProducto({ producto, variante }) {
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);
  const esInicio = variante === "inicio";
  const enOferta = producto.descuento > 0;
  // Si está en oferta se muestra el precio normal tachado y el precio con descuento
  const precio = (
    <>
      {enOferta && <span className="precio-anterior">{formatoPrecio(producto.precio)}</span>}
      {formatoPrecio(precioFinal(producto))}
    </>
  );

  function agregarAlCarrito() {
    agregar(producto.id);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 900); // el texto "Agregado" dura menos de 1 segundo
  }

  let textoBoton;
  if (agregado) textoBoton = "Agregado";
  else if (esInicio) textoBoton = "AGREGAR";
  else
    textoBoton = (
      <>
        Agregar al carrito <i className="ti ti-shopping-cart" aria-hidden="true"></i>
      </>
    );

  return (
    <article className={(esInicio ? "tarjeta " : "producto-menu ") + producto.tema}>
      {enOferta && <span className="etiqueta-oferta">-{producto.descuento}%</span>}
      <Link className="enlace-producto" to={"/producto/" + encodeURIComponent(producto.id)}>
        <img src={producto.imagen} alt={producto.alt} />
        {esInicio ? (
          <>
            <p className="tipo">{producto.categoriaLabel}</p>
            <h3>{producto.nombre}</h3>
            <span className="precio">{precio}</span>
          </>
        ) : (
          <>
            <p className="producto-categoria">{producto.categoriaLabel}</p>
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <strong>{precio}</strong>
          </>
        )}
      </Link>

      <button className="boton-producto" type="button" onClick={agregarAlCarrito}>
        {textoBoton}
      </button>
    </article>
  );
}

export default TarjetaProducto;
