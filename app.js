const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const scrape = require('./scraper');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

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
	res.render('index');
});

app.post('/submit', (req, res, next) => {
	scrape(req.body.url, req.body.filename, req.body.directory);
	setTimeout(() => {
		res.redirect(`/submit?url=${req.body.url}&dir=${req.body.directory}&name=${req.body.filename}`);
	}, 5000);
});

app.get('/submit', (req, res, next) => {
	res.render('submission', {
		submitted: true,
		url: req.query.url,
		dir: req.query.dir,
		name: req.query.name,
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