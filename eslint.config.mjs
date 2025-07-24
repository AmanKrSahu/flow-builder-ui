import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicornPlugin from "eslint-plugin-unicorn";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Main ESLint configuration array
const eslintConfig = [
  // Apply extended configurations with compatibility fixes
  ...fixupConfigRules(
    compat.extends(
      "next/core-web-vitals", // Next.js recommended rules
      "plugin:import/recommended", // Recommended import rules
      "plugin:prettier/recommended", // Prettier integration
    ),
  ),
  // Base configuration that applies to all files
  {
    plugins: {
      "simple-import-sort": simpleImportSort, // Auto-sort imports
      "@typescript-eslint": typescriptEslintPlugin, // TypeScript rules
      unicorn: unicornPlugin, // Extended ESLint rules
    },
    // Global rules that apply to all files
    rules: {
      // Import sorting rules
      "simple-import-sort/exports": "error", // Enforce sorted exports
      "simple-import-sort/imports": "error", // Enforce sorted imports

      // Unicorn plugin rule customizations
      "unicorn/no-array-callback-reference": "off", // Disable specific rule
      "unicorn/no-array-for-each": "off", // Allow array.forEach
      "unicorn/no-array-reduce": "off", // Allow array.reduce
    },
  },
  // TypeScript-specific configuration
  {
    files: ["**/*.ts", "**/*.tsx"], // Applies only to TypeScript files
    languageOptions: {
      parser: typescriptEslintParser, // Use TypeScript parser
      parserOptions: {
        project: "./tsconfig.json", // Use project tsconfig
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // Warn on unused vars
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ], // Error on unused vars
      "@typescript-eslint/no-explicit-any": "warn", // Warn on 'any' usage
      "unicorn/prefer-module": "off", // Disable module preference rule
    },
  },
  // JavaScript-specific configuration
  {
    files: ["**/*.js, **/*.jsx"], // Applies only to JavaScript files
    rules: {
      "unicorn/prefer-module": "off", // Disable module preference rule
    },
  },
];

export default eslintConfig;
