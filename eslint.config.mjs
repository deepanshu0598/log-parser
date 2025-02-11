import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,  // Add Node.js globals (includes `process`, `__dirname`, etc.)
      },
    },
  },
  pluginJs.configs.recommended,
];
