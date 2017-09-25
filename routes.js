'use strict';

const React = require('react'),
  fs = require('fs'),
  compose = require('ramda').compose,
  map = require('ramda').map,
  curry = require('ramda').curry,
  api = require('./app/js/instagram-node-helper'),
  pictures = require('./app/js/pictures'),
  fStems = require('./app/js/filteredStems'),
  axios = require('axios'),
  defString = 'people from california and florida',
  redirectURI = process.env.APP_ADDRESS + process.env.REDIRECT_URI;

const trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
  }),
  tags = curry((access_token, t) => `https://api.instagram.com/v1/tags/${t}/media/recent?access_token=${access_token}`);

exports.home = (req, res) => {
  if(!req.userAuth ||
    req.userAuth.access_token === null ||
    req.userAuth.access_token === undefined) {

    if(req.headers['user-agent'] == 'facebookexternalhit/' ||
      req.headers['user-agent'] == 'Facebot' ||
      req.headers['user-agent'] == 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)') {
      res.redirect('/static');
    } else {
      console.log(req.headers['user-agent']);
      res.redirect('/authorizeUser');
    }
    return;
  } else {
    homeWithToken(req, res);
  }
}

var homeWithToken = (req, res) => {
  fs.createReadStream('./app.html')
    .pipe(res);
}

exports.getImagesForTags = (req, res) => {
  const tagsWithToken = tags(req.userAuth.access_token),
    picturesForTags = compose(pictures, tagsWithToken),
    convertStemsToImages = compose(map(picturesForTags), fStems);

  Promise.all(convertStemsToImages(req.body.queryString))
  .then(images => images.filter((image) => image != null))
  .then(images => {
    res.send({
      name: req.userAuth.user_name,
      images: images || [],
      avatar: req.userAuth.profile_picture
    });
  })
  .catch(err => res.send(err));
};

exports.authorizeUser = (req, res) => {
  res.redirect(api.get_authorization_url(redirectURI,
    { scope: ['public_content']}
  ));
};

exports.handleAuth = (req, res) => {
  api.authorize_user(req.query.code, redirectURI, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      req.userAuth.access_token = result.access_token;
      req.userAuth.user_name = result.user.username;
      req.userAuth.profile_picture = result.user.profile_picture;
      res.redirect('/');
    }
  });
};

exports.getStaticPage = (req, res) => {
  fs.createReadStream('app.html')
  .pipe(res);
};

exports.getWebhook => (req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.MESSENGER_VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
}
