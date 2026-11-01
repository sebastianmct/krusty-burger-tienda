const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{4,10}$/;

export const DOMINIOS_ADMIN = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

export function normalizarRun(run) {
  return (run || "").replace(/[^0-9kK]/g, "").toUpperCase();
}

export function runValido(run) {
  if (!/^\d{7,8}[0-9Kk]$/.test(run)) return false;

  const limpio = normalizarRun(run);
  const cuerpo = limpio.slice(0, -1);
  const verificador = limpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return esperado === verificador;
}

export function validarRequerido(
  valor,
  mensaje = "Este campo es obligatorio.",
) {
  return String(valor).trim() ? "" : mensaje;
}

export function validarRun(run) {
  if (!run.trim()) return "El RUN es obligatorio.";
  if (!runValido(run))
    return "Ingresa un RUN chileno válido sin puntos ni guion.";
  return "";
}

export function validarCorreo(correo, obligatorio = true) {
  if (!correo.trim()) return obligatorio ? "El correo es obligatorio." : "";
  if (!REGEX_CORREO.test(correo)) return "Ingresa un correo válido.";
  return "";
}

export function validarCorreoAdmin(correo) {
  const error = validarCorreo(correo);
  if (error) return error;
  const permitido = DOMINIOS_ADMIN.some((dominio) =>
    correo.toLowerCase().endsWith("@" + dominio),
  );
  return permitido
    ? ""
    : "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
}

export function validarPassword(password) {
  if (!password) return "La contraseña es obligatoria.";
  if (!REGEX_PASSWORD.test(password)) {
    return "La contraseña debe tener entre 4 y 10 caracteres, con letras, números y un carácter especial.";
  }
  return "";
}

function validarEnteroPositivo(valor, mensaje, obligatorio) {
  if (String(valor).trim() === "")
    return obligatorio ? "Este campo es obligatorio." : "";
  const numero = Number(valor);
  return Number.isInteger(numero) && numero >= 0 ? "" : mensaje;
}

function agregar(errores, campo, mensaje) {
  if (mensaje) errores[campo] = mensaje;
}

export function validarLogin({ email, password }) {
  const errores = {};
  agregar(errores, "email", validarCorreo(email));
  agregar(errores, "password", validarPassword(password));
  return errores;
}

export function validarRegistro(valores) {
  const errores = {};
  agregar(errores, "run", validarRun(valores.run));
  agregar(
    errores,
    "nombre",
    validarRequerido(valores.nombre, "El nombre es obligatorio."),
  );
  agregar(
    errores,
    "apellidos",
    validarRequerido(valores.apellidos, "Los apellidos son obligatorios."),
  );
  agregar(errores, "email", validarCorreo(valores.email));
  agregar(
    errores,
    "region",
    validarRequerido(valores.region, "Selecciona una región."),
  );
  agregar(
    errores,
    "comuna",
    validarRequerido(valores.comuna, "Selecciona una comuna."),
  );
  agregar(
    errores,
    "direccion",
    validarRequerido(valores.direccion, "La dirección es obligatoria."),
  );
  agregar(errores, "password", validarPassword(valores.password));
  if (!valores.terminos) errores.terminos = "Debes aceptar los términos.";
  return errores;
}

export function validarContacto(valores) {
  const errores = {};
  agregar(
    errores,
    "nombre",
    validarRequerido(valores.nombre, "El nombre es obligatorio."),
  );
  agregar(errores, "email", validarCorreo(valores.email, false));
  agregar(
    errores,
    "mensaje",
    validarRequerido(valores.mensaje, "El comentario es obligatorio."),
  );
  return errores;
}

export function validarProducto(valores) {
  const errores = {};

  if (!valores.codigo.trim()) errores.codigo = "Este campo es obligatorio.";
  else if (valores.codigo.trim().length < 3)
    errores.codigo = "El código debe tener al menos 3 caracteres.";

  agregar(errores, "nombre", validarRequerido(valores.nombre));

  if (valores.precio === "") errores.precio = "Este campo es obligatorio.";
  else if (Number(valores.precio) < 0)
    errores.precio = "El precio no puede ser negativo.";

  agregar(
    errores,
    "stock",
    validarEnteroPositivo(
      valores.stock,
      "El stock debe ser un número entero igual o mayor a 0.",
      true,
    ),
  );
  agregar(
    errores,
    "stockCritico",
    validarEnteroPositivo(
      valores.stockCritico,
      "El stock crítico debe ser un número entero igual o mayor a 0.",
      false,
    ),
  );
  agregar(
    errores,
    "categoria",
    validarRequerido(valores.categoria, "Selecciona una categoría."),
  );
  return errores;
}

export function validarUsuario(valores) {
  const errores = {};
  agregar(errores, "run", validarRun(valores.run));
  agregar(errores, "nombre", validarRequerido(valores.nombre));
  agregar(errores, "apellidos", validarRequerido(valores.apellidos));
  agregar(errores, "correo", validarCorreoAdmin(valores.correo));
  agregar(
    errores,
    "region",
    validarRequerido(valores.region, "Selecciona una región."),
  );
  agregar(
    errores,
    "comuna",
    validarRequerido(valores.comuna, "Selecciona una comuna."),
  );
  agregar(errores, "direccion", validarRequerido(valores.direccion));
  return errores;
}

export function validarCheckout(valores) {
  const errores = {};
  agregar(
    errores,
    "nombre",
    validarRequerido(valores.nombre, "El nombre es obligatorio."),
  );
  agregar(
    errores,
    "apellidos",
    validarRequerido(valores.apellidos, "Los apellidos son obligatorios."),
  );
  agregar(errores, "correo", validarCorreo(valores.correo));
  agregar(
    errores,
    "calle",
    validarRequerido(valores.calle, "La calle es obligatoria."),
  );
  agregar(
    errores,
    "region",
    validarRequerido(valores.region, "Selecciona una región."),
  );
  agregar(
    errores,
    "comuna",
    validarRequerido(valores.comuna, "Selecciona una comuna."),
  );
  return errores;
}

export function validarCategoria(valores) {
  const errores = {};
  if (!valores.nombre.trim()) errores.nombre = "Este campo es obligatorio.";
  else if (valores.nombre.trim().length < 3)
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  return errores;
}
