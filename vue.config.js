module.exports = {
  "devServer": {
    "disableHostCheck": true,
    //"public": "https://beatrice.wvdev.tech",
    "public": "localhost",
    "host": "0.0.0.0",
    "port": 80,
    // "proxy": {
    //   '*': 'http://nginx',
    //   autoRewrite: true,
    //   changeOrigin: true,
    //   ignorePath: false,
    //   secure: false,
    // }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}