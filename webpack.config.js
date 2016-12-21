
let BUILD_DIR = path.resolve(__dirname, 'www/js');
let APP_DIR = path.resolve(__dirname, 'src');

let config = {
  entry: APP_DIR + '/app.js',
  output: {
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    preLoaders: [
       {
         test: /\.js$/,
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
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  },
}

export default config;
