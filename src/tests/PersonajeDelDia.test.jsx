import { render, screen } from "@testing-library/react";
import PersonajeDelDia from "../components/PersonajeDelDia";

describe("PersonajeDelDia (datos desde una API)", () => {
  it("mientras llegan los datos muestra 'Cargando...'", () => {
    window.fetch.and.returnValue(new Promise(() => {}));

    render(<PersonajeDelDia id={1} />);

    expect(screen.getByText("Cargando...")).toBeTruthy();
  });

  it("cuando llegan los datos muestra el nombre, la ocupación y una frase", async () => {
    window.fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: async () => ({
          name: "Homer Simpson",
          occupation: "Safety Inspector",
          phrases: ["Doh!"],
        }),
      }),
    );

    render(<PersonajeDelDia id={1} />);

    expect(await screen.findByText("Homer Simpson")).toBeTruthy();
    expect(screen.getByText("Safety Inspector")).toBeTruthy();
    expect(screen.getByText("“Doh!”")).toBeTruthy();
  });

  it("si la API falla muestra un mensaje de error", async () => {
    window.fetch.and.returnValue(Promise.reject(new Error("sin internet")));

    render(<PersonajeDelDia id={1} />);

    expect(
      await screen.findByText(/No pudimos contactar a Springfield/),
    ).toBeTruthy();
  });

  it("por defecto muestra a Apu con su foto de la API", async () => {
    window.fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: async () => ({
          id: 17,
          name: "Apu Nahasapeemapetilon",
          occupation: "Tendero",
          portrait_path: "/character/17.webp",
          phrases: ["¡Gracias, vuelva pronto!"],
        }),
      }),
    );

    render(<PersonajeDelDia />);

    expect(await screen.findByText("Apu Nahasapeemapetilon")).toBeTruthy();
    expect(window.fetch).toHaveBeenCalledWith(
      "https://thesimpsonsapi.com/api/characters/17",
    );
    expect(
      screen.getByAltText("Apu Nahasapeemapetilon").getAttribute("src"),
    ).toBe("https://cdn.thesimpsonsapi.com/500/character/17.webp");
  });
});
