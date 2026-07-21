import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      // tsconfig paths: "@/*" -> "./src/*"
      "@": resolve(__dirname, "./src"),
      // `server-only` throws outside an RSC build; stub it for tests.
      "server-only": resolve(__dirname, "tests/helpers/empty.ts"),
    },
  },
});
