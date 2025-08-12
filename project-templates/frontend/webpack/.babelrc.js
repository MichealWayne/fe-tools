// document: https://babeljs.io/docs/en/configuration

module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: 'defaults',
      loose: true 
    }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};
