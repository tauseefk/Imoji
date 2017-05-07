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

exports.getTag = function(req, res){
  var convertStemToImage = _.compose(_.map(pictures), fStems);
  Promise.all(convertStemToImage(defString))
  .then(images => res.send(images))
  .catch(err => res.send(err));
};
