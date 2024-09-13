import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginPrettier,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'type', 'parent', 'sibling', 'object', 'index'],
          pathGroupsExcludedImportTypes: [],
        },
      ],
      'todo-plz/ticket-ref': [
        'error',
        {
          commentPattern: 'TODO:\\s\\[(T-[0-9]+[,\\s]*)+\\]',
          description: 'Example: TODO: [T-123] Lorem ipsum dolor sit amet',
        },
      ],
      "react/react-in-jsx-scope": "off",
      'react/prop-types': 'off',
    },
  },
];
