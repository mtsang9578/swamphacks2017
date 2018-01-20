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




}