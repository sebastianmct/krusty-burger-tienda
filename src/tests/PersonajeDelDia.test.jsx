import { render, screen } from "@testing-library/react";
import PersonajeDelDia from "../components/PersonajeDelDia";

describe("PersonajeDelDia (datos desde una API)", () => {
  it("mientras llegan los datos muestra 'Cargando...'", () => {
    spyOn(window, "fetch").and.returnValue(new Promise(() => {})); // nunca responde

    render(<PersonajeDelDia id={1} />);

    expect(screen.getByText("Cargando...")).toBeTruthy();
  });

  it("cuando llegan los datos muestra el nombre, la ocupación y una frase", async () => {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        ok: true,
        json: async () => ({ name: "Homer Simpson", occupation: "Safety Inspector", phrases: ["Doh!"] }),
      }),
    );

    render(<PersonajeDelDia id={1} />);

    // findByText espera a que el texto aparezca (los datos llegan de forma asíncrona)
    expect(await screen.findByText("Homer Simpson")).toBeTruthy();
    expect(screen.getByText("Safety Inspector")).toBeTruthy();
    expect(screen.getByText("“Doh!”")).toBeTruthy();
  });

  it("si la API falla muestra un mensaje de error", async () => {
    spyOn(window, "fetch").and.returnValue(Promise.reject(new Error("sin internet")));

    render(<PersonajeDelDia id={1} />);

    expect(await screen.findByText(/No pudimos contactar a Springfield/)).toBeTruthy();
  });
});
