'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import pkg from './package.json';
import webpackConfig from "./webpack.config.js";

const $ = gulpLoadPlugins();
const libFolder = 'lib';
const libFile = pkg.library.name + '.js';
const sources = './src/**/*.js';

gulp.task('default', ['build', 'build-web']);

// Build as a Node library
gulp.task('build', ['lint'], () => 
  gulp.src([sources])
    .pipe($.babel())
    // Output files
    .pipe(gulp.dest(libFolder))
);

// Build for web
gulp.task('build-web', ['webpack:build']);

// Build for web + watch
gulp.task('build-web-dev', ['webpack:build-dev'], () => {
  gulp.watch([sources], ["webpack:build-dev"])
});

// Lint javascript
gulp.task('lint', () =>
  gulp.src(sources)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
);

// Webpack helper
gulp.task('webpack:build', (cb) => {
  setEnv('PROD');
  // run webpack
  webpack(webpackConfig('PROD'), (err, stats) => {
    if(err)
      throw new gutil.PluginError("webpack:build", err);
    $.util.log("[webpack:build]", stats.toString({colors: true}));
    cb();
  });
});

// Webpack watch helper
// create a single instance of the compiler to allow caching
var devCompiler = null;
gulp.task('webpack:build-dev', (cb) => {
  setEnv('DEV');
  if(!devCompiler){
      devCompiler = webpack(webpackConfig('DEV'));
  }
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err)
      throw new gutil.PluginError("webpack:build-dev", err);
    $.util.log("[webpack:build-dev]", stats.toString({colors: true}));
    cb();
  });
});

// Sets environment variable
function setEnv(buildEnv){
  $.env({
    vars: {
      BUILD_ENV: buildEnv
    }
  });
}