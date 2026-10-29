import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: ['./src/utils/setup-teardown-hooks.ts'],
    // nix-direnv copies this repo into .direnv/flake-inputs, which would run every test twice
    exclude: [...configDefaults.exclude, '.direnv/**'],
  }
});
