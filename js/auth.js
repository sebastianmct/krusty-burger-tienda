/**
 * KrustyAuth: registro/login "real" del sitio público, usando como almacén
 * el mismo localStorage que ya usa el panel admin (window.KrustyAdmin.Usuarios,
 * definido en admin/js/admin-data.js). Así, toda cuenta creada en
 * registrarse.html también aparece en el mantenedor de usuarios del panel.
 *
 * Requiere que admin/js/admin-data.js esté cargado ANTES que este archivo.
 */
(function () {
    "use strict";

    const CLAVE_SESION = "krustySesion";
    const DOMINIO_ADMIN = "duoc.cl";

    function correoEsAdmin(correo) {
        const dominio = (correo || "").split("@")[1] || "";
        return dominio.trim().toLowerCase() === DOMINIO_ADMIN;
    }

    function determinarTipoUsuario(correo) {
        return correoEsAdmin(correo) ? "Administrador" : "Cliente";
    }

    function obtenerUsuarioPorCorreo(correo) {
        const buscado = (correo || "").trim().toLowerCase();
        return window.KrustyAdmin.Usuarios.listar().find(function (usuario) {
            return (usuario.correo || "").trim().toLowerCase() === buscado;
        }) || null;
    }

    /**
     * datos: { run, nombre, apellidos, correo, password, fechaNacimiento, region, comuna, direccion }
     * Devuelve { ok: true, usuario } o { ok: false, error }.
     */
    function registrar(datos) {
        const correo = (datos.correo || "").trim().toLowerCase();
        if (!correo || !datos.password) {
            return { ok: false, error: "Correo y contraseña son obligatorios." };
        }
        if (obtenerUsuarioPorCorreo(correo)) {
            return { ok: false, error: "Ya existe una cuenta registrada con ese correo." };
        }
        const usuario = window.KrustyAdmin.Usuarios.guardar({
            run: window.KrustyAdmin.normalizarRun(datos.run || ""),
            nombre: (datos.nombre || "").trim(),
            apellidos: (datos.apellidos || "").trim(),
            correo: correo,
            password: datos.password,
            fechaNacimiento: datos.fechaNacimiento || "",
            region: datos.region || "",
            comuna: datos.comuna || "",
            direccion: (datos.direccion || "").trim(),
            tipoUsuario: determinarTipoUsuario(correo)
        });
        return { ok: true, usuario: usuario };
    }

    /**
     * Devuelve { ok: true, usuario } o { ok: false, error }.
     * Si es correcto, además deja guardada la sesión en sessionStorage.
     */
    function iniciarSesion(correo, password) {
        const usuario = obtenerUsuarioPorCorreo(correo);
        if (!usuario || usuario.password !== password) {
            return { ok: false, error: "Correo o contraseña incorrectos." };
        }
        const sesion = {
            id: usuario.id,
            correo: usuario.correo,
            nombre: usuario.nombre,
            tipoUsuario: usuario.tipoUsuario
        };
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
        return { ok: true, usuario: usuario };
    }

    function obtenerSesion() {
        try {
            return JSON.parse(sessionStorage.getItem(CLAVE_SESION) || "null");
        } catch (error) {
            return null;
        }
    }

    function cerrarSesion() {
        sessionStorage.removeItem(CLAVE_SESION);
    }

    window.KrustyAuth = {
        registrar: registrar,
        iniciarSesion: iniciarSesion,
        obtenerSesion: obtenerSesion,
        cerrarSesion: cerrarSesion,
        correoEsAdmin: correoEsAdmin
    };
}());
