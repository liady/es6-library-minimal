var libraryDesc = require('../package.json').library;
module.exports = require('./' + libraryDesc.name + '.js');