ES6 library starter
===========

[![Version](http://img.shields.io/npm/v/es6-library-minimal.svg)](https://www.npmjs.org/package/es6-library-minimal)
[![Build Status](https://travis-ci.org/liady/es6-library-minimal.svg?branch=master)](https://travis-ci.org/liady/es6-library-minimal)

A boilerplate for a universal (Node, web, UMD) ES6 library.

# Installation
```sh
npm install
```

# Build for npm
```sh
npm run build
```
This will:
1. Convert all files in `src` folder from ES6 to ES5
2. Minify them (and create source-maps)
3. Output them to then `lib` folder

# Build for web
```sh
npm run build-web
```
This will:
1. Run Webpack starting from the entry point file (`src/index.js`, can be configured).
2. Convert all files from ES6 to ES5
3. Minify them, **including all of their module dependencies** as a UMD module (so the file will be self-contained)
4. Output the file to the `dist` folder

# Test
```sh
npm run test
```

# Configuration
In `package.json`, under the section `library`, you can configure:
1. Library name (defaults to `library`)
2. Webpack entry point (defaults to `src/index.js`)

# License
MIT