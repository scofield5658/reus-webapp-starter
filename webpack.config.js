const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.vue$/i,
        exclude: /node_modules/i,
        loader: 'vue-loader',
        options: {
          extractCSS: config.env === 'production'
        }
      },
      {
        test: /\.pcss$/i,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
      },
      {
        test: config.assets,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${config.env}"`,
        TEST_ENV: `"${config.test}"`,
        BASE_URL: `"${config.baseUrl}"`,
        CDN_URL: `"${config.cdnUrl}"`,
        TARGET: '"client"'
      }
    }),
    //new ExtractTextPlugin("styles.css"),
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
    */
  ],
  devtool: 'inline-source-map'
};

