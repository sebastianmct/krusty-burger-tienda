import { screen, fireEvent } from "@testing-library/react";
import AvisoHibbert from "../components/AvisoHibbert";
import { FRASE_HIBBERT } from "../data/frases";
import { renderConTienda } from "./ayudas";

function carritoCon(items) {
  localStorage.setItem("krustyBurgerCart", JSON.stringify(items));
}

describe("Aviso del Dr. Hibbert", () => {
  it("con 3 hamburguesas pesadas no aparece", () => {
    carritoCon([{ id: "the-clogger", cantidad: 3 }]);
    renderConTienda(<AvisoHibbert />);

    expect(screen.queryByText(FRASE_HIBBERT)).toBeNull();
  });

  it("con más de 3 hamburguesas pesadas aparece con su frase", () => {
    carritoCon([
      { id: "the-clogger", cantidad: 2 },
      { id: "double-krusty-burger", cantidad: 2 },
    ]);
    renderConTienda(<AvisoHibbert />);

    expect(screen.getByText(FRASE_HIBBERT)).toBeTruthy();
  });

  it("las hamburguesas livianas no cuentan", () => {
    carritoCon([{ id: "krusty-burger", cantidad: 10 }]);
    renderConTienda(<AvisoHibbert />);

    expect(screen.queryByText(FRASE_HIBBERT)).toBeNull();
  });

  it("se puede cerrar", () => {
    carritoCon([{ id: "the-clogger", cantidad: 4 }]);
    renderConTienda(<AvisoHibbert />);

    fireEvent.click(screen.getByLabelText("Cerrar aviso"));

    expect(screen.queryByText(FRASE_HIBBERT)).toBeNull();
  });
});
