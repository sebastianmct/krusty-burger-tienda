(function () {
    "use strict";

    const CLAVE_PRODUCTOS = "krustyAdminProductos";
    const CLAVE_USUARIOS = "krustyAdminUsuarios";
    const CLAVE_PRODUCTOS_ELIMINADOS = "krustyProductosEliminados";

    /* ---------- IDs de productos eliminados desde el admin ----------
     * La tienda (js/productos.js) es un catálogo estático: para que un producto
     * eliminado en el panel deje de aparecer en menu.html/index.html/detalle,
     * guardamos su id aquí y la tienda filtra su catálogo contra esta lista.
     */
    function marcarProductoEliminado(id) {
        if (!id) {
            return;
        }
        try {
            const lista = JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS_ELIMINADOS) || "[]");
            if (Array.isArray(lista) && lista.indexOf(id) === -1) {
                lista.push(id);
                localStorage.setItem(CLAVE_PRODUCTOS_ELIMINADOS, JSON.stringify(lista));
            }
        } catch (error) {
            localStorage.setItem(CLAVE_PRODUCTOS_ELIMINADOS, JSON.stringify([id]));
        }
    }

    /* ---------- Regiones y comunas (mismo set que la tienda) ---------- */
    const comunasPorRegion = {
        "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
        "Tarapaca": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"],
        "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "San Pedro de Atacama"],
        "Atacama": ["Copiapo", "Caldera", "Vallenar", "Chanaral", "Diego de Almagro"],
        "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Los Vilos"],
        "Valparaiso": ["Valparaiso", "Vina del Mar", "Quilpue", "Villa Alemana", "San Antonio", "Quillota"],
        "Metropolitana de Santiago": ["Santiago", "Maipu", "Las Condes", "Providencia", "Puente Alto", "La Florida", "San Miguel"],
        "O'Higgins": ["Rancagua", "San Fernando", "Rengo", "Machali", "Santa Cruz"],
        "Maule": ["Talca", "Curico", "Linares", "Constitucion", "Cauquenes"],
        "Nuble": ["Chillan", "San Carlos", "Bulnes", "Yungay", "Quillon"],
        "Biobio": ["Concepcion", "Talcahuano", "Los Angeles", "Coronel", "Chiguayante", "San Pedro de la Paz"],
        "La Araucania": ["Temuco", "Padre Las Casas", "Angol", "Villarrica", "Pucon"],
        "Los Rios": ["Valdivia", "La Union", "Rio Bueno", "Panguipulli", "Los Lagos"],
        "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"],
        "Aysen": ["Coyhaique", "Puerto Aysen", "Chile Chico", "Cochrane"],
        "Magallanes y de la Antartica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir", "Puerto Williams"]
    };

    /* ---------- Validación de RUN (con digito verificador) ---------- */
    function normalizarRun(run) {
        return (run || "").replace(/[^0-9kK]/g, "").toUpperCase();
    }

    function runValido(run) {
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

    /* ---------- Seed inicial de productos (a partir del catálogo de la tienda) ---------- */
    function seedProductos() {
        const base = (window.KrustyProductos || []).map(function (producto, indice) {
            return {
                codigo: "KB-" + String(indice + 1).padStart(3, "0"),
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                stock: 25 + indice * 4,
                stockCritico: 5,
                categoria: producto.categoria,
                categoriaLabel: producto.categoriaLabel,
                imagen: producto.imagen,
                id: producto.id
            };
        });
        return base;
    }

    /* ---------- Seed inicial de usuarios: la familia y vecinos de Springfield ---------- */
    function seedUsuarios() {
        return [
            {
                id: "u-homero",
                run: "19011022K",
                nombre: "Homero",
                apellidos: "Simpson",
                correo: "homero.simpson@gmail.com",
                fechaNacimiento: "1985-05-12",
                tipoUsuario: "Cliente",
                region: "Metropolitana de Santiago",
                comuna: "Maipu",
                direccion: "Av. Siempreviva 742"
            },
            {
                id: "u-marge",
                run: "18456723K",
                nombre: "Marge",
                apellidos: "Simpson",
                correo: "marge.simpson@gmail.com",
                fechaNacimiento: "1986-10-01",
                tipoUsuario: "Cliente",
                region: "Metropolitana de Santiago",
                comuna: "Maipu",
                direccion: "Av. Siempreviva 742"
            },
            {
                id: "u-bart",
                run: "205678912",
                nombre: "Bart",
                apellidos: "Simpson",
                correo: "bart.simpson@gmail.com",
                fechaNacimiento: "2011-04-01",
                tipoUsuario: "Cliente",
                region: "Metropolitana de Santiago",
                comuna: "Maipu",
                direccion: "Av. Siempreviva 742"
            },
            {
                id: "u-lisa",
                run: "206789013",
                nombre: "Lisa",
                apellidos: "Simpson",
                correo: "lisa.simpson@gmail.com",
                fechaNacimiento: "2013-05-09",
                tipoUsuario: "Cliente",
                region: "Metropolitana de Santiago",
                comuna: "Maipu",
                direccion: "Av. Siempreviva 742"
            },
            {
                id: "u-krusty",
                run: "112345676",
                nombre: "Krusty",
                apellidos: "El Payaso",
                correo: "krusty@duoc.cl",
                fechaNacimiento: "1965-01-17",
                tipoUsuario: "Administrador",
                region: "Metropolitana de Santiago",
                comuna: "Las Condes",
                direccion: "Estudios de Canal 6, oficina del payaso"
            },
            {
                id: "u-wiggum",
                run: "134567897",
                nombre: "Clancy",
                apellidos: "Wiggum",
                correo: "jefe.wiggum@profesor.duoc.cl",
                fechaNacimiento: "1972-08-23",
                tipoUsuario: "Vendedor",
                region: "Metropolitana de Santiago",
                comuna: "Providencia",
                direccion: "Cuartel de Policía de Springfield"
            },
            {
                id: "u-diamante",
                run: "145678903",
                nombre: "Joe",
                apellidos: "Quimby",
                correo: "alcalde.diamante@duoc.cl",
                fechaNacimiento: "1968-03-30",
                tipoUsuario: "Vendedor",
                region: "Metropolitana de Santiago",
                comuna: "Santiago",
                direccion: "Municipalidad de Springfield"
            },
            {
                id: "u-moe",
                run: "156789019",
                nombre: "Moe",
                apellidos: "Szyslak",
                correo: "moe.taberna@gmail.com",
                fechaNacimiento: "1962-11-11",
                tipoUsuario: "Cliente",
                region: "Metropolitana de Santiago",
                comuna: "San Miguel",
                direccion: "Taberna de Moe, calle sin nombre"
            }
        ];
    }

    function cargarConSeed(clave, fnSeed) {
        try {
            const guardado = JSON.parse(localStorage.getItem(clave) || "null");
            if (Array.isArray(guardado) && guardado.length) {
                return guardado;
            }
        } catch (error) {
            // sigue al seed
        }
        const inicial = fnSeed();
        localStorage.setItem(clave, JSON.stringify(inicial));
        return inicial;
    }

    function guardarLista(clave, lista) {
        try {
            localStorage.setItem(clave, JSON.stringify(lista));
        } catch (error) {
            window.alert("No se pudo guardar: el almacenamiento del navegador está lleno (suele pasar con imágenes muy pesadas). Prueba con una imagen más liviana.");
            throw error;
        }
        return lista;
    }

    /* ---------- Sincroniza el admin con el catálogo de la tienda (js/productos.js) ----------
     * Esta función es SOLO ADITIVA: si aparece un producto nuevo en el catálogo estático
     * (window.KrustyProductos) que el admin todavía no tiene, lo agrega.
     * A propósito NUNCA sobreescribe campos de un producto que el admin ya tiene, aunque
     * difieran del catálogo: si lo hiciera, cualquier edición hecha en producto-editar.html
     * (nombre, precio, descripción, categoría, imagen) se revertiría sola en la siguiente
     * carga, porque esta función se llama en cada listar()/obtener()/guardar().
     */
    function sincronizarConCatalogo(lista) {
        const catalogo = window.KrustyProductos || [];
        if (!catalogo.length) {
            return lista;
        }
        const idsExistentes = {};
        lista.forEach(function (producto) { idsExistentes[producto.id] = true; });

        let cambio = false;

        catalogo.forEach(function (fuente, indice) {
            if (!idsExistentes[fuente.id]) {
                lista.push({
                    id: fuente.id,
                    codigo: "KB-" + String(indice + 1).padStart(3, "0"),
                    nombre: fuente.nombre,
                    descripcion: fuente.descripcion,
                    precio: fuente.precio,
                    stock: 25,
                    stockCritico: 5,
                    categoria: fuente.categoria,
                    categoriaLabel: fuente.categoriaLabel,
                    imagen: fuente.imagen
                });
                cambio = true;
            }
        });

        if (cambio) {
            guardarLista(CLAVE_PRODUCTOS, lista);
        }
        return lista;
    }

    function generarId(prefijo) {
        return prefijo + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    }

    /* ---------- API de Productos ---------- */
    const Productos = {
        listar: function () {
            const lista = cargarConSeed(CLAVE_PRODUCTOS, seedProductos);
            return sincronizarConCatalogo(lista);
        },
        obtener: function (id) {
            return this.listar().find(function (p) { return p.id === id; }) || null;
        },
        guardar: function (producto) {
            const lista = this.listar();
            if (producto.id) {
                const indice = lista.findIndex(function (p) { return p.id === producto.id; });
                if (indice >= 0) {
                    lista[indice] = Object.assign({}, lista[indice], producto);
                    return guardarLista(CLAVE_PRODUCTOS, lista), lista[indice];
                }
            }
            producto.id = generarId("prod");
            if (!producto.codigo) {
                producto.codigo = "KB-" + String(lista.length + 1).padStart(3, "0");
            }
            lista.push(producto);
            guardarLista(CLAVE_PRODUCTOS, lista);
            return producto;
        },
        eliminar: function (id) {
            const lista = this.listar().filter(function (p) { return p.id !== id; });
            guardarLista(CLAVE_PRODUCTOS, lista);
            marcarProductoEliminado(id);
            return lista;
        }
    };

    /* ---------- API de Usuarios ---------- */
    const Usuarios = {
        listar: function () {
            return cargarConSeed(CLAVE_USUARIOS, seedUsuarios);
        },
        obtener: function (id) {
            return this.listar().find(function (u) { return u.id === id; }) || null;
        },
        guardar: function (usuario) {
            const lista = this.listar();
            if (usuario.id) {
                const indice = lista.findIndex(function (u) { return u.id === usuario.id; });
                if (indice >= 0) {
                    lista[indice] = Object.assign({}, lista[indice], usuario);
                    return guardarLista(CLAVE_USUARIOS, lista), lista[indice];
                }
            }
            usuario.id = generarId("user");
            lista.push(usuario);
            guardarLista(CLAVE_USUARIOS, lista);
            return usuario;
        },
        eliminar: function (id) {
            const lista = this.listar().filter(function (u) { return u.id !== id; });
            guardarLista(CLAVE_USUARIOS, lista);
            return lista;
        }
    };

    function formatoPrecio(valor) {
        return "$" + Number(valor || 0).toLocaleString("es-CL");
    }

    function obtenerParametro(nombre) {
        return new URLSearchParams(window.location.search).get(nombre);
    }

    window.KrustyAdmin = {
        Productos: Productos,
        Usuarios: Usuarios,
        comunasPorRegion: comunasPorRegion,
        runValido: runValido,
        normalizarRun: normalizarRun,
        formatoPrecio: formatoPrecio,
        obtenerParametro: obtenerParametro
    };
}());