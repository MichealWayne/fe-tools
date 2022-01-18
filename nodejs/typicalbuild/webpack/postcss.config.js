// document https://github.com/webpack-contrib/postcss-loader

module.exports = {
  plugins: [
    // document https://github.com/postcss/autoprefixer#using-environment-variables-to-support-css-grid-prefixes-in-create-react-app
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ios_saf > 7', 'Android > 2'],
      cascade: true,
      remove: true,
      prefixOnSave: false,
    }),
  ],
};
