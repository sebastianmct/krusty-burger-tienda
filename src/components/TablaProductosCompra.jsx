import { formatoPrecio } from "../utils/formato";

function TablaProductosCompra({ lineas }) {
  return (
    <div className="table-responsive">
      <table className="kb-tabla">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th className="derecha">Precio</th>
            <th className="derecha">Cantidad</th>
            <th className="derecha">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((linea) => (
            <tr key={linea.id}>
              <td>
                <img src={linea.imagen} alt="" />
              </td>
              <td>{linea.nombre}</td>
              <td className="derecha">{formatoPrecio(linea.precio)}</td>
              <td className="derecha">{linea.cantidad}</td>
              <td className="derecha">
                {formatoPrecio(linea.precio * linea.cantidad)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaProductosCompra;
