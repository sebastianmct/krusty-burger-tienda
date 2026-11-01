import { obtenerPersonaje, enviarQueja } from "../services/api";

describe("obtenerPersonaje() - GET", () => {
  it("pide el personaje a The Simpsons API y devuelve sus datos", async () => {
    const fetchFalso = window.fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: async () => ({ id: 1, name: "Homer Simpson" }),
      }),
    );

    const personaje = await obtenerPersonaje(1);

    expect(fetchFalso).toHaveBeenCalledWith(
      "https://thesimpsonsapi.com/api/characters/1",
    );
    expect(personaje.name).toBe("Homer Simpson");
  });

  it("lanza un error si la API responde con error", async () => {
    window.fetch.and.returnValue(Promise.resolve({ ok: false }));

    await expectAsync(obtenerPersonaje(1)).toBeRejectedWithError(
      "No se pudo cargar el personaje",
    );
  });
});

describe("enviarQueja() - POST", () => {
  it("envía la queja con el método POST y devuelve el id", async () => {
    const fetchFalso = window.fetch.and.returnValue(
      Promise.resolve({ ok: true, json: async () => ({ id: 101 }) }),
    );

    const respuesta = await enviarQueja({
      title: "Homero",
      body: "Hamburguesa cruda",
    });

    expect(fetchFalso.calls.mostRecent().args[1].method).toBe("POST");
    expect(respuesta.id).toBe(101);
  });
});
