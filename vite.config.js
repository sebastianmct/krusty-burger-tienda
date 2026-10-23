import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// base "./" para que las rutas funcionen también en GitHub Pages
export default defineConfig({
  base: "./",
  plugins: [react()],
});
