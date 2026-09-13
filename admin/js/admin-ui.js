(function () {
    "use strict";

    function inicializarSidebarMovil() {
        const sidebar = document.querySelector(".admin-sidebar");
        const overlay = document.querySelector(".overlay-sidebar");
        const botones = document.querySelectorAll("[data-toggle-sidebar]");
        if (!sidebar || !overlay) {
            return;
        }
        function abrir() {
            sidebar.classList.add("abierto");
            overlay.classList.add("visible");
        }
        function cerrar() {
            sidebar.classList.remove("abierto");
            overlay.classList.remove("visible");
        }
        botones.forEach(function (boton) {
            boton.addEventListener("click", function () {
                sidebar.classList.contains("abierto") ? cerrar() : abrir();
            });
        });
        overlay.addEventListener("click", cerrar);
    }

    function marcarPaginaActiva() {
        const actual = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".admin-nav a.item[data-pagina]").forEach(function (enlace) {
            if (enlace.dataset.pagina === actual) {
                enlace.classList.add("activo");
            }
        });
    }

    /**
     * Conecta botones "eliminar" (con data-eliminar-id / data-eliminar-nombre) a un
     * modal de confirmación de Bootstrap, y ejecuta el callback al confirmar.
     */
    window.KrustyConfirmarEliminacion = function (opciones) {
        const modalEl = document.querySelector("#modalEliminar");
        if (!modalEl || typeof bootstrap === "undefined") {
            return;
        }
        const modal = new bootstrap.Modal(modalEl);
        const nombreEl = modalEl.querySelector("[data-modal-nombre]");
        const botonConfirmar = modalEl.querySelector("[data-confirmar-eliminar]");
        let idPendiente = null;

        document.addEventListener("click", function (evento) {
            const disparador = evento.target.closest("[data-eliminar-id]");
            if (!disparador) {
                return;
            }
            idPendiente = disparador.dataset.eliminarId;
            if (nombreEl) {
                nombreEl.textContent = disparador.dataset.eliminarNombre || "este elemento";
            }
            modal.show();
        });

        if (botonConfirmar) {
            botonConfirmar.addEventListener("click", function () {
                if (idPendiente && typeof opciones.alConfirmar === "function") {
                    opciones.alConfirmar(idPendiente);
                }
                idPendiente = null;
                modal.hide();
            });
        }
    };

    function pintarBadgesSidebar() {
        if (!window.KrustyAdmin) {
            return;
        }
        const badgeProductos = document.querySelector("#badge-productos");
        const badgeUsuarios = document.querySelector("#badge-usuarios");
        if (badgeProductos) {
            badgeProductos.textContent = window.KrustyAdmin.Productos.listar().length;
        }
        if (badgeUsuarios) {
            badgeUsuarios.textContent = window.KrustyAdmin.Usuarios.listar().length;
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        inicializarSidebarMovil();
        marcarPaginaActiva();
        pintarBadgesSidebar();
    });
}());
