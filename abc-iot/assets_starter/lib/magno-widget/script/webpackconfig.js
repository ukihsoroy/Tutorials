const path = require('path')
const webpack = require('webpack')

let config = {
  entry: {
    main: ['../staticAssets/style.js',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ]
  },
  output: {
    filename: './stylebundle.js',
    path: path.resolve(__dirname, './')
  },
  resolve: {
    alias: {
      '@': process.env.PACKAGECWD
    }
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    }, {
      test: /\.(scss|sass)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [{
        loader: 'url-loader'
      }]
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      loader: 'file-loader'
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }]
  },
  context: path.resolve(__dirname, './'),
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = {
  config
}
