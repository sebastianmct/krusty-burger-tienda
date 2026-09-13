(function () {
    "use strict";

    const CLAVE = "krustyBurgerCart";

    function cargar() {
        try {
            const guardado = JSON.parse(localStorage.getItem(CLAVE) || "[]");
            if (!Array.isArray(guardado)) {
                return [];
            }
            return guardado.filter(function (item) {
                return item && typeof item.id === "string" && Number.isInteger(item.cantidad) && item.cantidad > 0;
            });
        } catch (error) {
            return [];
        }
    }

    function guardar(items) {
        const limpios = items.filter(function (item) {
            return item && typeof item.id === "string" && Number.isInteger(item.cantidad) && item.cantidad > 0;
        });
        // Guardamos solo IDs y cantidades para conservar el carrito al recargar.
        localStorage.setItem(CLAVE, JSON.stringify(limpios));
        window.dispatchEvent(new CustomEvent("carrito:actualizado", { detail: limpios }));
        actualizarContadores(limpios);
        return limpios;
    }

    function agregar(id, cantidad) {
        const items = cargar();
        const existente = items.find(function (item) { return item.id === id; });
        if (existente) {
            existente.cantidad += cantidad || 1;
        } else {
            items.push({ id: id, cantidad: cantidad || 1 });
        }
        return guardar(items);
    }

    function actualizar(id, cantidad) {
        const items = cargar().map(function (item) {
            return item.id === id ? { id: id, cantidad: cantidad } : item;
        });
        return guardar(items);
    }

    function eliminar(id) {
        return guardar(cargar().filter(function (item) { return item.id !== id; }));
    }

    function totales(items) {
        const subtotal = items.reduce(function (total, item) {
            const producto = window.KrustyBuscarProducto(item.id);
            return total + (producto ? producto.precio * item.cantidad : 0);
        }, 0);
        const impuestos = Math.round(subtotal * 0.19);
        const despacho = subtotal > 0 ? 2100 : 0;
        return { subtotal: subtotal, impuestos: impuestos, despacho: despacho, total: subtotal + impuestos + despacho };
    }

    function actualizarContadores(items) {
        const cantidad = items.reduce(function (total, item) { return total + item.cantidad; }, 0);
        document.querySelectorAll("[data-cart-count]").forEach(function (contador) {
            contador.textContent = cantidad;
            contador.hidden = cantidad === 0;
        });
    }

    function formatoPrecio(valor) {
        return "$" + Number(valor).toLocaleString("es-CL");
    }

    window.KrustyCart = {
        cargar: cargar,
        guardar: guardar,
        agregar: agregar,
        actualizar: actualizar,
        eliminar: eliminar,
        totales: totales,
        formatoPrecio: formatoPrecio,
        actualizarContadores: function () { actualizarContadores(cargar()); }
    };

    document.addEventListener("DOMContentLoaded", function () { actualizarContadores(cargar()); });
}());