import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: ['./src/utils/setup-teardown-hooks.ts'],
  }
});
