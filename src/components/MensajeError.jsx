// Muestra el mensaje de error debajo de un campo (no muestra nada si no hay error)
function MensajeError({ texto }) {
  if (!texto) return null;
  return (
    <p className="campo-error" role="alert">
      {texto}
    </p>
  );
}

export default MensajeError;
