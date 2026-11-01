import { useState } from "react";

function GaleriaProducto({ producto }) {
  const [fotoActiva, setFotoActiva] = useState(0);
  const galeriaId = "galeria-" + producto.id;

  return (
    <div className="galeria" aria-label={"Galería de " + producto.nombre}>
      {producto.imagenes.map((imagen, indice) => (
        <input
          key={indice}
          type="radio"
          name={galeriaId}
          id={galeriaId + "-" + (indice + 1)}
          checked={fotoActiva === indice}
          onChange={() => setFotoActiva(indice)}
        />
      ))}

      <div className="visor">
        {producto.imagenes.map((imagen, indice) => (
          <img
            key={indice}
            className={"foto-" + (indice + 1)}
            src={imagen}
            alt={producto.alt + ", vista " + (indice + 1)}
          />
        ))}
      </div>

      <div className="miniaturas">
        {producto.imagenes.map((imagen, indice) => (
          <label key={indice} htmlFor={galeriaId + "-" + (indice + 1)}>
            <img
              src={imagen}
              alt={"Ver " + producto.alt + ", vista " + (indice + 1)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default GaleriaProducto;
