import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    "process.env": process.env,
  },
  server: {
    open: true
  }
});
