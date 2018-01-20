module.exports = function (app, passport) {
     // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.send("this is the front page"); // load the index.ejs file
    });
}