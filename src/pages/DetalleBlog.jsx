import { Link, useParams } from "react-router-dom";
import useEstilos from "../hooks/useEstilos";
import { buscarBlog, formatoFecha } from "../data/blogs";
import estiloHome from "../styles/style-home.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloExtra];

function DetalleBlog() {
  useEstilos(estilos);

  const { id } = useParams();
  const blog = buscarBlog(id);

  return (
    <main className="kb-pagina">
      <p>
        <Link to="/blog" className="kb-boton-claro">
          <i className="ti ti-arrow-left" aria-hidden="true"></i> Volver al blog
        </Link>
      </p>

      {!blog ? (
        <div className="kb-vacio">No encontramos ese artículo.</div>
      ) : (
        <article className="kb-articulo">
          <img src={blog.imagen} alt={blog.titulo} />
          <div className="kb-articulo-cuerpo">
            <p className="kb-blog-meta">
              {formatoFecha(blog.fecha)} · {blog.autor}
            </p>
            <h1>{blog.titulo}</h1>
            {blog.contenido.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
        </article>
      )}
    </main>
  );
}

export default DetalleBlog;
