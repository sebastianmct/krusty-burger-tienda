import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import useFormulario from "../../hooks/useFormulario";
import { obtenerCategorias, etiquetaCategoria } from "../../data/productos";
import { guardarProducto, obtenerProducto } from "../../services/adminData";
import { validarProducto } from "../../utils/validaciones";

// Sirve para crear (/admin/productos/nuevo) y para editar (/admin/productos/:id/editar)
function AdminProductoForm() {
  const { id } = useParams(); // si hay id estamos editando
  const navigate = useNavigate();

  const [productoActual] = useState(() => (id ? obtenerProducto(id) : null));
  const [imagenNueva, setImagenNueva] = useState(null); // imagen subida (en base64)
  const p = productoActual;

  const { valores, errorDe, claseValidacion, cambiar, salirDelCampo, enviar } = useFormulario(
    {
      codigo: p ? p.codigo : "",
      nombre: p ? p.nombre : "",
      descripcion: p ? p.descripcion || "" : "",
      precio: p ? String(p.precio) : "",
      stock: p ? String(p.stock) : "",
      stockCritico: p && p.stockCritico != null ? String(p.stockCritico) : "",
      categoria: p ? p.categoria : "",
    },
    validarProducto,
  );

  // Si el producto tiene una categoría que ya no existe, igual se muestra para no perder el dato
  const categorias = obtenerCategorias();
  if (p && p.categoria && !categorias.some((c) => c.valor === p.categoria)) {
    categorias.push({ valor: p.categoria, etiqueta: p.categoria });
  }

  // Se guarda como Data URL (base64) para que la imagen siga funcionando al recargar la página
  function elegirImagen(evento) {
    const archivo = evento.target.files[0];
    if (!archivo) return;
    const lector = new FileReader();
    lector.onload = () => setImagenNueva(lector.result);
    lector.readAsDataURL(archivo);
  }

  function guardar(datos) {
    guardarProducto({
      id: p ? p.id : null,
      codigo: datos.codigo.trim(),
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      stockCritico: datos.stockCritico === "" ? null : Number(datos.stockCritico),
      categoria: datos.categoria,
      categoriaLabel: etiquetaCategoria(datos.categoria),
      // imagen nueva > imagen que ya tenía > imagen por defecto
      imagen: imagenNueva || (p ? p.imagen : "assets/krusty-burger.webp"),
    });
    navigate("/admin/productos", { state: { mensaje: "Producto guardado correctamente." } });
  }

  const imagenPrevia = imagenNueva || (p ? p.imagen : "");

  return (
    <PaginaAdmin
      miga={
        <>
          <Link to="/admin/productos" className="text-decoration-none">
            Productos
          </Link>{" "}
          / {p ? "Editar" : "Nuevo"}
        </>
      }
      titulo={p ? "Editar producto" : "Nuevo producto"}
    >
      <form
        className="form-admin card-kb"
        style={{ maxWidth: 760 }}
        id="form-producto"
        noValidate
        onSubmit={(evento) => enviar(evento, guardar)}
      >
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="codigo">
              Código de producto
            </label>
            <input
              type="text"
              className={"form-control" + claseValidacion("codigo")}
              id="codigo"
              name="codigo"
              required
              placeholder="Ej. KB-008"
              value={valores.codigo}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("codigo")}</div>
            <div className="form-text">Mínimo 3 caracteres, sin límite máximo.</div>
          </div>
          <div className="col-md-8">
            <label className="form-label" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              className={"form-control" + claseValidacion("nombre")}
              id="nombre"
              name="nombre"
              maxLength="100"
              required
              placeholder="Ej. Krusty Doble Queso"
              value={valores.nombre}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("nombre")}</div>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="descripcion">
              Descripción <span className="text-muted fw-normal">(opcional)</span>
            </label>
            <textarea
              className="form-control"
              id="descripcion"
              name="descripcion"
              maxLength="500"
              rows="3"
              placeholder="Describe el producto…"
              value={valores.descripcion}
              onChange={cambiar}
            ></textarea>
            <div className="form-text">Máximo 500 caracteres.</div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="precio">
              Precio
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className={"form-control" + claseValidacion("precio")}
                id="precio"
                name="precio"
                min="0"
                step="0.01"
                required
                placeholder="0"
                value={valores.precio}
                onChange={cambiar}
                onBlur={salirDelCampo}
              />
              <div className="invalid-feedback">{errorDe("precio")}</div>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              className={"form-control" + claseValidacion("stock")}
              id="stock"
              name="stock"
              min="0"
              step="1"
              required
              placeholder="0"
              value={valores.stock}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("stock")}</div>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="stockCritico">
              Stock crítico <span className="text-muted fw-normal">(opcional)</span>
            </label>
            <input
              type="number"
              className={"form-control" + claseValidacion("stockCritico")}
              id="stockCritico"
              name="stockCritico"
              min="0"
              step="1"
              placeholder="Ej. 5"
              value={valores.stockCritico}
              onChange={cambiar}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("stockCritico")}</div>
            <div className="form-text">Se muestra una alerta cuando el stock llega a este valor.</div>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="categoria">
              Categoría
            </label>
            <select
              className={"form-select" + claseValidacion("categoria")}
              id="categoria"
              name="categoria"
              required
              value={valores.categoria}
              onChange={cambiar}
              onBlur={salirDelCampo}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((c) => (
                <option key={c.valor} value={c.valor}>
                  {c.etiqueta}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errorDe("categoria")}</div>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="imagen">
              Imagen <span className="text-muted fw-normal">(opcional)</span>
            </label>
            <input
              type="file"
              className="form-control"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={elegirImagen}
            />
            {imagenPrevia && (
              <img className="mt-2 imagen-ficha" style={{ maxWidth: 120 }} src={imagenPrevia} alt="Vista previa" />
            )}
          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-kb-primario">
            <i className="ti ti-device-floppy"></i> Guardar producto
          </button>
          <Link to="/admin/productos" className="btn btn-kb-secundario">
            Cancelar
          </Link>
        </div>
      </form>
    </PaginaAdmin>
  );
}

export default AdminProductoForm;
