module.exports = function (app, upload, cloudinary) {
     // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });
    //------------------------------------------------------
    //Upload
    //------------------------------------------------------
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
                    saveSquirrelPic(result);
                    console.log(result);
                }
            }
        );
        //fs.unlink(req.file.path, function(err, result) {if(err) console.log(err)});
    });

}