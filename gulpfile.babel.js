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

gulp.task('build', () => 
  gulp.src([
    sources
  ])
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat(libFile))
    // Output files
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(libFolder))
);

gulp.task('build-web', ['webpack:build']);

gulp.task('build-web-dev', ['webpack:build-dev'], () => {
  gulp.watch([sources], ["webpack:build-dev"])
});

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

function setEnv(buildEnv){
  $.env({
    vars: {
      BUILD_ENV: buildEnv
    }
  });
}