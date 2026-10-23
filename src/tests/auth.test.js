import { registrar, iniciarSesion, obtenerSesion, cerrarSesion } from "../services/auth";

// Datos de un usuario de ejemplo
const datos = {
  run: "190110222",
  nombre: "Ned",
  apellidos: "Flanders",
  correo: "ned@gmail.com",
  password: "ab1!",
  region: "Metropolitana de Santiago",
  comuna: "Maipu",
  direccion: "Av. Siempreviva 742",
};

describe("registrar()", () => {
  it("crea una cuenta de Cliente con un correo normal", () => {
    const resultado = registrar(datos);

    expect(resultado.ok).toBe(true);
    expect(resultado.usuario.tipoUsuario).toBe("Cliente");
  });

  it("crea una cuenta de Administrador con un correo @duoc.cl", () => {
    const resultado = registrar({ ...datos, correo: "ned@duoc.cl" });

    expect(resultado.usuario.tipoUsuario).toBe("Administrador");
  });

  it("no permite registrar el mismo correo dos veces", () => {
    registrar(datos);
    const segundo = registrar(datos);

    expect(segundo.ok).toBe(false);
    expect(segundo.error).toBe("Ya existe una cuenta registrada con ese correo.");
  });
});

describe("iniciarSesion()", () => {
  it("con datos correctos guarda la sesión", () => {
    registrar(datos);

    const resultado = iniciarSesion("ned@gmail.com", "ab1!");

    expect(resultado.ok).toBe(true);
    expect(obtenerSesion().nombre).toBe("Ned");
  });

  it("con contraseña incorrecta no inicia sesión", () => {
    registrar(datos);

    const resultado = iniciarSesion("ned@gmail.com", "otra1!");

    expect(resultado.ok).toBe(false);
    expect(obtenerSesion()).toBeNull();
  });

  it("cerrarSesion() borra la sesión", () => {
    registrar(datos);
    iniciarSesion("ned@gmail.com", "ab1!");

    cerrarSesion();

    expect(obtenerSesion()).toBeNull();
  });
});
