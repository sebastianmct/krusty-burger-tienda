(function () {
    "use strict";

    const TIPOS_USUARIO = ["Administrador", "Vendedor", "Cliente"];
    const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

    function claseRol(tipo) {
        return "rol-" + (tipo || "").toLowerCase();
    }

    function escaparHtml(texto) {
        const div = document.createElement("div");
        div.textContent = texto == null ? "" : String(texto);
        return div.innerHTML;
    }

    function iniciales(nombre, apellidos) {
        return ((nombre || "").charAt(0) + (apellidos || "").charAt(0)).toUpperCase();
    }

    function colorAvatar(texto) {
        const paleta = ["#d9121d", "#1A1A1A", "#c77b00", "#5b4636", "#7a1f1f"];
        let suma = 0;
        for (let i = 0; i < texto.length; i += 1) {
            suma += texto.charCodeAt(i);
        }
        return paleta[suma % paleta.length];
    }

    function mostrarToast(mensaje) {
        const contenedor = document.querySelector("#toast-admin");
        if (!contenedor) {
            return;
        }
        contenedor.querySelector(".toast-body").textContent = mensaje;
        new bootstrap.Toast(contenedor, { delay: 2600 }).show();
    }

    /* ---------------- Listado (usuarios.html) ---------------- */
    function renderListado() {
        const cuerpo = document.querySelector("#cuerpo-tabla-usuarios");
        if (!cuerpo) {
            return;
        }
        function pintar(filtroTexto) {
            const usuarios = window.KrustyAdmin.Usuarios.listar();
            const filtrados = usuarios.filter(function (u) {
                if (!filtroTexto) {
                    return true;
                }
                const q = filtroTexto.toLowerCase();
                return (u.nombre + " " + u.apellidos).toLowerCase().includes(q) || u.run.toLowerCase().includes(q) || u.correo.toLowerCase().includes(q);
            });

            document.querySelector("#contador-usuarios").textContent = filtrados.length + (filtrados.length === 1 ? " usuario" : " usuarios");

            if (!filtrados.length) {
                cuerpo.innerHTML = "";
                document.querySelector("#estado-vacio-usuarios").hidden = false;
                return;
            }
            document.querySelector("#estado-vacio-usuarios").hidden = true;

            cuerpo.innerHTML = filtrados.map(function (u) {
                const nombreCompleto = u.nombre + " " + u.apellidos;
                return "" +
                    '<tr>' +
                    '<td class="celda-producto"><div class="avatar-iniciales" style="background:' + colorAvatar(nombreCompleto) + '">' + escaparHtml(iniciales(u.nombre, u.apellidos)) + '</div>' +
                    '<div><div class="fw-semibold">' + escaparHtml(nombreCompleto) + '</div><div class="subtexto">' + escaparHtml(u.correo) + '</div></div></td>' +
                    '<td>' + escaparHtml(u.run) + '</td>' +
                    '<td>' + escaparHtml(u.comuna || "") + (u.region ? ', ' + escaparHtml(u.region) : '') + '</td>' +
                    '<td><span class="badge badge-rol ' + claseRol(u.tipoUsuario) + '">' + escaparHtml(u.tipoUsuario) + '</span></td>' +
                    '<td class="text-end">' +
                    '<div class="fila-acciones">' +
                    '<a class="btn btn-sm btn-kb-secundario" href="usuario-mostrar.html?id=' + encodeURIComponent(u.id) + '" title="Ver"><i class="ti ti-eye"></i></a>' +
                    '<a class="btn btn-sm btn-kb-secundario" href="usuario-editar.html?id=' + encodeURIComponent(u.id) + '" title="Editar"><i class="ti ti-pencil"></i></a>' +
                    '<button class="btn btn-sm btn-outline-danger" type="button" title="Eliminar" data-eliminar-id="' + u.id + '" data-eliminar-nombre="' + escaparHtml(nombreCompleto) + '"><i class="ti ti-trash"></i></button>' +
                    '</div></td>' +
                    '</tr>';
            }).join("");
        }

        pintar("");

        const buscador = document.querySelector("#buscador-usuarios");
        if (buscador) {
            buscador.addEventListener("input", function () { pintar(buscador.value); });
        }

        window.KrustyConfirmarEliminacion({
            alConfirmar: function (id) {
                window.KrustyAdmin.Usuarios.eliminar(id);
                pintar(buscador ? buscador.value : "");
                mostrarToast("Usuario eliminado correctamente.");
            }
        });
    }

    /* ---------------- Región / comuna en cascada ---------------- */
    function configurarRegionComuna(selectRegion, selectComuna, regionInicial, comunaInicial) {
        if (!selectRegion || !selectComuna) {
            return;
        }
        Object.keys(window.KrustyAdmin.comunasPorRegion).forEach(function (nombre) {
            selectRegion.add(new Option(nombre, nombre));
        });

        function pintarComunas(comunaSeleccionada) {
            const comunas = window.KrustyAdmin.comunasPorRegion[selectRegion.value] || [];
            selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
            comunas.forEach(function (nombre) {
                selectComuna.add(new Option(nombre, nombre, false, nombre === comunaSeleccionada));
            });
            selectComuna.disabled = comunas.length === 0;
        }

        selectRegion.addEventListener("change", function () { pintarComunas(""); });

        if (regionInicial) {
            selectRegion.value = regionInicial;
            pintarComunas(comunaInicial);
        }
    }

    /* ---------------- Formulario (nuevo / editar) ---------------- */
    function inicializarFormulario() {
        const formulario = document.querySelector("#form-usuario");
        if (!formulario) {
            return;
        }
        const selectRegion = formulario.querySelector("#region");
        const selectComuna = formulario.querySelector("#comuna");
        const selectTipo = formulario.querySelector("#tipoUsuario");
        selectTipo.innerHTML = TIPOS_USUARIO.map(function (t) { return '<option value="' + t + '">' + t + '</option>'; }).join("");

        const idParam = window.KrustyAdmin.obtenerParametro("id");
        let usuarioActual = null;
        if (idParam) {
            usuarioActual = window.KrustyAdmin.Usuarios.obtener(idParam);
        }

        if (usuarioActual) {
            formulario.querySelector("#run").value = usuarioActual.run;
            formulario.querySelector("#nombre").value = usuarioActual.nombre;
            formulario.querySelector("#apellidos").value = usuarioActual.apellidos;
            formulario.querySelector("#correo").value = usuarioActual.correo;
            formulario.querySelector("#fechaNacimiento").value = usuarioActual.fechaNacimiento || "";
            formulario.querySelector("#direccion").value = usuarioActual.direccion || "";
            selectTipo.value = usuarioActual.tipoUsuario;
            configurarRegionComuna(selectRegion, selectComuna, usuarioActual.region, usuarioActual.comuna);
            document.querySelectorAll("[data-titulo-form]").forEach(function (el) { el.textContent = "Editar usuario"; });
        } else {
            configurarRegionComuna(selectRegion, selectComuna, "", "");
        }

        function correoValido(valor) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                return false;
            }
            return DOMINIOS_PERMITIDOS.some(function (dominio) { return valor.toLowerCase().endsWith("@" + dominio); });
        }

        function validarCampo(campo) {
            let mensaje = "";
            const valor = campo.type === "select-one" ? campo.value : campo.value.trim();
            if (campo.hasAttribute("required") && !valor) {
                mensaje = "Este campo es obligatorio.";
            } else if (campo.id === "run" && valor && !window.KrustyAdmin.runValido(valor)) {
                mensaje = "Ingresa un RUN chileno válido (sin puntos ni guión), con dígito verificador correcto.";
            } else if (campo.id === "correo" && valor && !correoValido(valor)) {
                mensaje = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            } else if (campo.maxLength > 0 && valor.length > campo.maxLength) {
                mensaje = "No puede superar los " + campo.maxLength + " caracteres.";
            }
            campo.classList.toggle("is-invalid", Boolean(mensaje));
            campo.classList.toggle("is-valid", !mensaje && Boolean(valor));
            const feedback = campo.closest(".mb-3, .col-12, .col-md-6")?.querySelector(".invalid-feedback");
            if (feedback && mensaje) {
                feedback.textContent = mensaje;
            }
            return !mensaje;
        }

        const campos = Array.from(formulario.querySelectorAll("input, select"));
        campos.forEach(function (campo) {
            campo.addEventListener("blur", function () { validarCampo(campo); });
            campo.addEventListener("change", function () { validarCampo(campo); });
        });

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const validos = campos.map(validarCampo);
            if (!validos.every(Boolean)) {
                const primerInvalido = formulario.querySelector(".is-invalid");
                if (primerInvalido) {
                    primerInvalido.focus();
                }
                return;
            }
            const datos = {
                id: usuarioActual ? usuarioActual.id : null,
                run: window.KrustyAdmin.normalizarRun(formulario.querySelector("#run").value),
                nombre: formulario.querySelector("#nombre").value.trim(),
                apellidos: formulario.querySelector("#apellidos").value.trim(),
                correo: formulario.querySelector("#correo").value.trim(),
                fechaNacimiento: formulario.querySelector("#fechaNacimiento").value,
                tipoUsuario: selectTipo.value,
                region: selectRegion.value,
                comuna: selectComuna.value,
                direccion: formulario.querySelector("#direccion").value.trim()
            };
            window.KrustyAdmin.Usuarios.guardar(datos);
            window.location.href = "usuarios.html?guardado=1";
        });
    }

    /* ---------------- Ficha de solo lectura (usuario-mostrar.html) ---------------- */
    function inicializarFicha() {
        const contenedor = document.querySelector("#ficha-usuario");
        if (!contenedor) {
            return;
        }
        const id = window.KrustyAdmin.obtenerParametro("id");
        const usuario = id ? window.KrustyAdmin.Usuarios.obtener(id) : null;
        if (!usuario) {
            contenedor.innerHTML = '<div class="estado-vacio"><i class="ti ti-mood-empty"></i><p class="mt-2">No encontramos ese usuario. Puede que se haya escondido en la taberna de Moe.</p></div>';
            return;
        }
        const nombreCompleto = usuario.nombre + " " + usuario.apellidos;
        document.querySelectorAll("[data-titulo-ficha]").forEach(function (el) { el.textContent = nombreCompleto; });
        contenedor.querySelector("[data-avatar]").textContent = iniciales(usuario.nombre, usuario.apellidos);
        contenedor.querySelector("[data-avatar]").style.background = colorAvatar(nombreCompleto);
        contenedor.querySelector("[data-run]").textContent = usuario.run;
        contenedor.querySelector("[data-nombre]").textContent = nombreCompleto;
        contenedor.querySelector("[data-correo]").textContent = usuario.correo;
        contenedor.querySelector("[data-fecha]").textContent = usuario.fechaNacimiento || "No informada";
        contenedor.querySelector("[data-region]").textContent = (usuario.comuna || "") + (usuario.region ? ", " + usuario.region : "");
        contenedor.querySelector("[data-direccion]").textContent = usuario.direccion || "No informada";
        const badgeTipo = contenedor.querySelector("[data-tipo]");
        badgeTipo.textContent = usuario.tipoUsuario;
        badgeTipo.className = "badge badge-rol " + claseRol(usuario.tipoUsuario);

        const enlaceEditar = document.querySelector("#enlace-editar");
        if (enlaceEditar) {
            enlaceEditar.href = "usuario-editar.html?id=" + encodeURIComponent(usuario.id);
        }
        const botonEliminar = document.querySelector("#boton-eliminar-ficha");
        if (botonEliminar) {
            botonEliminar.dataset.eliminarId = usuario.id;
            botonEliminar.dataset.eliminarNombre = nombreCompleto;
        }
        window.KrustyConfirmarEliminacion({
            alConfirmar: function (idEliminar) {
                window.KrustyAdmin.Usuarios.eliminar(idEliminar);
                window.location.href = "usuarios.html?eliminado=1";
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        renderListado();
        inicializarFormulario();
        inicializarFicha();

        const params = new URLSearchParams(window.location.search);
        const banner = document.querySelector("#banner-estado");
        if (banner) {
            if (params.get("guardado")) {
                banner.textContent = "Usuario guardado correctamente.";
                banner.hidden = false;
            } else if (params.get("eliminado")) {
                banner.textContent = "Usuario eliminado correctamente.";
                banner.hidden = false;
            }
        }
    });
}());
