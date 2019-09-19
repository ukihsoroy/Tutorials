const path = require('path')

module.exports = {
  entry: 'preview/main.js',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(process.env.PACKAGECWD, 'src/')
      }
    }
  },
  devServer: {
    open: true
  }
}
