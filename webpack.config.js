var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var PROD = JSON.parse(process.env.PROD_DEV || "0");
var path = require('path');

// get library details from JSON config
var libraryDesc = require('./library.json');
var libraryName = libraryDesc.name;
var libraryEntryPoint = libraryDesc.entry;

// determine output file name
var outputName = PROD ? libraryName + '.min.js' : libraryName + '.js';

// generate webpack config
var config = {
  entry: __dirname + libraryEntryPoint,
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputName,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      {test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "eslint-loader"}
    ],
    loaders: [
      {test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader"},
    ]
  },
  eslint: {
      configFile: './.eslintrc'
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: PROD ? [
    new UglifyJsPlugin({ minimize: true })
    // Prod plugins here
  ] : [
    // Dev plugins here
  ]
};

module.exports = config