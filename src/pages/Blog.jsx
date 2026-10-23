import { Link } from "react-router-dom";
import useEstilos from "../hooks/useEstilos";
import { blogs, formatoFecha } from "../data/blogs";
import estiloHome from "../styles/style-home.css?inline";
import estiloExtra from "../styles/style-tienda-extra.css?inline";

const estilos = [estiloHome, estiloExtra];

function Blog() {
  useEstilos(estilos);

  return (
    <main className="kb-pagina">
      <div className="kb-pagina-cabecera">
        <span className="kb-etiqueta">Noticias de Springfield</span>
        <h1 className="kb-pagina-titulo">
          El blog de <span>Krusty</span>
        </h1>
        <p className="kb-pagina-texto">Historias, consejos y secretos (casi todos) de nuestra cocina.</p>
      </div>

      <div className="kb-blog-grid">
        {blogs.map((blog) => (
          <article className="kb-blog-card" key={blog.id}>
            <img src={blog.imagen} alt={blog.titulo} />
            <div className="kb-blog-card-cuerpo">
              <p className="kb-blog-meta">
                {formatoFecha(blog.fecha)} · {blog.autor}
              </p>
              <h2>{blog.titulo}</h2>
              <p>{blog.resumen}</p>
              <Link to={"/blog/" + blog.id} className="kb-boton-rojo">
                Leer más
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Blog;
