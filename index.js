var pkg = require('./package.json');
var libFile = pkg.library['bundle-node'] ? pkg.library['dist-node'] : pkg.library['library.js'];
module.exports = require('./lib/' + libFile);