import { screen, fireEvent } from "@testing-library/react";
import Registro from "../pages/Registro";
import Inicio from "../pages/Inicio";
import { renderConTienda } from "./ayudas";

describe("Página Registro (policía de Springfield)", () => {
  it("muestra a los policías junto al formulario de registro", () => {
    renderConTienda(<Registro />);

    expect(screen.getByAltText(/Policías de Springfield/)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /El jefe Gorgory no tiene tiempo para perseguirte.*¡Regístrate!/i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 2, name: "Crea tu cuenta" }),
    ).toBeTruthy();
  });

  it("si se envía vacío muestra el aviso D'oh!", () => {
    renderConTienda(<Registro />);

    fireEvent.click(screen.getByRole("button", { name: "¡Registrarme!" }));

    expect(
      screen.getByText("Revisa los campos marcados en rojo."),
    ).toBeTruthy();
    expect(screen.getByText("El RUN es obligatorio.")).toBeTruthy();
  });
});

describe("Página Inicio (más personajes)", () => {
  it("muestra a los vecinos de Springfield opinando", () => {
    renderConTienda(<Inicio />);

    expect(screen.getByText("¡Gracias, vuelva pronto!")).toBeTruthy();
    expect(screen.getByText("Mmm... hamburguesa. Ahhhh.")).toBeTruthy();
  });

  it("incluye el botón de la categoría Combos", () => {
    renderConTienda(<Inicio />);

    fireEvent.click(screen.getByRole("button", { name: /Combos/ }));

    expect(screen.getByText("Combo Tradicional Krusty")).toBeTruthy();
  });
});
