var express = require ('express');
var app = express();
var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


//CONFIG
var configDB = require('./config/database.js');


//OTHER STUFF
//var imageUpload = require('./image-upload')(app);
var emotionDetection = require('./emotion-detection');
//var googleVision = require('./google-vision');

var sampleText = "IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.";
emotionDetection.emotionResponce(sampleText, function(response) {
 	console.log(JSON.stringify(emotionDetection.aggregateWatsonData_average_topThree(response), null, 2));
 });
// emotionDetection.toneResponce(sampleText, function(response) {
//  	console.log(JSON.stringify(response, null, 2));
//  });

//MULTER THINGS
let multer = require ('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
       cb(null, Date.now()+file.mimetype.split('/')[0]);
    }
});


const upload = multer({storage: storage});

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'mtsang32',
    api_key: '489781664195457',
    api_secret: 'uo3KFpPvQPCGfavJrbafo9Sntzs'
});
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

//EXPRESS SETUP
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'ejs');


//PASSPORT AUTH SET UP
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


require('./app/routes.js')(app, upload, cloudinary, passport); // load our routes and pass in our app and fully configured passport

app.listen(port);
console.log("the app is listening on port " + port);
//googleVision.detectLabels("fuckIfIKnow");



// ------------------------------------------------------------------------------
// var express  = require('express');
// var app      = express();
// var port     = process.env.PORT || 8080;
// var mongoose = require('mongoose');
// var passport = require('passport');
// var flash    = require('connect-flash');

// var morgan       = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser   = require('body-parser');
// var session      = require('express-session');

// var configDB = require('./config/database.js');


// //MULTER THINGS
// let multer = require ('multer');
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//        cb(null, Date.now()+file.mimetype.split('/')[0]);
//     }
// });


// const upload = multer({storage: storage});

// const cloudinary = require('cloudinary');
// cloudinary.config({
//     cloud_name: 'mtsang32',
//     api_key: '489781664195457',
//     api_secret: 'uo3KFpPvQPCGfavJrbafo9Sntzs'
// });


// // configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

// // set up our express application
// app.use(morgan('dev')); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser()); // get information from html forms

// app.set('view engine', 'ejs'); // set up ejs for templating

// // required for passport
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// // routes ======================================================================
// require('./app/routes.js')(app, upload, cloudinary, passport); // load our routes and pass in our app and fully configured passport

// // launch ======================================================================
// app.listen(port);
// console.log('The magic happens on port ' + port);

