import { cleanup } from "@testing-library/react";
import { reiniciarCachePersonajes } from "../services/personajesApi";

beforeEach(() => {
  spyOn(window, "fetch").and.callFake(() =>
    Promise.reject(new Error("sin internet en las pruebas")),
  );
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
  reiniciarCachePersonajes();
});
