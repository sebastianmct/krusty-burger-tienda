(function () {
    "use strict";

    const CLAVE_PRODUCTOS = "krustyAdminProductos";
    const CLAVE_USUARIOS = "krustyAdminUsuarios";

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
        localStorage.setItem(clave, JSON.stringify(lista));
        return lista;
    }

    /* ---------- Sincroniza el admin con el catálogo de la tienda (js/productos.js) ----------
     * El admin guarda su propia copia en localStorage (para poder editar stock, código, etc.
     * sin depender de un backend). El problema es que esa copia se crea una sola vez: si
     * después se agregan, editan o quitan productos en js/productos.js, el admin se queda
     * con datos viejos. Esta función corrige eso en cada carga:
     *   - Si aparece un producto nuevo en el catálogo que el admin no tiene, lo agrega.
     *   - Si un producto que el admin ya tiene cambió de nombre/precio/categoría/imagen en
     *     el catálogo, actualiza esos campos (los campos propios del admin como stock,
     *     stockCritico y código NO se tocan).
     *   - Los productos creados directamente desde el admin (que no existen en el catálogo)
     *     se dejan intactos.
     */
    function sincronizarConCatalogo(lista) {
        const catalogo = window.KrustyProductos || [];
        if (!catalogo.length) {
            return lista;
        }
        const porId = {};
        lista.forEach(function (producto) { porId[producto.id] = producto; });

        let cambio = false;
        const camposDeCatalogo = ["nombre", "descripcion", "precio", "categoria", "categoriaLabel", "imagen"];

        catalogo.forEach(function (fuente, indice) {
            const existente = porId[fuente.id];
            if (existente) {
                camposDeCatalogo.forEach(function (campo) {
                    if (existente[campo] !== fuente[campo]) {
                        existente[campo] = fuente[campo];
                        cambio = true;
                    }
                });
            } else {
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
