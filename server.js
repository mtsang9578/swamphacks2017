var express = require ('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var image-detection = require('./image-detection');
var word-detection = require('./word-detection');

require('./app/routes.js')(app);