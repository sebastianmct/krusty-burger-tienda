function LogoKrusty({ className = "" }) {
  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}assets/logotipo-krusty-burger.png`}
      alt="Krusty Burger"
    />
  );
}

export default LogoKrusty;
