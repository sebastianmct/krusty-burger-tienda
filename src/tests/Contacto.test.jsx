import { screen, fireEvent } from "@testing-library/react";
import Contacto from "../pages/Contacto";
import { renderConTienda } from "./ayudas";

// Respuestas falsas de la API (así no se envía nada a internet)
const respuestaOk = Promise.resolve({ ok: true, json: async () => ({ id: 101 }) });
const respuestaError = () => Promise.reject(new Error("falló"));

// Escribe en los campos del formulario como lo haría un usuario
function llenarFormulario() {
  fireEvent.change(screen.getByLabelText("NOMBRE COMPLETO"), { target: { value: "Homero Simpson" } });
  fireEvent.change(screen.getByLabelText(/¿QUE HIZO KRUSTY/), { target: { value: "La hamburguesa estaba cruda" } });
}

describe("Formulario de contacto", () => {
  it("al escribir en el nombre cambia el valor del campo (estado)", () => {
    renderConTienda(<Contacto />);

    fireEvent.change(screen.getByLabelText("NOMBRE COMPLETO"), { target: { value: "Homero" } });

    expect(screen.getByLabelText("NOMBRE COMPLETO").value).toBe("Homero");
  });

  it("si se envía vacío muestra los errores y no llama a la API", () => {
    const fetchFalso = spyOn(window, "fetch");
    renderConTienda(<Contacto />);

    fireEvent.click(screen.getByRole("button", { name: /Enviar queja/ }));

    expect(screen.getByText("El nombre es obligatorio.")).toBeTruthy();
    expect(screen.getByText("El comentario es obligatorio.")).toBeTruthy();
    expect(fetchFalso).not.toHaveBeenCalled();
  });

  it("si los datos son válidos envía la queja y muestra el número", async () => {
    const fetchFalso = spyOn(window, "fetch").and.returnValue(respuestaOk); // la API falsa responde bien
    renderConTienda(<Contacto />);
    llenarFormulario();

    fireEvent.click(screen.getByRole("button", { name: /Enviar queja/ }));

    expect(await screen.findByText(/N° de queja: 101/)).toBeTruthy();
    expect(fetchFalso).toHaveBeenCalledTimes(1);
  });

  it("si la API falla muestra un mensaje de error", async () => {
    spyOn(window, "fetch").and.callFake(respuestaError); // la API falsa responde con error
    renderConTienda(<Contacto />);
    llenarFormulario();

    fireEvent.click(screen.getByRole("button", { name: /Enviar queja/ }));

    expect(await screen.findByText("No pudimos enviar tu mensaje. Intenta nuevamente.")).toBeTruthy();
  });
});
