import path from "path";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [
    react(),
    envCompatible(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
