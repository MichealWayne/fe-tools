module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
  'no-var': 'off',
  'no-undef': 'off',
  'no-alert': 'off',
  'no-console': 'off',
  'spaced-comment': 'off',
  'space-before-function-paren': 'off',
  'no-mixed-spaces-and-tabs': 'off',
  'eqeqeq': 'off',
  'no-unreachable': 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};