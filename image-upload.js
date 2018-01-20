
module.exports = function (app) {


let multer = require ('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
       cb(null, Date.now() + "." + file.mimetype.split('/')[1]);
    }
});


const upload = multer({storage: storage});

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'mtsang32',
    api_key: '489781664195457',
    api_secret: 'uo3KFpPvQPCGfavJrbafo9Sntzs'
});
require('./app/routes.js')(app, upload, cloudinary);
}