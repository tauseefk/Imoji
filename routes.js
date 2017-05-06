'use strict';

const pictures = require('./app/js/pictures'),
  _ = require('ramda'),
  api = require('./app/js/instagram-node-helper'),
  fStems = require('./app/js/filteredStems'),
  axios = require('axios'),
  defString = "Quick brown fox jumped over a lazy dog",
  redirectURI = 'http://localhost:3000/auth',
  tokenManager = require('./app/js/tokenManager');

exports.home = function(req, res) {
  if(tokenManager.getAccessToken() === null) {
    res.redirect('/authorizeUser');
    return;
  }

  let html =
    '<!DOCTYPE html>'
       +'<html>'
         +'<head>'
          +'<title>Imoji</title>'
          +'<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0">'
          +'<meta charset="UTF-8">'
          +'<link rel="stylesheet" type="text/css" href="/app/css/main.css">'
         +'</head>'
         +'<body>'
           +'<div>'
             +'<article>'
               +'<div id="app" class="layoutSingleColumn u-margin-header">'
               +'</div>'
             +'</article>'
           +'</div>'
         +'</body>'
       +'</html>';
  res.send(html);
}

exports.authorizeUser = function(req, res) {
  res.redirect(api.get_authorization_url(redirectURI, { scope: ['public_content']}));
};

exports.handleAuth = function(req, res) {
  api.authorize_user(req.query.code, redirectURI, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      tokenManager.setAccessToken(result.access_token);
      api.use({
        access_token: result.access_token
      })
      res.redirect('/getTag');
    }
  });
};

exports.getPopular = function(req, res){
	api.media_popular(function(err, medias, limit){
		if(err){
			console.log(err);
			res.send("Could not fetch feed");
		} else {
			console.log('Feed fetched');
			res.send({
			  head: {
				  title: 'Picture'
			  },
			  homepage: {
				  title: 'Most Popular',
				  image: medias[0].images.thumbnail.url,
				  likes: medias[0].likes.count,
				  tags: medias[0].tags,
				  caption: medias[0].caption,
				  description: JSON.stringify(medias)
				}
			});
		}
	});
};

exports.getTag = function(req, res){
  axios.get(`https://api.instagram.com/v1/tags/pokemon/media/recent?access_token=${tokenManager.getAccessToken()}`)
  .then(function(res) {
    console.log(res.data);
  })
  .catch(console.log.bind(this))
  var convertStemToImage = _.compose(_.map(pictures), fStems);
  convertStemToImage(defString);
  res.send("blah!");
};
