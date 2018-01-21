var analysis = require('./process-screenshots.js');
var emotionAnalysis = require('../emotion-detection.js');
var googleVision = require('../google-vision');
var api = require('instagram-node').instagram();
module.exports = function (app, upload, cloudinary, passport) {
    path = require('path');

    //----------------------------PAGES------------------------------------------
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });


    var User = require('./models/user.js');
    // =====================================
    // Index
    // =====================================
   app.get('/index.html', isLoggedIn, function(req, res) {
    res.render('index.ejs');
    });


    // =====================================
    // Index1
    // =====================================
    app.get('/index1.html', function (req, res) {
        res.render('index1.ejs');
    });

    // =====================================
    // Index2
    // =====================================
    app.get('/index2.html', isLoggedIn, function (req, res) {
        res.render('index2.ejs');
    });

    // =====================================
    // Index3
    // =====================================
    app.get('/index3.html', isLoggedIn, function (req, res) {
        res.render('index3.ejs');
    });


    // =====================================
    // Login Home
    // =====================================
    app.get('/loginHome.html', isLoggedIn, function (req, res) {
        res.render('loginHome.ejs');
    });

    // =====================================
    // Login Page
    // =====================================
    app.get('/loginPage.html', isLoggedIn, function (req, res) {
        res.render('loginPage.ejs');
    });

    // =====================================
    // Resources
    // =====================================
    app.get('/resources.html', isLoggedIn, function (req, res) {
        res.render('resources.ejs');
    });

    // =====================================
    // Resources2
    // =====================================
    app.get('/resources2.html', isLoggedIn, function (req, res) {
        res.render('resources2.ejs');
    });

    // =====================================
    // Status
    // =====================================
    app.get('/status.html', isLoggedIn, function (req, res) {
        res.render('status.ejs', req.user);
    });

    // =====================================
    // Login Page
    // =====================================
    app.get('/loginPage.html', function (req, res) {
        res.render('loginPage.ejs');
    });

    // =====================================
    // uploadAnalysis
    // =====================================
    app.get('/uploadedAnalysis.html', isLoggedIn, function (req, res) {
        res.render('uploadedAnalysis.ejs');
    });

    // =====================================
    // upload page
    // =====================================
    app.get('/uploadPage.html', isLoggedIn, function (req, res) {
        res.render('uploadPage.ejs');
    });


    // =====================================
    // Login Home
    // =====================================
    app.get('/loginHome.html', isLoggedIn, function (req, res) {
        res.render('loginHome.ejs');
    });

    // =====================================
    // Analysis
    // =====================================
    app.get('/uploadedAnalysis.html', isLoggedIn, function (req, res) {
        res.render('uploadAnalysis.ejs');
    });


    //----------------------------UPLOAD----------------------------------------

    var googleDetection = require('../google-vision.js');

    // =====================================
    // Upload
    // =====================================
    app.post('/upload', isLoggedIn, upload.array('files'), function (req, res) {
        var uploadedFiles = [];
        //Make sure the input name is file-to-upload
        //fs.rename(req.file.path, 'upload'/req.body.filename);
        // console.log(req.files);
        //Sends to a remote database
        var i = 0;
        req.files.forEach(function (file) {
            cloudinary.v2.uploader.upload(file.path, {
                folder: 'uploads',
                use_filename: true
            }, function (error, result) {
                //SAVES IMAGES TO DATABASE ON UPLOAD

                i++;
                if (error) {
                    console.log("error ocurred", error);
                } else {
                    //saveSquirrelPic(result);
                    uploadedFiles.push(result.url);
                }
                if (i === req.files.length) {
                    //First perform analysis
                    analysis.concentrateText(uploadedFiles, function (json) {
                        //Once finished, save the url's to the database;
                        var date;
                        if (!req.body.date){
                            date = Date.now();
                        } else {
                            date = req.body.date;
                        }
                        var avgAnalysis = emotionAnalysis.aggregateWatsonData_average_topThree(json);
                        var diagnosis = emotionAnalysis.calculateResponse(avgAnalysis);
                        req.user.screenshotCollections.push({
                            'urls': uploadedFiles,
                            'description': " ",
                            'conversationDate':date,
                            'analysis': json,
                            'averageAnalysis': avgAnalysis,
                            'diagnosis': diagnosis
                        });

                        var analysisData = req.user.screenshotCollections[req.user.screenshotCollections.length - 1];

                        var query = {
                            '_id': req.user._id
                        };
                        User.findOneAndUpdate(query, req.user, {
                            upsert: true
                        }, function (err, doc) {
                            if (err) res.send(500, {
                                error: err
                            });
                            console.log(analysisData);
                            res.render('uploadAnalysis.ejs', analysisData);
                        });
                    });
                }
            });
            //fs.unlink(req.file.path, function(err, result) {if(err) console.log(err)});
        });
    });


        //GENERATES AN ANALYSIS USING GOOGLE VISION STUFF


    // =====================================
    // Load Analysis
    // =====================================
    app.post('/loadAnalysis', function (req,res) {
        var index = req.body.index;
        console.log(req.body);
        var collection = req.user.screenshotCollections[index];
        console.log(collection);
        res.render('uploadAnalysis.ejs', collection);
    });
    app.post('/uploadInsta', isLoggedIn,  function (req, res) {
        var imageData = JSON.parse(req.body.stringifedFaceJSON);
        var imgURL = req.body.instagramPicUrl;
        var userName2 = req.body.usernameToSearch;
        res.render('uploadAnalysisInsta.ejs', {'imgData': imageData, 'imgURL': imgURL, 'username': userName2});
    });







    //----------------------------RESOURCES----------------------------------------

    // =====================================
    // Login Page
    // =====================================
    app.get('/resources/city.gif', function (req, res) {
        res.sendFile(path.join(__dirname, '/resources', 'city.gif'));
    });

    // =====================================
    // Login Page
    // =====================================
    app.get('/resources/city2.gif', function (req, res) {
        res.sendFile(path.join(__dirname, '/resources', 'city2.gif'));
    });

    // =====================================
    // Login Page
    // =====================================
    app.get('/resources/FemaleIcon.png', function (req, res) {
        res.sendFile(path.join(__dirname, '/resources', 'FemaleIcon.png'));
    });

    // =====================================
    // HomeIcon.png
    // =====================================
    app.get('/resources/HomeIcon.png', function (req, res) {
        res.sendFile(path.join(__dirname, '/resources', 'HomeIcon.png'));
    });

    // =====================================
    // MaleIcon.png
    // =====================================
    app.get('/resources/MaleIcon.png', function (req, res) {
        res.sendFile(path.join(__dirname, '/resources', 'MaleIcon.png'));
    });

    // =====================================
    // Text.css
    // =====================================
    app.get('/resources/text.css', function (req, res) {
        res.sendFile(path.join(__dirname, '/resources', 'text.css'));
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);


    //----------------------------User authentication----------------------------------------

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/loginHome.html', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/loginHome.html', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // ----------------------------instragram redirects -------------------------
    // This is where you would initially send users to authorize
    app.get('/authorize_user', exports.authorize_user);
    // This is your redirect URI
    app.get('/handleauth', exports.handleauth);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//---------------------------------Instagram------------------------------------------
api.use({
    client_id: '775a7679ca7149be98d1d2cf6774483d',
    client_secret: '15217d963f3a4bdfa0d11fda8c2c9fb8'
});

var redirect_uri = 'http://localhost:8080/handleauth';

exports.authorize_user = function (req, res) {
    api.use({
        client_id: '775a7679ca7149be98d1d2cf6774483d',
        client_secret: '15217d963f3a4bdfa0d11fda8c2c9fb8'
    });
    res.redirect(api.get_authorization_url(redirect_uri, {
        scope: ['likes', 'public_content', 'follower_list'],
        state: 'a state'
    }));
};

exports.handleauth = function (req, res) {
    api.authorize_user(req.query.code, redirect_uri, function (err, result) {
        if (err) {
 
      console.log(err.body);
 
      res.send("Didn't work");
 
    } else {
 
      console.log('Yay! Access token is ' + result.access_token);
 
      userId = result.user.id;
 
      console.log("UserId: " + userId);
 
      var access_token_toUse = result.access_token;
 
      // console.log("User data: " + result.user);
 
      if (!api.access_token){
 
        console.log("did not accessed token!");
 
      }
 
      api.use({ client_id: '775a7679ca7149be98d1d2cf6774483d',
 
         client_secret: '15217d963f3a4bdfa0d11fda8c2c9fb8' ,
 
         access_token: access_token_toUse});
 
      if (api.access_token){
 
        console.log("accessed token!");
 
      }
 
      // api.user(userId, function(err, result, remaining, limit){
 
      //    console.log(result);
 
      // });
 
      api.user_follows(userId, function(err, users, pagination, remaining, limit) {

            users.forEach(function(follows){
                var followerId = follows.id;
                follows.posts = [];
                api.user_media_recent(followerId, function(err, medias, pagination, remaining, limit) {
                    medias.forEach(function(media) {
                        follows.posts.push(media);
                        var imageURLToScan = media.images.standard_resolution.url;
                        googleVision.detectFaceExpression(imageURLToScan, function(faces) {
                            var fData = {
                                "joy": faces[0].joyLikelihood,
                                "anger": faces[0].angerLikelihood,
                                "sorrow": faces[0].sorrowLikelihood,
                                "surprise": faces[0].surpriseLikelihood
                            }
                            res.render('instaUploadAuthed.ejs', {instagram:true, userid: userId, follows: users, imgUrl: imageURLToScan, faceData : JSON.stringify(fData)});
                        });
                    });
                });
                // users.forEach(function(user){
                //  api.user_media_recent(user.id, function(err, medias, pagination, remaining, limit) {
                //      console.log(medias[0]);
                //  });
                // });
            });
            });
        // users.forEach(function(user){
        //  api.user_media_recent(user.id, function(err, medias, pagination, remaining, limit) {
        //      console.log(medias[0]);
        //  });
        // });
      };
    });
  }
// ------------------------ twitter --------------------------------------------
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});