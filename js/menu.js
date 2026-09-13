(function () {
    "use strict";

    function renderProductos(productos) {
        const grilla = document.querySelector("#productos-grilla, #productos-inicio");
        if (!grilla) {
            return;
        }
        const esInicio = grilla.id === "productos-inicio";
        grilla.replaceChildren.apply(grilla, productos.map(function (producto) {
            const articulo = document.createElement("article");
            articulo.className = (esInicio ? "tarjeta " : "producto-menu ") + producto.tema;
            articulo.dataset.category = producto.categoria;

            const enlace = document.createElement("a");
            enlace.className = "enlace-producto";
            enlace.href = "detalle-producto.html?id=" + encodeURIComponent(producto.id);
            if (esInicio) {
                enlace.innerHTML = "<img src=\"" + producto.imagen + "\" alt=\"" + producto.alt + "\"><p class=\"tipo\">" + producto.categoriaLabel + "</p><h3>" + producto.nombre + "</h3><span class=\"precio\">" + KrustyCart.formatoPrecio(producto.precio) + "</span>";
            } else {
                enlace.innerHTML = "<img src=\"" + producto.imagen + "\" alt=\"" + producto.alt + "\"><p class=\"producto-categoria\">" + producto.categoriaLabel + "</p><h2>" + producto.nombre + "</h2><p>" + producto.descripcion + "</p><strong>" + KrustyCart.formatoPrecio(producto.precio) + "</strong>";
            }

            const boton = document.createElement("button");
            boton.className = "boton-producto";
            boton.type = "button";
            boton.innerHTML = esInicio ? "AGREGAR" : "Agregar al carrito <i class=\"ti ti-shopping-cart\" aria-hidden=\"true\"></i>";
            boton.addEventListener("click", function (evento) {
                evento.preventDefault();
                evento.stopPropagation();
                KrustyCart.agregar(producto.id);
                boton.textContent = "Agregado";
                window.setTimeout(function () { boton.innerHTML = esInicio ? "AGREGAR" : "Agregar al carrito <i class=\"ti ti-shopping-cart\" aria-hidden=\"true\"></i>"; }, 900);
            });

            articulo.append(enlace, boton);
            return articulo;
        }));
    }

    function ordenar(productos, criterio) {
        const copia = productos.slice();
        if (criterio === "menor") {
            return copia.sort(function (a, b) { return a.precio - b.precio; });
        }
        if (criterio === "mayor") {
            return copia.sort(function (a, b) { return b.precio - a.precio; });
        }
        return copia;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const filtros = document.querySelectorAll(".categoria-filtro, .filtro[data-filter]");
        const orden = document.querySelector("#orden-menu");
        let categoriaActiva = document.querySelector("#productos-inicio") ? "hamburguesas" : "todos";

        function actualizar() {
            const visibles = KrustyProductos.filter(function (producto) {
                return categoriaActiva === "todos" || producto.categoria === categoriaActiva;
            });
            renderProductos(ordenar(visibles, orden ? orden.value : "popularidad"));
        }

        filtros.forEach(function (filtro) {
            filtro.addEventListener("click", function () {
                categoriaActiva = filtro.dataset.filter;
                filtros.forEach(function (otroFiltro) {
                    const seleccionado = otroFiltro === filtro;
                    otroFiltro.classList.toggle("activo", seleccionado);
                    otroFiltro.classList.toggle("active", seleccionado);
                    otroFiltro.setAttribute("aria-pressed", String(seleccionado));
                });
                actualizar();
            });
        });

        if (orden) {
            orden.addEventListener("change", actualizar);
            orden.options[1].value = "menor";
            orden.options[2].value = "mayor";
        }
        actualizar();
    });
}());
