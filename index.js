var pkg = require('./package.json');
module.exports = require('./lib/' + pkg.library.name + '.js');