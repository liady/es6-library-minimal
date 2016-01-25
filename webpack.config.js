var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

// get library details from JSON config
var libraryDesc = require('./package.json').library;
var libraryName = libraryDesc.name;
var libraryEntryPoint = path.join('src', libraryDesc.entry);

module.exports = function getConfig(BUILD_ENV){

  var PROD = (BUILD_ENV || process.env.BUILD_ENV) === 'PROD';

  // determine output file name
  var outputName = PROD ? libraryName + '.min.js' : libraryName + '.js';

  // generate webpack config
  return {
    entry: path.join(__dirname, libraryEntryPoint),
    output: {
      path: path.join(__dirname, 'dist'),
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
    devtool: PROD ? 'source-map' : 'eval',
    debug: !PROD,
    plugins: PROD ? [
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
      new UglifyJsPlugin({ minimize: true })
      // Prod plugins here
    ] : [
      new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"development"'}})
      // Dev plugins here
    ]
  };
}