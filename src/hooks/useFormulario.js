import { useState } from "react";

// Hook para manejar un formulario con validación.
//
//   valoresIniciales -> objeto con el valor inicial de cada campo
//   validar          -> función (de utils/validaciones.js) que recibe los valores
//                       y devuelve un objeto con los errores: { campo: "mensaje" }
//
// Un error se muestra cuando el usuario ya salió del campo o ya intentó enviar.
export default function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales);
  const [tocados, setTocados] = useState({}); // campos que el usuario ya visitó
  const [enviado, setEnviado] = useState(false); // ya intentó enviar el formulario

  // Los errores se calculan en cada render a partir de los valores actuales
  const errores = validar(valores);

  // Los inputs deben tener name="..." igual al nombre del campo
  function cambiar(evento) {
    const { name, value, type, checked } = evento.target;
    setValores((anteriores) => ({ ...anteriores, [name]: type === "checkbox" ? checked : value }));
  }

  // Para cambiar un valor "a mano" (por ejemplo, limpiar la comuna)
  function cambiarValor(nombre, valor) {
    setValores((anteriores) => ({ ...anteriores, [nombre]: valor }));
  }

  function salirDelCampo(evento) {
    const { name } = evento.target;
    setTocados((anteriores) => ({ ...anteriores, [name]: true }));
  }

  // Devuelve el mensaje de error del campo (o undefined si no hay que mostrarlo)
  function errorDe(campo) {
    return tocados[campo] || enviado ? errores[campo] : undefined;
  }

  // Clase de Bootstrap para los formularios del admin
  function claseValidacion(campo) {
    if (!tocados[campo] && !enviado) return "";
    if (errores[campo]) return " is-invalid";
    return valores[campo] ? " is-valid" : "";
  }

  // Se usa en el onSubmit: si hay errores enfoca el primer campo, si no llama a alEnviar
  function enviar(evento, alEnviar) {
    evento.preventDefault();
    setEnviado(true);

    const camposConError = Object.keys(errores);
    if (camposConError.length > 0) {
      evento.currentTarget.elements[camposConError[0]]?.focus();
      return;
    }
    alEnviar(valores);
  }

  function reiniciar() {
    setValores(valoresIniciales);
    setTocados({});
    setEnviado(false);
  }

  return { valores, errorDe, claseValidacion, cambiar, cambiarValor, salirDelCampo, enviar, reiniciar };
}
