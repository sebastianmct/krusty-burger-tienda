function AlertaDoh({ children, className = "" }) {
  return (
    <div className={"kb-doh " + className} role="alert">
      <span className="kb-doh-grito">¡D'OH!</span>
      <div className="kb-doh-texto">{children}</div>
    </div>
  );
}

export default AlertaDoh;
