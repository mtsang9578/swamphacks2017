var express = require ('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var imageUpload = require('./image-upload')(app);
var emotionDetection = require('./emotion-detection');

require('./app/routes.js')(app);

var sampleText = "IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.";
emotionDetection.emotionResponce(sampleText, function(response) {
	console.log(JSON.stringify(response, null, 2));
});
app.use(morgan('dev'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
var port = process.env.PORT || 8080;
app.listen(port);
console.log("the app is listening on port " + port);

