module.exports = {
  entry: './index.js',
  output: {
    format: 'umd',
    moduleName: 'theme-chalk',
    minimize: true,
    fileNames: {
      css: 'assets/css/[name].css'
    }
  },
  css: {
    extract: true
  }
}
