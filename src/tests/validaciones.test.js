import {
  runValido,
  validarCorreo,
  validarPassword,
  validarLogin,
  validarRegistro,
  validarContacto,
  validarProducto,
  validarUsuario,
  validarCheckout,
  validarCategoria,
} from "../utils/validaciones";

describe("runValido()", () => {
  it("acepta un RUN con dígito verificador correcto", () => {
    expect(runValido("190110222")).toBe(true);
  });

  it("rechaza un RUN con dígito verificador incorrecto", () => {
    expect(runValido("19011022K")).toBe(false);
  });

  it("rechaza un RUN con puntos y guion", () => {
    expect(runValido("19.011.022-2")).toBe(false);
  });
});

describe("validarCorreo()", () => {
  it("devuelve un mensaje si el correo no tiene @", () => {
    expect(validarCorreo("homero.gmail.com")).toBe("Ingresa un correo válido.");
  });

  it("devuelve texto vacío si el correo es válido", () => {
    expect(validarCorreo("homero@gmail.com")).toBe("");
  });

  it("permite el correo vacío cuando no es obligatorio", () => {
    expect(validarCorreo("", false)).toBe("");
  });
});

describe("validarPassword()", () => {
  it("rechaza una contraseña sin números ni símbolos", () => {
    expect(validarPassword("abcd")).not.toBe("");
  });

  it("acepta una contraseña con letra, número y símbolo", () => {
    expect(validarPassword("ab1!")).toBe("");
  });
});

describe("validarLogin()", () => {
  it("devuelve un objeto vacío cuando los datos son correctos", () => {
    expect(validarLogin({ email: "homero@gmail.com", password: "ab1!" })).toEqual({});
  });

  it("devuelve un error por cada campo vacío", () => {
    const errores = validarLogin({ email: "", password: "" });
    expect(errores.email).toBe("El correo es obligatorio.");
    expect(errores.password).toBe("La contraseña es obligatoria.");
  });
});

describe("validarRegistro()", () => {
  it("con el formulario vacío marca los 9 campos obligatorios", () => {
    const valoresVacios = {
      run: "",
      nombre: "",
      apellidos: "",
      email: "",
      region: "",
      comuna: "",
      direccion: "",
      password: "",
      terminos: false,
    };

    expect(Object.keys(validarRegistro(valoresVacios)).length).toBe(9);
  });
});

describe("validarContacto()", () => {
  it("el email es opcional: sin email no hay error de email", () => {
    const errores = validarContacto({ nombre: "Homero", email: "", mensaje: "Hola" });

    expect(errores).toEqual({});
  });
});

describe("validarProducto() (admin)", () => {
  it("rechaza un precio negativo", () => {
    const valores = {
      codigo: "KB-001",
      nombre: "Papas",
      precio: "-5",
      stock: "10",
      stockCritico: "",
      categoria: "papas",
    };

    expect(validarProducto(valores).precio).toBe("El precio no puede ser negativo.");
  });

  it("rechaza un código de menos de 3 caracteres", () => {
    const valores = {
      codigo: "KB",
      nombre: "Papas",
      precio: "1000",
      stock: "10",
      stockCritico: "",
      categoria: "papas",
    };

    expect(validarProducto(valores).codigo).toBe("El código debe tener al menos 3 caracteres.");
  });
});

describe("validarUsuario() (admin)", () => {
  it("solo acepta correos @duoc.cl, @profesor.duoc.cl o @gmail.com", () => {
    const valores = {
      run: "190110222",
      nombre: "Ned",
      apellidos: "Flanders",
      correo: "ned@hotmail.com",
      region: "Metropolitana de Santiago",
      comuna: "Maipu",
      direccion: "Calle 1",
    };

    expect(validarUsuario(valores).correo).toBe("Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
  });
});

describe("validarCheckout()", () => {
  it("con el formulario vacío marca los 6 campos obligatorios", () => {
    const valores = { nombre: "", apellidos: "", correo: "", calle: "", region: "", comuna: "" };

    expect(Object.keys(validarCheckout(valores)).length).toBe(6);
  });

  it("el departamento y las indicaciones son opcionales", () => {
    const valores = {
      nombre: "Homero",
      apellidos: "Simpson",
      correo: "homero@gmail.com",
      calle: "Av. Siempreviva 742",
      region: "Metropolitana de Santiago",
      comuna: "Maipu",
      departamento: "",
      indicaciones: "",
    };

    expect(validarCheckout(valores)).toEqual({});
  });
});

describe("validarCategoria()", () => {
  it("rechaza un nombre de menos de 3 caracteres", () => {
    expect(validarCategoria({ nombre: "ab" }).nombre).toBe("El nombre debe tener al menos 3 caracteres.");
  });

  it("acepta un nombre válido", () => {
    expect(validarCategoria({ nombre: "Combos" })).toEqual({});
  });
});
