(function () {
    "use strict";

    function renderDetalle(producto) {
        const contenedor = document.querySelector("#detalle-contenido");
        const galeriaId = "galeria-" + producto.id;
        const imagenes = producto.imagenes.map(function (imagen, indice) {
            return { src: imagen, alt: producto.alt + ", vista " + (indice + 1) };
        });

        contenedor.innerHTML = "<section class=\"detalle-producto detalle-predeterminado\"><div class=\"detalle-media\"><div class=\"galeria\" aria-label=\"Galería de " + producto.nombre + "\"><input type=\"radio\" name=\"" + galeriaId + "\" id=\"" + galeriaId + "-1\" checked><input type=\"radio\" name=\"" + galeriaId + "\" id=\"" + galeriaId + "-2\"><input type=\"radio\" name=\"" + galeriaId + "\" id=\"" + galeriaId + "-3\"><div class=\"visor\"></div><div class=\"miniaturas\"></div></div><div class=\"comentario personaje-millhouse\"><img src=\"assets/millhouse.jpg\" alt=\"Millhouse\"><p>“" + producto.millhouse + "”</p></div></div><div class=\"detalle-info\"><p class=\"detalle-categoria\">" + producto.categoriaLabel + "</p><h1>" + producto.nombre + "</h1><p class=\"detalle-descripcion\">" + producto.descripcion + "</p><strong class=\"detalle-precio\">" + KrustyCart.formatoPrecio(producto.precio) + "</strong><p class=\"detalle-nota\">" + producto.nota + "</p><button class=\"boton-carrito\" type=\"button\">Agregar al carrito <i class=\"ti ti-shopping-cart\" aria-hidden=\"true\"></i></button><div class=\"comentario personaje-burns\"><img src=\"assets/burns.jpg\" alt=\"Señor Burns\"><p>“" + producto.burns + "”</p></div></div></section>";

        const visor = contenedor.querySelector(".visor");
        const miniaturas = contenedor.querySelector(".miniaturas");
        imagenes.forEach(function (imagen, indice) {
            const foto = document.createElement("img");
            foto.className = "foto-" + (indice + 1);
            foto.src = imagen.src;
            foto.alt = imagen.alt;
            visor.appendChild(foto);

            const etiqueta = document.createElement("label");
            etiqueta.htmlFor = galeriaId + "-" + (indice + 1);
            const miniatura = document.createElement("img");
            miniatura.src = imagen.src;
            miniatura.alt = "Ver " + imagen.alt;
            etiqueta.appendChild(miniatura);
            miniaturas.appendChild(etiqueta);
        });

        contenedor.querySelector(".boton-carrito").addEventListener("click", function (evento) {
            evento.preventDefault();
            KrustyCart.agregar(producto.id);
            evento.currentTarget.textContent = "Agregado al carrito";
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        const id = new URLSearchParams(window.location.search).get("id");
        const producto = id ? KrustyBuscarProducto(id) : null;
        const contenedor = document.querySelector("#detalle-contenido");
        if (!producto) {
            contenedor.innerHTML = "<section class=\"detalle-invalido\"><h1>Producto no encontrado</h1><p>No encontramos ese producto. Vuelve al menú para elegir otra opción.</p><a class=\"volver-menu\" href=\"menu.html\">Ir al menú</a></section>";
            return;
        }
        renderDetalle(producto);
    });
}());