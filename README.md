ES6 library starter
===========

[![Version](http://img.shields.io/npm/v/es6-library-minimal.svg)](https://www.npmjs.org/package/es6-library-minimal)
[![Build Status](https://travis-ci.org/liady/es6-library-minimal.svg?branch=master)](https://travis-ci.org/liady/es6-library-minimal)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

A boilerplate for a universal (Node, web, UMD) ES6 library.

## Quick usage
 1. Clone this repo.
 2. Change all relevant entries in `package.json` and `README.md`, so they match your new shiny library.
 3. Run `npm install` to install dev dependencies.
 4. Write your ES6 code in `src` folder.
 5. Write your ES6 tests in `test` folder.
 6. Run `npm build` to build for npm. This will output the result ES5 files to `lib` folder.
 7. Run `npm build-web` to build and pack the files for the web. This will output the result to `dist` folder.
 8. Run `npm publish` to pulish to the world.

## Detailed overview

### Installation
After cloning this repository, make sure to change all the relevant entries in `package.json` so they match your library.
```sh
npm install
```

### Build for npm
```sh
npm run build
```
This will:
 1. Convert all files in `src` folder from ES6 to ES5
 2. Minify them to a single file (and create source-maps)
 3. Output it to the `lib` folder

### Build for web
```sh
npm run build-web
```
This will:
 1. Run Webpack starting from the entry point file (`src/index.js`, can be configured).
 2. Convert all files from ES6 to ES5
 3. Minify them, **including all of their module dependencies** as a UMD module (so the file will be self-contained)
 4. Output the file to the `dist` folder

### Test
```sh
npm run test
```

### Configuration
In `package.json`, change all the relevant entries so they match your library.<br/>
Under the section `library`, you can configure:
 1. Library name (defaults to `"library"`)
 2. Webpack entry point (defaults to `src/index.js`)

## License
MIT
