const phantom = require('phantom');
const Promise = require('bluebird');
const writeFile = Promise.promisify(require('fs').writeFile);
const getMainText = function () {
  return $(".main_text").html();
};

const scrape = (url, filename, directory/*, json*/) => {
  phantom.create().then((ph) => {
    ph.createPage().then((page) => {
      page.open(url).then((status) => {
        console.log("Attempting to open site: ", status);         
        page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js')
        .then(() => {
          page.evaluate(getMainText)
          .then((maintext) => {
              writeFile(__dirname + `/${directory}/${filename}.html`, maintext)
                .then(() => {
                console.log(`Contents successfully scraped to ${__dirname}/${directory}/${filename}.html!`);
                })
                .then(() => {
                  page.close();
                  ph.exit();
                });
              });
            });
          });
        });
      })
      .catch((err) => {
      console.error('Oops! An error!');;
    });
  };

module.exports = scrape;