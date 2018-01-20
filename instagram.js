var http = require('http');
var express = require('express');
var app = express();
var googleVision = require('./google-vision');

 
 // depresssdt
 // following personInNeedHelp
var userId;
var access_token;
app.set('view engine', 'ejs');
var port = process.env.PORT || 8080;
app.listen(port);

var api = require('instagram-node').instagram();

api.use({ client_id: '775a7679ca7149be98d1d2cf6774483d',
         client_secret: '15217d963f3a4bdfa0d11fda8c2c9fb8' });

var redirect_uri = 'http://localhost:8080/handleauth';
 
exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes','public_content', 'follower_list'], state: 'a state' }));
};
 
exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      userId = result.user.id;
      console.log("UserId: " + userId);
      var access_token_toUse = result.access_token;
      // console.log("User data: " + result.user);
      api.use({ client_id: '775a7679ca7149be98d1d2cf6774483d',
         client_secret: '15217d963f3a4bdfa0d11fda8c2c9fb8' ,
         access_token: access_token_toUse});
      // api.user(userId, function(err, result, remaining, limit){
      // 	console.log(result);
      // });
      api.user_follows(userId, function(err, users, pagination, remaining, limit) {
      	if (err) {
      		res.send(err);
      	} else {
      		// console.log("worked!");
      		users.forEach(function(follows){
      			var followerId = follows.id;
      			api.user_media_recent(followerId, function(err, medias, pagination, remaining, limit) {
      				medias.forEach(function(media) {
      					var imageURLToScan = media.images.standard_resolution.url;
      					console.log(imageURLToScan);
                googleVision.detectFaceExpression(imageURLToScan);
      				});
      			});
      		});
      		res.send('worked!');
         	}
      	// users.forEach(function(user){
      	// 	api.user_media_recent(user.id, function(err, medias, pagination, remaining, limit) {
      	// 		console.log(medias[0]);
      	// 	});
      	// });
      });
    }
  });
};
 
// This is where you would initially send users to authorize 
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
app.get('/handleauth', exports.handleauth);
 