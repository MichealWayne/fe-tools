// document: https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"]
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "import"],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: true,
      node: true
    }
  },
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "no-alert": "warn",
    "no-unused-vars": "off",

    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true }
      }
    ],
    "import/no-unresolved": "error",

    "array-callback-return": "off",
    "comma-dangle": "off",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "off",
    eqeqeq: "warn",
    semi: ["error", "always"],
    quotes: ["error", "single"],
    indent: ["error", 2],
    "space-before-function-paren": ["error", "never"]
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
};