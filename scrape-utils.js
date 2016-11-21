const Promise = require('bluebird');
const unlink = Promise.promisify(require('fs').unlink);

const cleanUpFiles = (filename, directory) => {
	unlink(`${__dirname}/${directory}/${filename}.html`)
	.then(() => {
	  console.log('Deleted html file!');
	  unlink(`${__dirname}/${directory}/${filename}-full.txt`)
	  .then(() => {
	    console.log('Deleted full text file!');
	  })
	});
};

module.exports = { cleanUpFiles };