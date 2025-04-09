import globals from "globals";
import pluginJs from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "prettier/prettier": "error",
    },
  },
  pluginJs.configs.recommended,
  airbnbBase,
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
  },
  prettier,
];