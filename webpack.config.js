var path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'www/js');
let APP_DIR = path.resolve(__dirname, 'src');

let config = {
  entry: APP_DIR + '/PaymentPage.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  watch: true,
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  },
}

module.exports = config;
