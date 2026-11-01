import { screen, fireEvent } from "@testing-library/react";
import ChatAyuda from "../components/ChatAyuda";
import { SALUDOS_RAFA } from "../data/frases";
import { renderConTienda } from "./ayudas";

describe("Chat de ayuda (Rafa)", () => {
  it("al inicio solo se ve el botón de ayuda", () => {
    renderConTienda(<ChatAyuda />);

    expect(screen.getByLabelText("Abrir chat de ayuda")).toBeTruthy();
    expect(screen.queryByLabelText("Chat de ayuda")).toBeNull();
  });

  it("al abrirlo Rafa saluda con una de sus dos frases", () => {
    renderConTienda(<ChatAyuda />);

    fireEvent.click(screen.getByLabelText("Abrir chat de ayuda"));

    const chat = screen.getByLabelText("Chat de ayuda");
    expect(
      SALUDOS_RAFA.some((saludo) => chat.textContent.includes(saludo)),
    ).toBe(true);
  });

  it("al elegir una pregunta Rafa responde con un enlace", () => {
    renderConTienda(<ChatAyuda />);
    fireEvent.click(screen.getByLabelText("Abrir chat de ayuda"));

    fireEvent.click(screen.getByRole("button", { name: "¿Hay ofertas?" }));

    expect(screen.getByText(/hasta 30% de descuento/)).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Ver ofertas" }).getAttribute("href"),
    ).toBe("/ofertas");
  });

  it("entiende una pregunta escrita con palabras clave", () => {
    renderConTienda(<ChatAyuda />);
    fireEvent.click(screen.getByLabelText("Abrir chat de ayuda"));

    fireEvent.change(screen.getByLabelText("Escribe tu pregunta"), {
      target: { value: "cuánto demora el despacho" },
    });
    fireEvent.click(screen.getByLabelText("Enviar pregunta"));

    expect(screen.getByText(/Otto maneja el bus/)).toBeTruthy();
  });

  it("si no entiende la pregunta lo dice", () => {
    renderConTienda(<ChatAyuda />);
    fireEvent.click(screen.getByLabelText("Abrir chat de ayuda"));

    fireEvent.change(screen.getByLabelText("Escribe tu pregunta"), {
      target: { value: "xyz" },
    });
    fireEvent.click(screen.getByLabelText("Enviar pregunta"));

    expect(screen.getByText(/No entendí/)).toBeTruthy();
  });

  it("se puede cerrar", () => {
    renderConTienda(<ChatAyuda />);
    fireEvent.click(screen.getByLabelText("Abrir chat de ayuda"));

    fireEvent.click(screen.getByLabelText("Cerrar chat de ayuda"));

    expect(screen.queryByLabelText("Chat de ayuda")).toBeNull();
  });
});
