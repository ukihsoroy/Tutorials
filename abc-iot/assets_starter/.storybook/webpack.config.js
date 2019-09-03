const path = require('path');
const webpack = require('webpack');
const customConfig = require(process.env.CURR_DIR + '/config');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  
  config.module.rules.push({
     test: /\.(png|jpg|jpeg|gif|svg)$/,
     use: [{
        loader: 'url-loader'
     }]
  });
  
  config.module.rules.push({
     test: /\.(ttf|eot|woff|woff2)$/,
     use: [{
        loader: 'file-loader'
     }]
  });
  
  config.module.rules.push({
    test: /\.(s(c|a)ss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  });
  
  config.module.rules.push({
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
  });

  config.module.rules.push({
    test: /\.styl$/,
    use: ['style-loader', 'css-loader', 'stylus-loader']
  });

  config.module.rules.push({
    resourceQuery: /lockType=i18n/,
    type: 'javascript/auto',
    loader:  ['@kazupon/vue-i18n-loader', 'yaml-loader']
  });

  config.plugins.push(new webpack.EnvironmentPlugin({
    'loginaccount': customConfig.username,
    'password': customConfig.password,
    'CURR_DIR': process.env.CURR_DIR
  }));
  return config;
};