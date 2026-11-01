import { render, screen, fireEvent } from "@testing-library/react";
import Personaje from "../components/Personaje";
import Dialogo from "../components/Dialogo";
import AlertaDoh from "../components/AlertaDoh";

describe("Personaje (foto con respaldo)", () => {
  it("un personaje con id de la API muestra su foto de The Simpsons API", () => {
    render(<Personaje quien="homero" />);

    expect(screen.getByAltText("Homero Simpson").getAttribute("src")).toContain(
      "/character/1.webp",
    );
  });

  it("si la foto de la API no carga usa la foto local", () => {
    render(<Personaje quien="homero" />);

    fireEvent.error(screen.getByAltText("Homero Simpson"));

    expect(screen.getByAltText("Homero Simpson").getAttribute("src")).toBe(
      "assets/homero-simpson.jpg",
    );
  });

  it("si no hay foto ni internet muestra una insignia con las iniciales", async () => {
    render(<Personaje quien="wiggum" />);

    const insignia = await screen.findByText("JG");
    expect(insignia.getAttribute("role")).toBe("img");
  });

  it("encuentra por nombre a un personaje que no tiene id (Jefe Gorgory)", async () => {
    window.fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: async () => ({ results: [{ id: 21, name: "Clancy Wiggum" }] }),
      }),
    );

    render(<Personaje quien="wiggum" />);

    const foto = await screen.findByAltText("Jefe Gorgory");
    expect(foto.getAttribute("src")).toContain("/character/21.webp");
  });
});

describe("Dialogo", () => {
  it("muestra el nombre del personaje y su frase", () => {
    render(<Dialogo quien="krusty" frase="¡Hey, hey!" />);

    expect(screen.getByText("Krusty el Payaso")).toBeTruthy();
    expect(screen.getByText("¡Hey, hey!")).toBeTruthy();
  });
});

describe("AlertaDoh", () => {
  it("muestra el ¡D'OH! junto al mensaje de error", () => {
    render(<AlertaDoh>Algo salió mal</AlertaDoh>);

    const alerta = screen.getByRole("alert");
    expect(alerta.textContent).toContain("¡D'OH!");
    expect(screen.getByText("Algo salió mal")).toBeTruthy();
  });
});
