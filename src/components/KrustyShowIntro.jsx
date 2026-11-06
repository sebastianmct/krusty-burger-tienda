import { useEffect, useState } from "react";
import "../styles/style-krusty-show-intro.css";

function KrustyShowIntro() {
  const [visible, setVisible] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [desplazando, setDesplazando] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;

    const inicio = window.setTimeout(() => setDesplazando(true), 650);
    const fin = window.setTimeout(() => setVisible(false), 1800);

    return () => {
      window.clearTimeout(inicio);
      window.clearTimeout(fin);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={
        "kb-krusty-show-intro" +
        (desplazando ? " kb-krusty-show-intro-activa" : "")
      }
      aria-hidden="true"
    >
      <img src="assets/krusty-show.png" alt="" />
    </div>
  );
}

export default KrustyShowIntro;
