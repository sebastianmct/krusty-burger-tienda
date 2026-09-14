/**
 * Guardián de acceso del panel admin.
 * Este script se carga SIN "defer" y en el <head>, para que se ejecute
 * antes de que el navegador pinte el contenido de la página: si no hay
 * una sesión de Administrador activa, redirige a login.html de inmediato.
 *
 * Nota: esto es protección solo del lado del navegador (no hay servidor
 * real detrás), pensado para el alcance de un proyecto frontend.
 */
(function () {
    "use strict";

    function obtenerSesion() {
        try {
            return JSON.parse(sessionStorage.getItem("krustySesion") || "null");
        } catch (error) {
            return null;
        }
    }

    const sesion = obtenerSesion();
    if (!sesion || sesion.tipoUsuario !== "Administrador") {
        window.location.replace("../login.html");
    }

    document.addEventListener("DOMContentLoaded", function () {
        const sesionActual = obtenerSesion();
        const botonSalir = document.querySelector("#boton-cerrar-sesion");
        if (botonSalir) {
            botonSalir.addEventListener("click", function (evento) {
                evento.preventDefault();
                sessionStorage.removeItem("krustySesion");
                window.location.href = "../login.html";
            });
        }
        const nombreEl = document.querySelector("[data-admin-nombre]");
        if (nombreEl && sesionActual) {
            nombreEl.textContent = sesionActual.nombre || sesionActual.correo;
        }
    });
}());
