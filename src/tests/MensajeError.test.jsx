import { render, screen } from "@testing-library/react";
import MensajeError from "../components/MensajeError";

describe("MensajeError (renderizado condicional)", () => {
  it("muestra el texto cuando hay un error", () => {
    render(<MensajeError texto="El RUN es obligatorio." />);

    expect(screen.getByText("El RUN es obligatorio.")).toBeTruthy();
  });

  it("no muestra nada cuando no hay error", () => {
    const { container } = render(<MensajeError texto="" />);

    expect(container.firstChild).toBeNull();
  });
});
