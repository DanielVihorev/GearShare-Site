import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Make environment variables available to the client
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  // Ensure environment variables are loaded
  envPrefix: "VITE_",
});
