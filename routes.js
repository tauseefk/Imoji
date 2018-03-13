'use strict';

const fs = require('fs'),
  compose = require('ramda').compose,
  map = require('ramda').map,
  curry = require('ramda').curry,
  pictures = require('./app/js/pictures'),
  api = process.env.INSTAGRAM_API,
  fStems = require('./app/js/filteredStems'),
  axios = require('axios'),
  defString = 'people from california and florida',
  path = require('path'),
  qs = require('querystring'),
  redirectURI = process.env.APP_ADDRESS + process.env.REDIRECT_URI,
  pathToIndex = path.join(__dirname, 'client', 'build', 'index.html');

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
}),
  tags = curry((access_token, t) => `${api}/v1/tags/${t}/media/recent?access_token=${access_token}`);

exports.home = (req, res) => {
  if (!req.userAuth ||
    req.userAuth.access_token === null ||
    req.userAuth.access_token === undefined) {

    if (req.headers['user-agent'] == 'facebookexternalhit/' ||
      req.headers['user-agent'] == 'Facebot' ||
      req.headers['user-agent'] == 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)') {
      res.redirect('/static');
    } else {
      res.redirect('/authorizeUser');
    }
    return;
  } else {
    homeWithToken(req, res);
  }
}

var homeWithToken = (req, res) => {
  fs.createReadStream(pathToIndex)
    .pipe(res);
}

exports.getImagesForTags = (req, res) => {

  if (!req.userAuth.access_token) {
    req.userAuth.reset();
    res.status(500).send(new Error("Unauthorized access"));
  } else {
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
      .catch(err => res.status(err.status).send(err.message));
  }
};

exports.authorizeUser = (req, res) => {
  res.redirect(`${api}/oauth/authorize/?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=code`);
};

exports.handleAuth = (req, res) => {
  var data = {
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: redirectURI,
    code: req.query.code
  };
  axios({
    method: 'post',
    url: `${api}/oauth/access_token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
    .then(response => {
      req.userAuth.access_token = response.data.access_token;
      req.userAuth.user_name = response.data.user.full_name;
      req.userAuth.profile_picture = response.data.user.profile_picture;
      res.redirect('/');
    })
    .catch(console.error.bind(this));
};

exports.getStaticPage = (req, res) => {
  fs.createReadStream(pathToIndex)
    .pipe(res);
};

exports.getWebhook = (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === process.env.MESSENGER_VERIFY_TOKEN) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
};
