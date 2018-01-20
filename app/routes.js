module.exports = function (app, upload, cloudinary) {
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
    // Upload
    // =====================================
    app.post('/upload', upload.single('file-to-upload'), function (req, res) {
        //Make sure the input name is file-to-upload
        //fs.rename(req.file.path, 'upload'/req.body.filename);
        console.log(req.file);
        res.send('you were successful');

        //Sends to a remote database
        cloudinary.v2.uploader.upload(req.file.path, {
            folder:'uploads',
            use_filename:true
            }, function (error, result) {
                if (error) {
                    console.log("error ocurred", error);
                } else {
                    //saveSquirrelPic(result);
                    console.log(result);
                }
            }
        );
        //fs.unlink(req.file.path, function(err, result) {if(err) console.log(err)});
    });

//----------------------------RESOURCES----------------------------------------


}