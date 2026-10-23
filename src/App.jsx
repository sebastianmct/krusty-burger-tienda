import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import LayoutTienda from "./components/LayoutTienda";
import RutaAdmin from "./components/RutaAdmin";
import Inicio from "./pages/Inicio";
import Menu from "./pages/Menu";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Promociones from "./pages/Promociones";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Blog from "./pages/Blog";
import DetalleBlog from "./pages/DetalleBlog";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import PagoError from "./pages/PagoError";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminProductoForm from "./pages/admin/AdminProductoForm";
import AdminProductoFicha from "./pages/admin/AdminProductoFicha";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminUsuarioForm from "./pages/admin/AdminUsuarioForm";
import AdminUsuarioFicha from "./pages/admin/AdminUsuarioFicha";
import AdminOrdenes from "./pages/admin/AdminOrdenes";
import AdminBoleta from "./pages/admin/AdminBoleta";
import AdminProductosCriticos from "./pages/admin/AdminProductosCriticos";
import AdminReportesProductos from "./pages/admin/AdminReportesProductos";
import AdminCategorias from "./pages/admin/AdminCategorias";
import AdminCategoriaForm from "./pages/admin/AdminCategoriaForm";
import AdminReportes from "./pages/admin/AdminReportes";
import AdminPerfil from "./pages/admin/AdminPerfil";

// HashRouter usa URLs tipo /#/menu, así funciona en GitHub Pages sin configuración extra
function App() {
  return (
    <HashRouter>
      <CarritoProvider>
        <Routes>
          {/* Tienda: todas comparten navbar y footer */}
          <Route element={<LayoutTienda />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:categoria" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<DetalleBlog />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compra/exitosa/:id" element={<CompraExitosa />} />
            <Route path="/compra/error/:id" element={<PagoError />} />
          </Route>

          {/* Panel admin: solo entra un Administrador con sesión iniciada */}
          <Route path="/admin" element={<RutaAdmin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route path="productos/nuevo" element={<AdminProductoForm />} />
            <Route path="productos/criticos" element={<AdminProductosCriticos />} />
            <Route path="productos/reportes" element={<AdminReportesProductos />} />
            <Route path="productos/:id" element={<AdminProductoFicha />} />
            <Route path="productos/:id/editar" element={<AdminProductoForm />} />
            <Route path="ordenes" element={<AdminOrdenes />} />
            <Route path="ordenes/:id" element={<AdminBoleta />} />
            <Route path="categorias" element={<AdminCategorias />} />
            <Route path="categorias/nueva" element={<AdminCategoriaForm />} />
            <Route path="categorias/:valor/editar" element={<AdminCategoriaForm />} />
            <Route path="reportes" element={<AdminReportes />} />
            <Route path="perfil" element={<AdminPerfil />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="usuarios/nuevo" element={<AdminUsuarioForm />} />
            <Route path="usuarios/:id" element={<AdminUsuarioFicha />} />
            <Route path="usuarios/:id/editar" element={<AdminUsuarioForm />} />
          </Route>

          {/* Cualquier otra ruta vuelve al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CarritoProvider>
    </HashRouter>
  );
}

export default App;
