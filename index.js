var libraryDesc = require('./library.json');
module.exports = require('./lib/' + libraryDesc.name + '.js');