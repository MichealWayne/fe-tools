module.exports = {  
  plugins: [
    require('autoprefixer') ({
        "browsers": ["last 2 versions", "ios_saf > 7", "Android > 2"],
        "cascade": true,
        "remove": true,
        "prefixOnSave": false
    })
  ]
};