import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default Vite port
    open: true, // Automatically open browser on server start
  },
  resolve: {
    alias: {
      "@": "/src", // Allows shorthand imports (e.g., import from "@/components")
    },
  },
  build: {
    outDir: "dist", // Directory for the built project
    sourcemap: true, // Generates source maps for debugging
  },
});
