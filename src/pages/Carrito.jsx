import { Link } from "react-router-dom";
import useEstilos from "../hooks/useEstilos";
import { useCarrito } from "../context/CarritoContext";
import { buscarProducto, precioFinal } from "../data/productos";
import { calcularTotales } from "../utils/carrito";
import { formatoPrecio } from "../utils/formato";
import estiloHome from "../styles/style-home.css?inline";
import estiloCarrito from "../styles/style-carrito.css?inline";

const estilos = [estiloHome, estiloCarrito];

function Carrito() {
  useEstilos(estilos);

  const { items, actualizar, eliminar } = useCarrito();

  // Unimos cada item del carrito (id y cantidad) con los datos de su producto.
  // Si un producto ya no existe (lo eliminaron en el admin) no se muestra.
  const lineas = items
    .map((item) => ({ ...item, producto: buscarProducto(item.id) }))
    .filter((linea) => linea.producto);

  const totales = calcularTotales(
    lineas.map((linea) => ({ precio: precioFinal(linea.producto), cantidad: linea.cantidad })),
  );

  return (
    <main className="carrito px-3 py-5">
      <div className="row g-4 g-lg-5">
        <section className="col-lg-7 carrito-productos" aria-live="polite">
          <h1>Tu pedido</h1>
          <div className="linea-titulo"></div>
          <div id="lista-carrito">
            {lineas.length === 0 ? (
              <div className="carrito-vacio">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega una delicia desde el menú para comenzar tu pedido.</p>
                <Link to="/menu">Ver el menú</Link>
              </div>
            ) : (
              lineas.map(({ id, cantidad, producto }) => (
                <article className="producto" key={id}>
                  <img src={producto.imagen} alt={producto.alt} />
                  <div className="producto-info">
                    <h2>{producto.nombre}</h2>
                    <p>{producto.descripcion}</p>
                    <div className="cantidad">
                      <button
                        type="button"
                        className="cantidad-control"
                        aria-label={"Disminuir cantidad de " + producto.nombre}
                        onClick={() => actualizar(id, cantidad - 1)}
                      >
                        −
                      </button>
                      <span>{cantidad}</span>
                      <button
                        type="button"
                        className="cantidad-control"
                        aria-label={"Aumentar cantidad de " + producto.nombre}
                        onClick={() => actualizar(id, cantidad + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="eliminar" type="button" onClick={() => eliminar(id)}>
                      Eliminar
                    </button>
                  </div>
                  <strong className="producto-precio">{formatoPrecio(precioFinal(producto) * cantidad)}</strong>
                </article>
              ))
            )}
          </div>
        </section>

        <aside className="col-lg-5 carrito-lateral">
          <div className="frase">“La mejor burger de la historia... me llevaré tres.”</div>
          <div className="krusty-imagen">
            <img src="assets/krusty-payaso1.jpg" alt="Krusty sosteniendo una hamburguesa" />
          </div>
          <div className="resumen">
            <h2>Resumen del pedido</h2>
            <p>
              <span>Subtotal</span>
              <strong id="subtotal-carrito">{formatoPrecio(totales.subtotal)}</strong>
            </p>
            <p>
              <span>Impuestos</span>
              <strong id="impuestos-carrito">{formatoPrecio(totales.impuestos)}</strong>
            </p>
            <p>
              <span>Despacho</span>
              <strong id="despacho-carrito">{formatoPrecio(totales.despacho)}</strong>
            </p>
            <div className="total">
              <span>Total</span>
              <strong id="total-carrito">{formatoPrecio(totales.total)}</strong>
            </div>
            <Link to={lineas.length > 0 ? "/checkout" : "/menu"}>Continuar con el pago</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Carrito;
