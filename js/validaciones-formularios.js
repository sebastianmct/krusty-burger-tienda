(function () {
    "use strict";

    const comunasPorRegion = {
    "Arica y Parinacota": [
        "Arica",
        "Camarones",
        "Putre",
        "General Lagos"
    ],
    "Tarapaca": [
        "Iquique",
        "Alto Hospicio",
        "Pozo Almonte",
        "Pica",
        "Huara",
        "Camina",
        "Colchane"
    ],
    "Antofagasta": [
        "Antofagasta",
        "Calama",
        "Tocopilla",
        "Mejillones",
        "San Pedro de Atacama",
        "Sierra Gorda",
        "Taltal",
        "Maria Elena"
    ],
    "Atacama": [
        "Copiapo",
        "Caldera",
        "Vallenar",
        "Chanaral",
        "Diego de Almagro",
        "Tierra Amarilla",
        "Alto del Carmen",
        "Freirina",
        "Huasco"
    ],
    "Coquimbo": [
        "La Serena",
        "Coquimbo",
        "Ovalle",
        "Illapel",
        "Los Vilos",
        "Andacollo",
        "La Higuera",
        "Paiguano",
        "Vicuna",
        "Canela",
        "Combarbala",
        "Monte Patria",
        "Punitaqui",
        "Rio Hurtado",
        "Salamanca"
    ],
    "Valparaiso": [
        "Valparaiso",
        "Vina del Mar",
        "Quilpue",
        "Villa Alemana",
        "San Antonio",
        "Quillota",
        "Los Andes",
        "San Felipe",
        "Limache",
        "Olmue",
        "Algarrobo",
        "Cartagena",
        "El Quisco",
        "El Tabo",
        "Isla de Pascua",
        "Juan Fernandez",
        "Catemu",
        "Llaillay",
        "Panquehue",
        "Putaendo",
        "Santa Maria",
        "Hijuelas",
        "La Calera",
        "La Cruz",
        "Nogales",
        "Petorca",
        "Cabildo",
        "Papudo",
        "Zapallar",
        "Casablanca",
        "Concon",
        "Puchuncavi",
        "Quintero"
    ],
    "Metropolitana de Santiago": [
        "Santiago",
        "Maipu",
        "Las Condes",
        "Providencia",
        "Puente Alto",
        "La Florida",
        "San Miguel",
        "La Cisterna",
        "Recoleta",
        "Independencia",
        "Quinta Normal",
        "San Bernardo",
        "El Bosque",
        "La Pintana",
        "Lo Espejo",
        "Pedro Aguirre Cerda",
        "San Joaquin",
        "San Ramon",
        "Cerrillos",
        "Cerro Navia",
        "Estacion Central",
        "Huechuraba",
        "Lo Barnechea",
        "Lo Prado",
        "Macul",
        "Pudahuel",
        "Penalolen",
        "Quilicura",
        "La Reina",
        "Nunoa",
        "Conchali",
        "Renca",
        "Vitacura",
        "Colina",
        "Lampa",
        "Tiltil",
        "Buin",
        "Calera de Tango",
        "Paine",
        "Melipilla",
        "Alhue",
        "Curacavi",
        "Maria Pinto",
        "San Pedro"
    ],
    "O'Higgins": [
        "Rancagua",
        "San Fernando",
        "Rengo",
        "Machali",
        "Santa Cruz",
        "Codegua",
        "Coinco",
        "Coltauco",
        "Donihue",
        "Graneros",
        "Las Cabras",
        "Malloa",
        "Mostazal",
        "Olivar",
        "Peumo",
        "Pichidegua",
        "Quinta de Tilcoco",
        "Requinoa",
        "San Vicente",
        "La Estrella",
        "Litueche",
        "Marchihue",
        "Navidad",
        "Paredones",
        "Pichilemu",
        "Chimbarongo",
        "Lolol",
        "Nancagua",
        "Palmilla",
        "Peralillo",
        "Placilla",
        "Pumanque"
    ],
    "Maule": [
        "Talca",
        "Curico",
        "Linares",
        "Constitucion",
        "Cauquenes",
        "Colbun",
        "Longavi",
        "Parral",
        "Retiro",
        "San Javier",
        "Villa Alegre",
        "Yerbas Buenas",
        "Hualane",
        "Licanten",
        "Molina",
        "Rauco",
        "Romeral",
        "Sagrada Familia",
        "Teno",
        "Vichuquen",
        "Chanco",
        "Pelluhue"
    ],
    "Nuble": [
        "Chillan",
        "San Carlos",
        "Bulnes",
        "Yungay",
        "Quillon",
        "Chillan Viejo",
        "Coelemu",
        "Coihueco",
        "El Carmen",
        "Ninhue",
        "Niquen",
        "Pemuco",
        "Pinto",
        "Portezuelo",
        "Quirihue",
        "Ranquil",
        "San Fabian",
        "San Ignacio",
        "Treguaco",
        "San Nicolas"
    ],
    "Biobio": [
        "Concepcion",
        "Talcahuano",
        "Los Angeles",
        "Coronel",
        "Chiguayante",
        "San Pedro de la Paz",
        "Hualpen",
        "Lota",
        "Cabrero",
        "Nacimiento",
        "Laja",
        "Mulchen",
        "Tome",
        "Penco",
        "Arauco",
        "Canete",
        "Contulmo",
        "Curanilahue",
        "Los Alamos",
        "Tirua",
        "Alto Biobio",
        "Antuco",
        "Negrete",
        "Quilaco",
        "Quilleco",
        "San Rosendo",
        "Santa Barbara",
        "Tucapel",
        "Yumbel"
    ],
    "La Araucania": [
        "Temuco",
        "Padre Las Casas",
        "Angol",
        "Villarrica",
        "Pucon",
        "Victoria",
        "Gorbea",
        "Loncoche",
        "Teodoro Schmidt",
        "Carahue",
        "Cunco",
        "Freire",
        "Lautaro",
        "Nueva Imperial",
        "Pitrufquen",
        "Saavedra",
        "Tolten",
        "Curarrehue",
        "Melipeuco",
        "Perquenco",
        "Vilcun"
    ],
    "Los Rios": [
        "Valdivia",
        "La Union",
        "Rio Bueno",
        "Panguipulli",
        "Los Lagos",
        "Corral",
        "Futrono",
        "Lago Ranco",
        "Lanco",
        "Mafil",
        "Mariquina",
        "Paillaco",
        "Panquipulli"
    ],
    "Los Lagos": [
        "Puerto Montt",
        "Osorno",
        "Castro",
        "Ancud",
        "Puerto Varas",
        "Calbuco",
        "Fresia",
        "Frutillar",
        "Los Muermos",
        "Llanquihue",
        "Maullin",
        "Purranque",
        "Quellon",
        "Quemchi",
        "Rio Negro",
        "San Juan de la Costa",
        "San Pablo",
        "Chaiten",
        "Futaleufu",
        "Palena"
    ],
    "Aysen": [
        "Coyhaique",
        "Puerto Aysen",
        "Chile Chico",
        "Cochrane",
        "Cisnes",
        "Guaitecas",
        "Lago Verde",
        "O'Higgins",
        "Tortel"
    ],
    "Magallanes y de la Antartica Chilena": [
        "Punta Arenas",
        "Puerto Natales",
        "Porvenir",
        "Puerto Williams",
        "Cabo de Hornos",
        "Laguna Blanca",
        "Primavera",
        "San Gregorio",
        "Timaukel",
        "Torres del Paine"
    ]
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
                    mostrarExito(formulario, "Cuenta creada! Ya puedes iniciar sesión con tu correo y contraseña.");
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
                    mostrarExito(formulario, "Bienvenido, " + resultado.usuario.nombre + "!");
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
