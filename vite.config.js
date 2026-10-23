import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// base "./" para que las rutas funcionen también en GitHub Pages
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/krusty-burger-tienda/"
})
