import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: 'https://vatut007.github.io/react-burger/',
  plugins: [react()],
});
