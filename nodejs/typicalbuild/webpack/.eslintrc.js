// document: https://eslint.org/docs/user-guide/configuring

module.exports = {
  parser: 'babel-eslint',
  extends: 'enough',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'array-callback-return': [0],
    'comma-dangle': [0],
    'no-var': [0],
    'no-trailing-spaces': [0],
    'space-before-blocks': [0],
    // 'prefer-const': [1],
    'prefer-arrow-callback': [0],
    'new-cap': [0],
    'quote-props': [0],
    'valid-jsdoc': [0],
    'prefer-spread': [0],
    'keyword-space': [0],
    'dot-notation': [0],
    'prefer-rest-params': [0],
    'padded-blocks': [0],
    'no-undef': [0],
    'no-multi-spaces': [0],
    'no-unused-expressions': [0],
    'no-unreachable': [0],
    'no-extra-semi': [0],
    'no-empty': [0],
    'no-array-constructor': [0],
    quotes: [0],
    'no-extra-parens': [0],
    'space-in-parens': [0],
    'wrap-iife': [0],
    'object-shorthand': [0],
    'func-call-spacing': [0],
    eqeqeq: [0],
    indent: [0],
    semi: [0],
    'no-unused-vars': [
      2,
      {
        vars: 'local',
        args: 'none',
      },
    ],
    'no-mixed-spaces-and-tabs': [0],
    'no-console': [0],
    'space-before-function-paren': [0],
    'spaced-comment': [0],
    'no-alert': [0],
    'linebreak-style': ['off', 'windows'],
  },
};
