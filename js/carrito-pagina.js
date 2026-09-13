(function () {
    "use strict";

    function renderCarrito() {
        const lista = document.querySelector("#lista-carrito");
        const items = KrustyCart.cargar().filter(function (item) { return KrustyBuscarProducto(item.id); });
        lista.replaceChildren();

        if (items.length === 0) {
            const vacio = document.createElement("div");
            vacio.className = "carrito-vacio";
            vacio.innerHTML = "<h2>Tu carrito está vacío</h2><p>Agrega una delicia desde el menú para comenzar tu pedido.</p><a href=\"menu.html\">Ver el menú</a>";
            lista.appendChild(vacio);
        } else {
            items.forEach(function (item) {
                const producto = KrustyBuscarProducto(item.id);
                const articulo = document.createElement("article");
                articulo.className = "producto";
                articulo.innerHTML = "<img src=\"" + producto.imagen + "\" alt=\"" + producto.alt + "\"><div class=\"producto-info\"><h2>" + producto.nombre + "</h2><p>" + producto.descripcion + "</p><div class=\"cantidad\"><button type=\"button\" class=\"cantidad-control\" data-action=\"restar\" aria-label=\"Disminuir cantidad de " + producto.nombre + "\">−</button><span>" + item.cantidad + "</span><button type=\"button\" class=\"cantidad-control\" data-action=\"sumar\" aria-label=\"Aumentar cantidad de " + producto.nombre + "\">+</button></div><button class=\"eliminar\" type=\"button\">Eliminar</button></div><strong class=\"producto-precio\">" + KrustyCart.formatoPrecio(producto.precio * item.cantidad) + "</strong>";

                articulo.querySelector('[data-action="restar"]').addEventListener("click", function () {
                    KrustyCart.actualizar(item.id, item.cantidad - 1);
                    renderCarrito();
                });
                articulo.querySelector('[data-action="sumar"]').addEventListener("click", function () {
                    KrustyCart.actualizar(item.id, item.cantidad + 1);
                    renderCarrito();
                });
                articulo.querySelector(".eliminar").addEventListener("click", function () {
                    KrustyCart.eliminar(item.id);
                    renderCarrito();
                });
                lista.appendChild(articulo);
            });
        }

        const totales = KrustyCart.totales(items);
        document.querySelector("#subtotal-carrito").textContent = KrustyCart.formatoPrecio(totales.subtotal);
        document.querySelector("#impuestos-carrito").textContent = KrustyCart.formatoPrecio(totales.impuestos);
        document.querySelector("#despacho-carrito").textContent = KrustyCart.formatoPrecio(totales.despacho);
        document.querySelector("#total-carrito").textContent = KrustyCart.formatoPrecio(totales.total);
        KrustyCart.actualizarContadores();
    }

    document.addEventListener("DOMContentLoaded", renderCarrito);
    window.addEventListener("carrito:actualizado", renderCarrito);
}());