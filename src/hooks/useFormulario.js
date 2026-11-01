import { useState } from "react";

export default function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales);
  const [tocados, setTocados] = useState({});
  const [enviado, setEnviado] = useState(false);

  const errores = validar(valores);

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target;
    setValores((anteriores) => ({
      ...anteriores,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function cambiarValor(nombre, valor) {
    setValores((anteriores) => ({ ...anteriores, [nombre]: valor }));
  }

  function salirDelCampo(evento) {
    const { name } = evento.target;
    setTocados((anteriores) => ({ ...anteriores, [name]: true }));
  }

  function errorDe(campo) {
    return tocados[campo] || enviado ? errores[campo] : undefined;
  }

  function claseValidacion(campo) {
    if (!tocados[campo] && !enviado) return "";
    if (errores[campo]) return " is-invalid";
    return valores[campo] ? " is-valid" : "";
  }

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

  const resumenErrores = enviado && Object.keys(errores).length > 0;

  return {
    valores,
    resumenErrores,
    errorDe,
    claseValidacion,
    cambiar,
    cambiarValor,
    salirDelCampo,
    enviar,
    reiniciar,
  };
}
