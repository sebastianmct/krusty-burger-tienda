(function () {
    "use strict";

    const CATEGORIAS = [
        { valor: "hamburguesas", etiqueta: "Hamburguesas" },
        { valor: "combos", etiqueta: "Combos" },
        { valor: "papas", etiqueta: "Papas" },
        { valor: "dulces", etiqueta: "Dulces" },
        { valor: "bebidas", etiqueta: "Bebidas" }
    ];

    function poblarSelectCategorias(select, seleccionada) {
        if (!select) {
            return;
        }
        select.innerHTML = '<option value="">Selecciona una categoría</option>' + CATEGORIAS.map(function (cat) {
            return '<option value="' + cat.valor + '"' + (cat.valor === seleccionada ? " selected" : "") + ">" + cat.etiqueta + "</option>";
        }).join("");
    }

    function etiquetaCategoria(valor) {
        const cat = CATEGORIAS.find(function (c) { return c.valor === valor; });
        return cat ? cat.etiqueta : valor;
    }

    /* ---------------- Listado (productos.html) ---------------- */
    function renderListado() {
        const cuerpo = document.querySelector("#cuerpo-tabla-productos");
        if (!cuerpo) {
            return;
        }
        function pintar(filtroTexto) {
            const productos = window.KrustyAdmin.Productos.listar();
            const filtrados = productos.filter(function (p) {
                if (!filtroTexto) {
                    return true;
                }
                const q = filtroTexto.toLowerCase();
                return p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q);
            });

            document.querySelector("#contador-productos").textContent = filtrados.length + (filtrados.length === 1 ? " producto" : " productos");

            if (!filtrados.length) {
                cuerpo.innerHTML = "";
                document.querySelector("#estado-vacio-productos").hidden = false;
                return;
            }
            document.querySelector("#estado-vacio-productos").hidden = true;

            cuerpo.innerHTML = filtrados.map(function (p) {
                const stockBajo = p.stockCritico != null && p.stock <= p.stockCritico;
                return "" +
                    '<tr>' +
                    '<td class="celda-producto"><img src="' + escaparHtml(p.imagen || "") + '" alt="">' +
                    '<div><div class="fw-semibold">' + escaparHtml(p.nombre) + '</div><div class="subtexto">' + escaparHtml(p.codigo) + '</div></div></td>' +
                    '<td>' + escaparHtml(etiquetaCategoria(p.categoria)) + '</td>' +
                    '<td>' + window.KrustyAdmin.formatoPrecio(p.precio) + '</td>' +
                    '<td>' + p.stock + (stockBajo ? ' <span class="badge rounded-pill badge-stock-critico ms-1">Stock crítico</span>' : '') + '</td>' +
                    '<td class="text-end">' +
                    '<div class="fila-acciones">' +
                    '<a class="btn btn-sm btn-kb-secundario" href="producto-mostrar.html?id=' + encodeURIComponent(p.id) + '" title="Ver"><i class="ti ti-eye"></i></a>' +
                    '<a class="btn btn-sm btn-kb-secundario" href="producto-editar.html?id=' + encodeURIComponent(p.id) + '" title="Editar"><i class="ti ti-pencil"></i></a>' +
                    '<button class="btn btn-sm btn-outline-danger" type="button" title="Eliminar" data-eliminar-id="' + p.id + '" data-eliminar-nombre="' + escaparHtml(p.nombre) + '"><i class="ti ti-trash"></i></button>' +
                    '</div></td>' +
                    '</tr>';
            }).join("");
        }

        pintar("");

        const buscador = document.querySelector("#buscador-productos");
        if (buscador) {
            buscador.addEventListener("input", function () { pintar(buscador.value); });
        }

        window.KrustyConfirmarEliminacion({
            alConfirmar: function (id) {
                window.KrustyAdmin.Productos.eliminar(id);
                pintar(buscador ? buscador.value : "");
                mostrarToast("Producto eliminado correctamente.");
            }
        });
    }

    function escaparHtml(texto) {
        const div = document.createElement("div");
        div.textContent = texto == null ? "" : String(texto);
        return div.innerHTML;
    }

    function mostrarToast(mensaje) {
        const contenedor = document.querySelector("#toast-admin");
        if (!contenedor) {
            return;
        }
        contenedor.querySelector(".toast-body").textContent = mensaje;
        const toast = new bootstrap.Toast(contenedor, { delay: 2600 });
        toast.show();
    }

    /* ---------------- Formulario (nuevo / editar) ---------------- */
    function inicializarFormulario() {
        const formulario = document.querySelector("#form-producto");
        if (!formulario) {
            return;
        }
        const selectCategoria = formulario.querySelector("#categoria");
        poblarSelectCategorias(selectCategoria, "");

        const idParam = window.KrustyAdmin.obtenerParametro("id");
        let productoActual = null;
        if (idParam) {
            productoActual = window.KrustyAdmin.Productos.obtener(idParam);
            if (productoActual) {
                formulario.querySelector("#codigo").value = productoActual.codigo;
                formulario.querySelector("#nombre").value = productoActual.nombre;
                formulario.querySelector("#descripcion").value = productoActual.descripcion || "";
                formulario.querySelector("#precio").value = productoActual.precio;
                formulario.querySelector("#stock").value = productoActual.stock;
                formulario.querySelector("#stockCritico").value = productoActual.stockCritico != null ? productoActual.stockCritico : "";
                poblarSelectCategorias(selectCategoria, productoActual.categoria);
                const previa = formulario.querySelector("#imagen-previa");
                if (previa && productoActual.imagen) {
                    previa.src = productoActual.imagen;
                    previa.hidden = false;
                }
                document.querySelectorAll("[data-titulo-form]").forEach(function (el) { el.textContent = "Editar producto"; });
            }
        }

        // Vista previa de imagen si el usuario sube un archivo
        const inputImagen = formulario.querySelector("#imagen");
        if (inputImagen) {
            inputImagen.addEventListener("change", function () {
                const archivo = inputImagen.files && inputImagen.files[0];
                const previa = formulario.querySelector("#imagen-previa");
                if (archivo && previa) {
                    previa.src = URL.createObjectURL(archivo);
                    previa.hidden = false;
                }
            });
        }

        function validarCampo(campo) {
            let mensaje = "";
            const valor = campo.value.trim();
            if (campo.hasAttribute("required") && !valor) {
                mensaje = "Este campo es obligatorio.";
            } else if (campo.id === "codigo" && valor && valor.length < 3) {
                mensaje = "El código debe tener al menos 3 caracteres.";
            } else if (campo.id === "precio" && valor !== "" && Number(valor) < 0) {
                mensaje = "El precio no puede ser negativo.";
            } else if (campo.id === "stock" && valor !== "" && (!Number.isInteger(Number(valor)) || Number(valor) < 0)) {
                mensaje = "El stock debe ser un número entero igual o mayor a 0.";
            } else if (campo.id === "stockCritico" && valor !== "" && (!Number.isInteger(Number(valor)) || Number(valor) < 0)) {
                mensaje = "El stock crítico debe ser un número entero igual o mayor a 0.";
            } else if (campo.maxLength > 0 && valor.length > campo.maxLength) {
                mensaje = "No puede superar los " + campo.maxLength + " caracteres.";
            }
            campo.classList.toggle("is-invalid", Boolean(mensaje));
            campo.classList.toggle("is-valid", !mensaje && Boolean(valor));
            const feedback = campo.parentElement.querySelector(".invalid-feedback");
            if (feedback && mensaje) {
                feedback.textContent = mensaje;
            }
            return !mensaje;
        }

        const campos = Array.from(formulario.querySelectorAll("input, textarea, select"));
        campos.forEach(function (campo) {
            campo.addEventListener("blur", function () { validarCampo(campo); });
        });

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const validos = campos.filter(function (c) { return c.type !== "file"; }).map(validarCampo);
            if (!validos.every(Boolean)) {
                const primerInvalido = formulario.querySelector(".is-invalid");
                if (primerInvalido) {
                    primerInvalido.focus();
                }
                return;
            }

            const previa = formulario.querySelector("#imagen-previa");
            const datos = {
                id: productoActual ? productoActual.id : null,
                codigo: formulario.querySelector("#codigo").value.trim(),
                nombre: formulario.querySelector("#nombre").value.trim(),
                descripcion: formulario.querySelector("#descripcion").value.trim(),
                precio: Number(formulario.querySelector("#precio").value),
                stock: Number(formulario.querySelector("#stock").value),
                stockCritico: formulario.querySelector("#stockCritico").value === "" ? null : Number(formulario.querySelector("#stockCritico").value),
                categoria: selectCategoria.value,
                categoriaLabel: etiquetaCategoria(selectCategoria.value),
                imagen: (previa && !previa.hidden) ? previa.src : (productoActual ? productoActual.imagen : "../assets/krusty-burger.jpg")
            };
            window.KrustyAdmin.Productos.guardar(datos);
            window.location.href = "productos.html?guardado=1";
        });
    }

    /* ---------------- Ficha de solo lectura (producto-mostrar.html) ---------------- */
    function inicializarFicha() {
        const contenedor = document.querySelector("#ficha-producto");
        if (!contenedor) {
            return;
        }
        const id = window.KrustyAdmin.obtenerParametro("id");
        const producto = id ? window.KrustyAdmin.Productos.obtener(id) : null;
        if (!producto) {
            contenedor.innerHTML = '<div class="estado-vacio"><i class="ti ti-mood-empty"></i><p class="mt-2">No encontramos ese producto. Puede que Snake se lo haya llevado.</p></div>';
            return;
        }
        document.querySelectorAll("[data-titulo-ficha]").forEach(function (el) { el.textContent = producto.nombre; });
        contenedor.querySelector("[data-img]").src = producto.imagen || "";
        contenedor.querySelector("[data-img]").alt = producto.nombre;
        contenedor.querySelector("[data-codigo]").textContent = producto.codigo;
        contenedor.querySelector("[data-nombre]").textContent = producto.nombre;
        contenedor.querySelector("[data-categoria]").textContent = etiquetaCategoria(producto.categoria);
        contenedor.querySelector("[data-precio]").textContent = window.KrustyAdmin.formatoPrecio(producto.precio);
        contenedor.querySelector("[data-stock]").textContent = producto.stock;
        contenedor.querySelector("[data-stock-critico]").textContent = producto.stockCritico != null ? producto.stockCritico : "No definido";
        contenedor.querySelector("[data-descripcion]").textContent = producto.descripcion || "Sin descripción.";

        const enlaceEditar = document.querySelector("#enlace-editar");
        if (enlaceEditar) {
            enlaceEditar.href = "producto-editar.html?id=" + encodeURIComponent(producto.id);
        }
        const botonEliminar = document.querySelector("#boton-eliminar-ficha");
        if (botonEliminar) {
            botonEliminar.dataset.eliminarId = producto.id;
            botonEliminar.dataset.eliminarNombre = producto.nombre;
        }
        window.KrustyConfirmarEliminacion({
            alConfirmar: function (idEliminar) {
                window.KrustyAdmin.Productos.eliminar(idEliminar);
                window.location.href = "productos.html?eliminado=1";
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
                banner.textContent = "Producto guardado correctamente.";
                banner.hidden = false;
            } else if (params.get("eliminado")) {
                banner.textContent = "Producto eliminado correctamente.";
                banner.hidden = false;
            }
        }
    });
}());
