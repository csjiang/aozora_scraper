const phantom = require('phantom');
const Promise = require('bluebird');
const writeFile = Promise.promisify(require('fs').writeFile);
const lineReader = require('line-reader');
const eachLine = Promise.promisify(lineReader.eachLine);
const readFile = Promise.promisify(require('fs').readFile);
const getMainText = function () {
  return $(".main_text").html();
};
const parseText = require('./parse');
const cleanUpFiles = require('./scrape-utils');

const scrape = (url, filename, directory/*, json*/) => {
  phantom.create().then((ph) => {
    ph.createPage().then((page) => {
      page.open(url).then((status) => {
        console.log("Attempting to open site: ", status);         
        page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js')
        .then(() => {
          page.evaluate(getMainText)
          .then((maintext) => {
            writeFile(`${__dirname}/${directory}/${filename}.html`, maintext)
              .then(() => {
              console.log(`Contents successfully scraped to ${__dirname}/${directory}/${filename}.html!`);
              })
              .then(() => {
                readFile(`${__dirname}/${directory}/${filename}.html`)
                .then((contents) => {
                  console.log('file read!');
                  const textString = parseText(contents.toString());
                  console.log(textString);
                  writeFile(`${__dirname}/${directory}/${filename}-full.txt`, textString).then(() => {
                      console.log(`wrote whole text to ${filename}-full.txt!`);
                  })
                  .then(() => {
                  let chapnum = 0;
                  eachLine(`${__dirname}/${directory}/${filename}-full.txt`, {separator: '==**=='}, function(line) {
                      chapnum++;
                      writeFile(`${__dirname}/${directory}/${filename}-${chapnum}.txt`, line)
                      .then(() => {
                        console.log(`wrote chapter ${chapnum}.txt!`);
                        })
                  }).then(() => {
                    console.log('done reading and writing files!');
                    cleanUpFiles(filename, directory);
                  })
                  .catch((err) => {
                    console.error(err);
                  })
                })
                .then(() => {
                page.close();
                ph.exit();
                })
              });
            });
            });
          });
        });
      })
      .catch((err) => {
      console.error('Oops! An error!');;
    });
  })
};
module.exports = scrape;