var express = require ('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var imageUpload = require('./image-upload')(app);
var wordDetection = require('./word-detection');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;
app.listen(port);
console.log("the app is listening on port " + port);
