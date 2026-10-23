import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import useFormulario from "../../hooks/useFormulario";
import { crearIdCategoria, guardarCategoria, listarCategorias, obtenerCategoria } from "../../services/adminData";
import { validarCategoria } from "../../utils/validaciones";

// Sirve para crear (/admin/categorias/nueva) y para editar (/admin/categorias/:valor/editar)
function AdminCategoriaForm() {
  const { valor } = useParams(); // si hay valor estamos editando
  const navigate = useNavigate();

  const [categoriaActual] = useState(() => (valor ? obtenerCategoria(valor) : null));
  const c = categoriaActual;
  const [errorDuplicada, setErrorDuplicada] = useState("");

  const { valores, errorDe, claseValidacion, cambiar, salirDelCampo, enviar } = useFormulario(
    { nombre: c ? c.etiqueta : "", descripcion: c ? c.descripcion || "" : "" },
    validarCategoria,
  );

  function guardar(datos) {
    // Al crear, el identificador sale del nombre ("Papas Fritas" -> "papas-fritas")
    const id = c ? c.valor : crearIdCategoria(datos.nombre);
    if (!c && listarCategorias().some((categoria) => categoria.valor === id)) {
      setErrorDuplicada("Ya existe una categoría con ese nombre.");
      return;
    }

    guardarCategoria({ valor: id, etiqueta: datos.nombre.trim(), descripcion: datos.descripcion.trim() });
    navigate("/admin/categorias", { state: { mensaje: "Categoría guardada correctamente." } });
  }

  return (
    <PaginaAdmin
      miga={
        <>
          <Link to="/admin/categorias" className="text-decoration-none">
            Categorías
          </Link>{" "}
          / {c ? "Editar" : "Nueva"}
        </>
      }
      titulo={c ? "Editar categoría" : "Nueva categoría"}
    >
      <form
        className="form-admin card-kb"
        style={{ maxWidth: 620 }}
        noValidate
        onSubmit={(evento) => enviar(evento, guardar)}
      >
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              className={"form-control" + claseValidacion("nombre") + (errorDuplicada ? " is-invalid" : "")}
              id="nombre"
              name="nombre"
              maxLength="40"
              required
              placeholder="Ej. Combos"
              value={valores.nombre}
              onChange={(evento) => {
                cambiar(evento);
                setErrorDuplicada("");
              }}
              onBlur={salirDelCampo}
            />
            <div className="invalid-feedback">{errorDe("nombre") || errorDuplicada}</div>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="descripcion">
              Descripción <span className="text-muted fw-normal">(opcional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              name="descripcion"
              maxLength="80"
              placeholder="Ej. Para compartir"
              value={valores.descripcion}
              onChange={cambiar}
            />
          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-kb-primario">
            <i className="ti ti-device-floppy"></i> Guardar categoría
          </button>
          <Link to="/admin/categorias" className="btn btn-kb-secundario">
            Cancelar
          </Link>
        </div>
      </form>
    </PaginaAdmin>
  );
}

export default AdminCategoriaForm;
