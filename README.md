# aozora_scraper
PhantomJS, Node, Expressを使ったシンプルなスクレーパーです。A simple web scraper for Aozora Bunko using PhantomJS, Node, and Express. I created this because there were texts I wanted from Aozora but Aozora only had the HTML version. The app as it stands will visit the URL supplied, scrape the HTML, parse the HTML into a .txt file, and then split the .txt file into numbered chapters. 

### To use: (GUI Version) 
1. `npm install` 
2. `node app` to start the server
3. Visit http://localhost:3000/ using your browser of choice
4. Specify the URL to scrape, directory to scrape to (it must exist already) and what you'd like to call the filename. 
5. Click 'go' and watch the magic happen! 

### To use: (CLI Version) 
*In progress* 

### Features coming down the pipeline: 
1. CLI support (will allow you to run the scraper without starting a server instance)
2. Option to include a JSON file with information about the book while scraping the text
3. Search feature and/or integration with an existing Aozora API to facilitate scraping when you don't know the URL of a text
4. ???

### Dependencies: 
1. phantom
2. bluebird
3. morgan
4. body-parser
5. nunjucks
6. Express
