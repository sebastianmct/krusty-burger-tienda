import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import "./styles/style-tipografia-global.css";
import "./styles/style-sonidos.css";
import "./styles/style-footer.css";
import "./styles/style-navbar.css";
import "./styles/style-animaciones.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
