import { screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import { registrar } from "../services/auth";
import { renderConTienda } from "./ayudas";

// Escribe en un campo del formulario como lo haría un usuario
function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

describe("Página Login", () => {
  it("si se envía vacío muestra los errores de correo y contraseña", () => {
    renderConTienda(<Login />);

    fireEvent.click(screen.getByRole("button", { name: "ENTRAR A COMER" }));

    expect(screen.getByText("El correo es obligatorio.")).toBeTruthy();
    expect(screen.getByText("La contraseña es obligatoria.")).toBeTruthy();
  });

  it("con una cuenta que no existe muestra 'Correo o contraseña incorrectos.'", () => {
    renderConTienda(<Login />);
    escribir("EMAIL", "nadie@gmail.com");
    escribir("CONTRASEÑA", "ab1!");

    fireEvent.click(screen.getByRole("button", { name: "ENTRAR A COMER" }));

    expect(screen.getByText("Correo o contraseña incorrectos.")).toBeTruthy();
  });

  it("con una cuenta registrada muestra el mensaje de bienvenida", () => {
    registrar({
      run: "190110222",
      nombre: "Ned",
      apellidos: "Flanders",
      correo: "ned@gmail.com",
      password: "ab1!",
      region: "Metropolitana de Santiago",
      comuna: "Maipu",
      direccion: "Calle 1",
    });
    renderConTienda(<Login />);
    escribir("EMAIL", "ned@gmail.com");
    escribir("CONTRASEÑA", "ab1!");

    fireEvent.click(screen.getByRole("button", { name: "ENTRAR A COMER" }));

    expect(screen.getByText("Bienvenido, Ned!")).toBeTruthy();
  });
});
