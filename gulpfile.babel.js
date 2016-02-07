'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import del from 'del';
import pkg from './package.json';
import webpackConfig from "./webpack.config.js";

const $ = gulpLoadPlugins();
const libFolder = 'lib';
const sources = './src/**/*.js';

gulp.task('default', ['build', 'build-web']);

// Build for node
gulp.task('build', pkg.library['bundle-node'] ? ['webpack:build-node'] : ['build-babel']);

// Build for node + watch
gulp.task('build-dev', ['webpack:build-node-dev'], () => {
  gulp.watch([sources], ['webpack:build-node-dev'])
});

// Build for web
gulp.task('build-web', ['webpack:build-web']);

// Build for web + watch
gulp.task('build-web-dev', ['webpack:build-web-dev'], () => {
  gulp.watch([sources], ['webpack:build-web-dev'])
});

// Run Babel only
gulp.task('build-babel', ['clean', 'lint'], () => 
  gulp.src([sources])
    .pipe($.babel())
    // Output files
    .pipe(gulp.dest(libFolder))
);

// Lint javascript
gulp.task('lint', () =>
  gulp.src(sources)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
);

// Clean folder
gulp.task('clean', () =>
  del([`${libFolder}/**/*`])
);

// Webpack helper
gulp.task('webpack:build-web', done => {
  var env = {'BUILD_ENV':'PROD', 'TARGET_ENV': 'WEB'};
  var taskName = 'webpack:build-web';
  // run webpack
  webpack(webpackConfig(env), onBuild(done, taskName));
});

// Webpack watch helper
// create a single instance of the compiler to allow caching
var webDevCompiler = null;
gulp.task('webpack:build-web-dev', done => {
  var env = {'BUILD_ENV':'DEV', 'TARGET_ENV': 'WEB'};
  var taskName = 'webpack:build-web-dev';
  // build dev compiler
  if(!webDevCompiler){
      webDevCompiler = webpack(webpackConfig(env));
  }
  // run webpack
  webDevCompiler.run(onBuild(done, taskName));
});

// Webpack helper
gulp.task('webpack:build-node', done => {
  var env = {'BUILD_ENV':'PROD', 'TARGET_ENV': 'NODE'};
  var taskName = 'webpack:build-node';
  // run webpack
  webpack(webpackConfig(env), onBuild(done, taskName));
});

// Webpack watch helper
// create a single instance of the compiler to allow caching
var nodeDevCompiler = null;
gulp.task('webpack:build-node-dev', done => {
  var env = {'BUILD_ENV':'DEV', 'TARGET_ENV': 'NODE'};
  var taskName = 'webpack:build-node-dev';
  // build dev compiler
  if(!nodeDevCompiler){
      nodeDevCompiler = webpack(webpackConfig(env));
  }
  // run webpack
  nodeDevCompiler.run(onBuild(done, taskName));
});

function onBuild(done, taskName){
  return (err, stats) => {
    if(err)
      throw new gutil.PluginError(taskName, err);
    $.util.log(`${taskName}`, stats.toString({colors: true}));
    done && done();
  }
}

// Sets environment variable
function setEnv(buildEnv){
  $.env({
    vars: {
      BUILD_ENV: buildEnv
    }
  });
}