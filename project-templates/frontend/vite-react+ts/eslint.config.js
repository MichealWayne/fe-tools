const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**', '.eslintignore'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: true, node: true },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],
      'import/no-unresolved': 'error',
      'array-callback-return': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'off',
      eqeqeq: 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'space-before-function-paren': ['error', 'never'],
    },
  },
);
