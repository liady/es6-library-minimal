ES6 library starter
===========

[![Version](http://img.shields.io/npm/v/es6-library-minimal.svg)](https://www.npmjs.org/package/es6-library-minimal)
[![Build Status](https://travis-ci.org/liady/es6-library-minimal.svg?branch=master)](https://travis-ci.org/liady/es6-library-minimal)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat)](https://github.com/airbnb/javascript)

> A boilerplate for a universal (Node, web, UMD) ES6 library.

## Quick usage
 1. Clone this repo.
 2. Change all relevant entries in `package.json` and `README.md`, so they match your new shiny library.
 3. Run `npm install` to install dev dependencies.
 4. Write your ES6 code in `src` folder.
 5. Write your ES6 tests in `test` folder.
 6. Run `npm run build` to build for node. This will compile to ES5, minify, and output the result to `lib` folder.
 7. Run `npm run build-web` to build and pack the files for the web. This will output the result to `dist` folder.
 8. Run `npm publish` to pulish to the world.
 
(Or, if you don't need Webpack bundling, you can use the [even lighter ES6 starter](https://github.com/liady/es6-lib-starter-light)).

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
 1. Run Webpack starting from the entry point file (`src/library.js`, can be configured)
 2. Convert all files in `src` folder from ES6 to ES5
 3. According to the `bundle-node` flag in `package.json`, it will either:
   1. Leave them as separate files, or -
   2. Minify and bundle them using Webpack, **without their** `node_modules` **dependencies**
 4. Output the result to the `lib` folder

### Build for web
```sh
npm run build-web
```
This will:
 1. Run Webpack starting from the entry point file (`src/library.js`, can be configured)
 2. Convert all files from ES6 to ES5
 3. Minify them, **including all of their module dependencies**, as a UMD module (so the file will be self-contained)
 4. Output the file to the `dist` folder

### Test
```sh
npm run test
```

### Configuration
In `package.json`, change all the relevant entries so they match your library.<br/>
Under the section `library`, you can configure:
 1. Library name (defaults to `"Library"`)
 2. Webpack entry point (defaults to `library.js`)
 3. Dist folder for Node (defaults to `lib`)
 4. Dist folder for Web (defaults to `dist`)
 5. Choose whether to bundle for Node (defaults to `true`)

## License
MIT
