module.exports = {
  entry: process.env.PACKAGECWD + '/src/index',
  output: {
    dir: process.env.PACKAGECWD + '/dist',
    format: 'umd',
    moduleName: `${process.env.WIDGETNAME}_component`
  },
  configureWebpack: {
    externals: {
      vue: 'Vue'
    },
    module: {
      rules: [{
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: ['@kazupon/vue-i18n-loader', 'yaml-loader']
      }]
    }
  }
}
