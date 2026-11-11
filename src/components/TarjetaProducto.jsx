import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import BotonCarrito from "./BotonCarrito";
import Personaje from "./Personaje";
import { inclinarImagen, reponerImagen } from "../animaciones/efectos";
import { precioFinal } from "../data/productos";
import { formatoPrecio } from "../utils/formato";

function TarjetaProducto({ producto, variante, sticker }) {
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);
  const esInicio = variante === "inicio";
  const enOferta = producto.descuento > 0;

  const precio = (
    <>
      {enOferta && (
        <span className="precio-anterior">
          {formatoPrecio(producto.precio)}
        </span>
      )}
      {formatoPrecio(precioFinal(producto))}
    </>
  );

  function agregarAlCarrito() {
    agregar(producto.id);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 900);
  }

  let textoBoton;
  if (agregado) textoBoton = "Agregado";
  else if (esInicio) textoBoton = "AGREGAR";
  else
    textoBoton = (
      <>
        Agregar al carrito{" "}
        <i className="ti ti-shopping-cart" aria-hidden="true"></i>
      </>
    );

  return (
    <article
      className={(esInicio ? "tarjeta " : "producto-menu ") + producto.tema}
      onPointerMove={inclinarImagen}
      onPointerLeave={reponerImagen}
    >
      {sticker && (
        <span className="kb-sticker">
          <Personaje quien={sticker.quien} tam="md" />
        </span>
      )}
      {enOferta && (
        <span className="etiqueta-oferta">-{producto.descuento}%</span>
      )}
      <Link
        className="enlace-producto"
        to={"/producto/" + encodeURIComponent(producto.id)}
      >
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

      {sticker && <p className="kb-sticker-frase">{sticker.frase}</p>}

      <BotonCarrito
        className="boton-producto"
        type="button"
        data-uisfx="add-to-cart"
        onClick={agregarAlCarrito}
      >
        {textoBoton}
      </BotonCarrito>
    </article>
  );
}

export default TarjetaProducto;
