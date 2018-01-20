module.exports = function (app, upload, cloudinary, passport) {
    path = require ('path');

//----------------------------PAGES------------------------------------------
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
     res.render('index.ejs');
    });

    // =====================================
    // Index
    // =====================================
   app.get('/index.html', function(req, res) {
     res.render('index.ejs');
    });

   // =====================================
    // Index1
    // =====================================
   app.get('/index1.html', function(req, res) {
     res.render('index1.ejs');
    });

    // =====================================
    // Index2
    // =====================================
   app.get('/index2.html', function(req, res) {
     res.render('index2.ejs');
    });

    // =====================================
    // Index3
    // =====================================
   app.get('/index3.html', function(req, res) {
     res.render('index3.ejs');
    });


    // =====================================
    // Login Home
    // =====================================
   app.get('/loginHome.html', function(req, res) {
     res.render('loginHome.ejs');
    });

    // =====================================
    // Login Page
    // =====================================
   app.get('/loginPage.html', function(req, res) {
     res.render('loginPage.ejs');
    });

    // =====================================
    // Resources
    // =====================================
   app.get('/resources.html', function(req, res) {
     res.render('resources.ejs');
    });

    // =====================================
    // Resources2
    // =====================================
   app.get('/resources2.html', function(req, res) {
     res.render('resources2.ejs');
    });

    // =====================================
    // Status
    // =====================================
   app.get('/status.html', function(req, res) {
     res.render('status.ejs');
    });

    // =====================================
    // Login Page
    // =====================================
   app.get('/loginPage.html', function(req, res) {
     res.render('loginPage.ejs');
    });

    // =====================================
    // uploadAnalysis
    // =====================================
   app.get('/uploadedAnalysis.html', function(req, res) {
     res.render('uploadedAnalysis.ejs');
    });

    // =====================================
    // upload page
    // =====================================
   app.get('/uploadPage.html', function(req, res) {
     res.render('uploadPage.ejs');
    });



    // =====================================
    // Upload
    // =====================================
    app.post('/upload', upload.array('files'), function (req, res) {
        var uploadedFiles = [];
        //Make sure the input name is file-to-upload
        //fs.rename(req.file.path, 'upload'/req.body.filename);
        // console.log(req.files);
        res.send('you were successful');
        //Sends to a remote database
        var i = 0;
        req.files.forEach(function(file){
            cloudinary.v2.uploader.upload(file.path, {
                folder:'uploads',
                use_filename:true
                }, function (error, result) {
                    i++;
                    if (error) {
                        console.log("error ocurred", error);
                    } else {
                        //saveSquirrelPic(result);
                        uploadedFiles.push(result.url);
                    }
                    if (i === req.files.length) {
                        console.log(uploadedFiles);
                    }
                }
            );
        });
        //fs.unlink(req.file.path, function(err, result) {if(err) console.log(err)});
    });

//----------------------------RESOURCES----------------------------------------

    // =====================================
    // Login Page
    // =====================================
   app.get('/resources/city.gif', function(req, res) {
     res.sendFile(path.join(__dirname, '/resources', 'city.gif'));
    });

    // =====================================
    // Login Page
    // =====================================
   app.get('/resources/city2.gif', function(req, res) {
     res.sendFile(path.join(__dirname, '/resources', 'city2.gif'));
    });

    // =====================================
    // Login Page
    // =====================================
   app.get('/resources/FemaleIcon.png', function(req, res) {
     res.sendFile(path.join(__dirname, '/resources', 'FemaleIcon.png'));
    });

    // =====================================
    // HomeIcon.png
    // =====================================
   app.get('/resources/HomeIcon.png', function(req, res) {
     res.sendFile(path.join(__dirname, '/resources', 'HomeIcon.png'));
    });

    // =====================================
    // MaleIcon.png
    // =====================================
   app.get('/resources/MaleIcon.png', function(req, res) {
     res.sendFile(path.join(__dirname, '/resources', 'MaleIcon.png'));
    });

    // =====================================
    // Text.css
    // =====================================
   app.get('/resources/text.css', function(req, res) {
     res.sendFile(path.join(__dirname, '/resources', 'text.css'));
    });

 // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);


//----------------------------User authentication----------------------------------------

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


