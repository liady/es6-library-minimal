var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var path = require('path');

var libraryDesc = require('./library.json');
var libraryName = libraryDesc.name;
var libraryNameProd = libraryDesc.name + ".min";

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryNameProd + '.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
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
  plugins: plugins
};

module.exports = config