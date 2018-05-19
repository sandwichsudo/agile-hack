const express = require('express');
const path = require('path');
var request = require('request');

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

// Put all API endpoints under '/api'
app.get('/agile-prices', (req, res) => {
  request('https://api.octopus.energy/v1/products/AGILE-18-02-21/electricity-tariffs/E-1R-AGILE-18-02-21-C/standard-unit-rates/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(response)
    }
  })
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
