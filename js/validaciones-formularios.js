(function () {
    "use strict";

    const comunasPorRegion = {
        "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
        "Tarapaca": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"],
        "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "San Pedro de Atacama"],
        "Atacama": ["Copiapo", "Caldera", "Vallenar", "Chanaral", "Diego de Almagro"],
        "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Los Vilos"],
        "Valparaiso": ["Valparaiso", "Vina del Mar", "Quilpue", "Villa Alemana", "San Antonio", "Quillota"],
        "Metropolitana de Santiago": ["Santiago", "Maipu", "Las Condes", "Providencia", "Puente Alto", "La Florida", "San Miguel"],
        "O'Higgins": ["Rancagua", "San Fernando", "Rengo", "Machali", "Santa Cruz"],
        "Maule": ["Talca", "Curico", "Linares", "Constitucion", "Cauquenes"],
        "Nuble": ["Chillan", "San Carlos", "Bulnes", "Yungay", "Quillon"],
        "Biobio": ["Concepcion", "Talcahuano", "Los Angeles", "Coronel", "Chiguayante", "San Pedro de la Paz"],
        "La Araucania": ["Temuco", "Padre Las Casas", "Angol", "Villarrica", "Pucon"],
        "Los Rios": ["Valdivia", "La Union", "Rio Bueno", "Panguipulli", "Los Lagos"],
        "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"],
        "Aysen": ["Coyhaique", "Puerto Aysen", "Chile Chico", "Cochrane"],
        "Magallanes y de la Antartica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir", "Puerto Williams"]
    };

    function normalizarRun(run) {
        return run.replace(/[^0-9kK]/g, "").toUpperCase();
    }

    function runValido(run) {
        if (!/^\d{7,8}[0-9Kk]$/.test(run)) {
            return false;
        }
        const limpio = normalizarRun(run);
        if (!/^\d{7,8}[0-9K]$/.test(limpio)) {
            return false;
        }
        const cuerpo = limpio.slice(0, -1);
        const verificador = limpio.slice(-1);
        let suma = 0;
        let multiplicador = 2;
        for (let indice = cuerpo.length - 1; indice >= 0; indice -= 1) {
            suma += Number(cuerpo[indice]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        const resto = 11 - (suma % 11);
        const calculado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
        return calculado === verificador;
    }

    function mensajeObligatorio(campo) {
        const mensajes = {
            email: "El correo es obligatorio.",
            password: "La contraseña es obligatoria.",
            run: "El RUN es obligatorio.",
            nombre: "El nombre es obligatorio.",
            apellidos: "Los apellidos son obligatorios.",
            mensaje: "El comentario es obligatorio.",
            direccion: "La dirección es obligatoria.",
            region: "Selecciona una región.",
            comuna: "Selecciona una comuna."
        };
        return mensajes[campo.id] || "Este campo es obligatorio.";
    }

    function mostrarError(campo, mensaje) {
        campo.setCustomValidity(mensaje);
        let error = document.querySelector("#" + campo.id + "-error");
        if (!error) {
            error = document.createElement("p");
            error.id = campo.id + "-error";
            error.className = "campo-error";
            error.setAttribute("role", "alert");
            campo.insertAdjacentElement("afterend", error);
        }
        error.textContent = mensaje;
        error.hidden = false;
        campo.setAttribute("aria-invalid", "true");
        campo.setAttribute("aria-describedby", error.id);
        return false;
    }

    function limpiarError(campo) {
        campo.setCustomValidity("");
        campo.removeAttribute("aria-invalid");
        const error = document.querySelector("#" + campo.id + "-error");
        if (error) {
            error.hidden = true;
            error.textContent = "";
        }
    }

    function validarCampo(campo, formulario) {
        const valor = campo.type === "checkbox" ? campo.checked : campo.value.trim();
        let mensaje = "";
        if (campo.required && !valor) {
            mensaje = campo.type === "checkbox" ? "Debes aceptar los términos." : mensajeObligatorio(campo);
        } else if (campo.id === "run" && !runValido(campo.value)) {
            mensaje = "Ingresa un RUN chileno válido sin puntos ni guion.";
        } else if (campo.type === "email" && valor && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value)) {
            mensaje = "Ingresa un correo válido.";
        } else if (campo.id === "password" && formulario.id === "login-form" && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{4,10}$/.test(campo.value)) {
            mensaje = "La contraseña debe tener entre 4 y 10 caracteres, con letras, números y un carácter especial.";
        } else if (campo.maxLength > 0 && campo.value.length > campo.maxLength) {
            mensaje = "No puede superar los " + campo.maxLength + " caracteres.";
        }
        return mensaje ? mostrarError(campo, mensaje) : (limpiarError(campo), true);
    }

    function mostrarExito(formulario, texto) {
        let estado = formulario.querySelector(".mensaje-exito");
        if (!estado) {
            estado = document.createElement("p");
            estado.className = "mensaje-exito";
            estado.setAttribute("role", "status");
            formulario.appendChild(estado);
        }
        estado.textContent = texto;
    }

    function configurarRegiones() {
        const region = document.querySelector("#region");
        const comuna = document.querySelector("#comuna");
        if (!region || !comuna || region.dataset.cargada) {
            return;
        }
        Object.keys(comunasPorRegion).forEach(function (nombre) {
            region.add(new Option(nombre, nombre));
        });
        region.dataset.cargada = "true";
        region.addEventListener("change", function () {
            const comunas = comunasPorRegion[region.value] || [];
            comuna.replaceChildren(new Option("Selecciona una comuna", ""));
            comunas.forEach(function (nombre) {
                comuna.add(new Option(nombre, nombre));
            });
            comuna.disabled = comunas.length === 0;
            limpiarError(comuna);
        });
    }

    function configurarFormularios() {
        configurarRegiones();
        document.querySelectorAll("form").forEach(function (formulario) {
            const campos = Array.from(formulario.querySelectorAll("input, textarea, select"));
            formulario.setAttribute("novalidate", "novalidate");
            campos.forEach(function (campo) {
                campo.addEventListener("blur", function () { validarCampo(campo, formulario); });
                campo.addEventListener("input", function () {
                    if (campo.value || campo.type === "checkbox") {
                        validarCampo(campo, formulario);
                    }
                });
                campo.addEventListener("change", function () { validarCampo(campo, formulario); });
            });
            formulario.addEventListener("submit", function (evento) {
                evento.preventDefault();
                const validos = campos.map(function (campo) { return validarCampo(campo, formulario); });
                if (!validos.every(Boolean)) {
                    const primero = campos.find(function (campo, indice) { return !validos[indice]; });
                    if (primero) {
                        primero.focus();
                    }
                    return;
                }

                if (formulario.id === "registro-form" && window.KrustyAuth) {
                    const campoEmail = formulario.querySelector("#email");
                    const campoFecha = formulario.querySelector("#fecha-nacimiento");
                    const resultado = window.KrustyAuth.registrar({
                        run: formulario.querySelector("#run").value,
                        nombre: formulario.querySelector("#nombre").value,
                        apellidos: formulario.querySelector("#apellidos").value,
                        correo: campoEmail.value,
                        password: formulario.querySelector("#password").value,
                        fechaNacimiento: campoFecha ? campoFecha.value : "",
                        region: formulario.querySelector("#region").value,
                        comuna: formulario.querySelector("#comuna").value,
                        direccion: formulario.querySelector("#direccion").value
                    });
                    if (!resultado.ok) {
                        mostrarError(campoEmail, resultado.error);
                        campoEmail.focus();
                        return;
                    }
                    mostrarExito(formulario, "¡Cuenta creada! Ya puedes iniciar sesión con tu correo y contraseña.");
                    formulario.reset();
                    setTimeout(function () { window.location.href = "login.html"; }, 1500);
                    return;
                }

                if (formulario.id === "login-form" && window.KrustyAuth) {
                    const campoPassword = formulario.querySelector("#password");
                    const resultado = window.KrustyAuth.iniciarSesion(formulario.querySelector("#email").value, campoPassword.value);
                    if (!resultado.ok) {
                        mostrarError(campoPassword, resultado.error);
                        campoPassword.focus();
                        return;
                    }
                    mostrarExito(formulario, "¡Bienvenido, " + resultado.usuario.nombre + "!");
                    const destino = resultado.usuario.tipoUsuario === "Administrador" ? "admin/index.html" : "index.html";
                    setTimeout(function () { window.location.href = destino; }, 800);
                    return;
                }

                mostrarExito(formulario, "Tu mensaje fue enviado correctamente.");
            });
        });
    }

    document.addEventListener("DOMContentLoaded", configurarFormularios);
}());
