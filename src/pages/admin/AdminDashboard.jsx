import { Link } from "react-router-dom";
import PaginaAdmin from "../../components/admin/PaginaAdmin";
import { listarOrdenes, listarProductos, listarUsuarios } from "../../services/adminData";
import { formatoPrecio } from "../../utils/formato";

// Accesos a cada módulo del panel
const modulos = [
  { ruta: "/admin/ordenes", icono: "ti-receipt", nombre: "Órdenes", descripcion: "Boletas y compras realizadas." },
  {
    ruta: "/admin/productos",
    icono: "ti-burger",
    nombre: "Productos",
    descripcion: "Inventario y detalles de productos.",
  },
  {
    ruta: "/admin/categorias",
    icono: "ti-tags",
    nombre: "Categorías",
    descripcion: "Organiza el menú por categorías.",
  },
  { ruta: "/admin/usuarios", icono: "ti-users", nombre: "Usuarios", descripcion: "Cuentas de usuario y sus roles." },
  {
    ruta: "/admin/productos/criticos",
    icono: "ti-alert-triangle",
    nombre: "Stock crítico",
    descripcion: "Productos por reponer.",
  },
  {
    ruta: "/admin/productos/reportes",
    icono: "ti-box",
    nombre: "Inventario",
    descripcion: "Valor y stock por categoría.",
  },
  { ruta: "/admin/reportes", icono: "ti-chart-bar", nombre: "Reportes", descripcion: "Ventas y usuarios del sistema." },
  { ruta: "/admin/perfil", icono: "ti-user-circle", nombre: "Perfil", descripcion: "Tu información de cuenta." },
];

function AdminDashboard() {
  const productos = listarProductos();
  const usuarios = listarUsuarios();

  // Productos cuyo stock ya llegó (o bajó de) su stock crítico
  const stockCritico = productos.filter((p) => p.stockCritico != null && p.stock <= p.stockCritico);
  // Compras aprobadas y cuánto se vendió
  const comprasPagadas = listarOrdenes().filter((o) => o.estado === "Pagada");
  const ingresos = comprasPagadas.reduce((total, o) => total + o.totales.total, 0);

  // Los 5 últimos usuarios registrados, el más nuevo primero
  const usuariosRecientes = usuarios.slice(-5).reverse();

  return (
    <PaginaAdmin
      miga="Panel administrador"
      titulo="¡Hola, Administrador!"
      acciones={
        <>
          <button className="campana" type="button" aria-label="Notificaciones">
            <i className="ti ti-bell"></i>
            <span className="punto"></span>
          </button>
          <div className="avatar-iniciales" style={{ background: "#d9121d" }}>
            KP
          </div>
        </>
      }
    >
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Productos</p>
            <p className="stat-valor">{productos.length}</p>
            <p className="stat-nota">En el catálogo</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card acento-amarillo">
            <p className="stat-label">Stock crítico</p>
            <p className="stat-valor">{stockCritico.length}</p>
            <p className="stat-nota">Productos por reponer</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card acento-oscuro">
            <p className="stat-label">Usuarios</p>
            <p className="stat-valor">{usuarios.length}</p>
            <p className="stat-nota">Registrados en el sistema</p>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Compras</p>
            <p className="stat-valor">{comprasPagadas.length}</p>
            <p className="stat-nota">Ingresos: {formatoPrecio(ingresos)}</p>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {modulos.map((m) => (
          <div className="col-6 col-lg-3" key={m.ruta}>
            <Link to={m.ruta} className="modulo-card">
              <i className={"ti " + m.icono}></i>
              <h3>{m.nombre}</h3>
              <p>{m.descripcion}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="tabla-admin-wrap h-100">
            <div className="tabla-admin-header">
              <div>
                <p className="seccion-titulo mb-0">Alerta de stock crítico</p>
                <p className="text-muted small mb-0">Estos productos se están acabando, ¡Homero ya anda preguntando!</p>
              </div>
              <Link to="/admin/productos" className="btn btn-sm btn-kb-secundario ms-auto">
                Ver todos los productos
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table tabla-admin mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Crítico</th>
                  </tr>
                </thead>
                <tbody>
                  {stockCritico.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nombre}</td>
                      <td>{p.categoriaLabel || p.categoria}</td>
                      <td>{p.stock}</td>
                      <td>{p.stockCritico}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {stockCritico.length === 0 && (
              <div className="estado-vacio">
                <i className="ti ti-mood-smile"></i>
                <p className="mt-2 mb-0">Sin alertas por ahora. Hasta Ned Flanders estaría orgulloso.</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column gap-3 h-100">
            <div className="quote-personaje">
              <div className="avatar-iniciales" style={{ background: "#1A1A1A" }}>
                JQ
              </div>
              <div>
                <p className="nombre mb-0">Alcalde Quimby</p>
                <p className="cargo mb-0">Inspección municipal</p>
                <p className="frase mb-0">
                  "He revisado personalmente las cifras de Krusty Burger... con mi mejor amigo, un cóctel."
                </p>
              </div>
            </div>
            <div className="quote-personaje">
              <div className="avatar-iniciales" style={{ background: "#c77b00" }}>
                CW
              </div>
              <div>
                <p className="nombre mb-0">Jefe Wiggum</p>
                <p className="cargo mb-0">Seguridad del panel</p>
                <p className="frase mb-0">"Todo bajo control por aquí... ¿alguien vio dónde dejé la rosquilla?"</p>
              </div>
            </div>
            <div className="card-kb">
              <p className="seccion-titulo">Accesos rápidos</p>
              <div className="d-grid gap-2 mt-2">
                <Link to="/admin/productos/nuevo" className="btn btn-kb-primario">
                  <i className="ti ti-plus"></i> Nuevo producto
                </Link>
                <Link to="/admin/usuarios/nuevo" className="btn btn-kb-secundario">
                  <i className="ti ti-user-plus"></i> Nuevo usuario
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tabla-admin-wrap mt-4">
        <div className="tabla-admin-header">
          <div>
            <p className="seccion-titulo mb-0">Usuarios recientes</p>
            <p className="text-muted small mb-0">Los últimos vecinos de Springfield en registrarse.</p>
          </div>
          <Link to="/admin/usuarios" className="btn btn-sm btn-kb-secundario ms-auto">
            Ver todos los usuarios
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table tabla-admin mb-0">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>RUN</th>
                <th>Comuna</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {usuariosRecientes.map((u) => (
                <tr key={u.id}>
                  <td>
                    {u.nombre} {u.apellidos}
                  </td>
                  <td>{u.run}</td>
                  <td>{u.comuna || "-"}</td>
                  <td>
                    <span className={"badge badge-rol rol-" + u.tipoUsuario.toLowerCase()}>{u.tipoUsuario}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PaginaAdmin>
  );
}

export default AdminDashboard;
