import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

const config = defineConfig({
    base: "/fun",
    resolve: { tsconfigPaths: true },
    plugins: [
        devtools(),
        tailwindcss(),
        tanstackRouter({ target: "react", autoCodeSplitting: true }),
        viteReact(),
        visualizer({
            filename: "dist/stats.html",
        }),
    ],
});

export default config;
