'use strict';

const React = require('react'),
compose = require('ramda').compose,
map = require('ramda').map,
curry = require('ramda').curry,
api = require('./app/js/instagram-node-helper'),
pictures = require('./app/js/pictures'),
fStems = require('./app/js/filteredStems'),
axios = require('axios'),
defString = 'people from california and florida',
redirectURI = process.env.APP_ADDRESS + process.env.REDIRECT_URI,
tokenManager = require('./app/js/tokenManager');

const trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
  }),
  tags = curry((access_token, t) => `https://api.instagram.com/v1/tags/${t}/media/recent?access_token=${access_token}`);

exports.home = function(req, res) {
  if(tokenManager.getAccessToken() === null) {
    res.redirect('/authorizeUser');
    return;
  } else {
    homeWithToken(req, res);
  }
}

function homeWithToken(req, res) {
  const html =
  '<!DOCTYPE html>'
  +'<html>'
  +'<head>'
  +'<title>Imoji</title>'
  +'<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0">'
  +'<meta charset="UTF-8">'
  +'<meta name="description" content="An application to turn text messages to picture messages.">'
  +'<meta name="keywords" content="pictures, instagram, feed, nlp">'
  +'<meta property="fb:app_id" content="1046151882152788" />'
  +'<meta property="og:type" content="article" content="app" />'
  +'<meta property="og:url" content="https://imoji.herokuapp.com" />'
  +'<meta property="og:title" content="Imoji" />'
  +'<meta property="og:description" content="An application to turn text messages to picture messages." />'
  +'<meta property="og:image" content="https://imoji.herokuapp.com/app/assets/images/icon_placeholder.jpg" />'
  +'<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">'
  +'<link rel="stylesheet" type="text/css" href="/app/styles/main.css">'
  +'</head>'
  +'<body>'
  +'<div id="app">'
  +'</div>'
  +'<script src="./dist/client-bundle.js"></script>'
  +'</body>'
  +'</html>';
  res.send(html);
}

exports.getImagesForTags = (req, res) => {
  const tagsWithToken = tags(tokenManager.getAccessToken()),
    picturesForTags = compose(pictures, tagsWithToken),
    convertStemsToImages = compose(map(picturesForTags), fStems);

  Promise.all(convertStemsToImages(req.body.queryString))
  .then(images => images.filter((image) => image != null))
  .then(images => {
    res.send({
      name: tokenManager.getUserName(),
      images: images || [],
      avatar: tokenManager.getUserAvatar()
    });
  })
  .catch(err => res.send(err));
}

exports.authorizeUser = function(req, res) {
  res.redirect(api.get_authorization_url(redirectURI,
    { scope: ['public_content']}
  ));
};

exports.handleAuth = function(req, res) {
  api.authorize_user(req.query.code, redirectURI, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      tokenManager.setAccessToken(result.access_token);
      tokenManager.setUserData(result.user.username, result.user.profile_picture);
      res.redirect('/');
    }
  });
};
