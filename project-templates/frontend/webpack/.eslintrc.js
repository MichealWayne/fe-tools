module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: true,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended'],
  rules: {}
};
EOF < /dev/null
