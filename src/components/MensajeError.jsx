function MensajeError({ texto }) {
  if (!texto) return null;
  return (
    <p className="campo-error" role="alert">
      {texto}
    </p>
  );
}

export default MensajeError;
