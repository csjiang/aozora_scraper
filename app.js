const express = require('express');
const fs = require('fs');
const request = require('request');
const morgan = require('morgan');
const app = express();
const _ = require('lodash');
const scrape = require('./scraper');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
// const multer  = require('multer');
// const upload = multer();

app.use(morgan('tiny'));

nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.redirect('/scrape');
});

app.get('/scrape', (req, res) => {
	
	res.render('index', {
		submitted: false
		});
	});
	// //URL to scrape from
	// const url = './midare.html';

	// request(url, (error, html) => {
	// 	console.log('made request');

	// 	if(!error) {
	// 		let $ = cheerio.load(html);

	// 		let title, author, biblioInfo;
	// 		let json = { 
	// 			title: '',
	// 			author: '',
	// 			biblioInfo: ''
	// 		};

	// 		$('.metadata').filter(() => {

	// 			const data = $(this);
	// 			title = data.children().first().text();
	// 			author = data.children.last.children.text();

	// 			json.title = title;
	// 			json.author = author;
	// 		});
	// 		json.biblioInfo = $('.bibliographical_information').text();
	// 		let $contents = $('.main_text').html();

	// 		fs.writeFile(__dirname + '/book/HTML/midare.html', $contents, (err) => {
	// 			console.log('midare.html successfully written to the book/HTML folder!');
	// 		});

	// 		fs.writeFile(__dirname + '/book/data.json', JSON.stringify(json, null, 4), (err) => {
	// 			console.log('book data has been successfully written to data.json!');
	// 		});
	// 	}
	// });

app.post('/submit', (req, res, next) => {
	scrape(req.body.url, req.body.filename, req.body.directory)
	console.log(req.body);
	res.redirect('/submit');
});

app.get('/submit', (req, res, next) => {
	res.render('index', {
		submitted: true
	});
});

app.use((err, req, res, next) => {
	console.error(err, err.stack);
	res.status(err.status || 500);
	res.send(); 
});

app.listen(3000, function(err) {
	if (err) return console.error(err);
	console.log(`Port 3K is where it's at!`);
});

exports = module.exports = app;