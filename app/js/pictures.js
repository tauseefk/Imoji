'use strict';
const _ = require('ramda'),
  axios = require('axios'),
  tokenManager = require('./tokenManager'),
  api = require('./instagram-node-helper'),
  map = _.map,
  curry = _.curry,
  compose = _.compose,
  prop = _.prop,
  filter = _.filter;
  
var variadicCompose = (...fns) => fns.reduce((f,g) => (...args) => f(g(...args)));

var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
}

var Impure = {
  setData: curry(function(sel, data) {
    document.querySelector(sel).append(data);
  }),
  get: curry(function(callback, url) {
    axios.get(url)
    .then(callback)
  }),
  getFromInstagram: curry(function(callback, t) {
    api.tag_media_recent(t || 'pokemon', function(err, results) {
      if(err) {
        console.log(err);
      } else {
        console.log(results, t);
        callback(results);
      }
    })
  })
};

var img = function(url) {
  return `<img src="${url}" />`;
}

var trace = curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

var head = function(x) {
  return x[0];
}

var url = function(t) {
  t = 'people';
  return `https://api.instagram.com/v1/tags/${t}/media/recent?access_token=${tokenManager.getAccessToken()}`;
};

var mediaUrl = compose(prop('m'), prop('media'));

var mediaToImage = compose(img, mediaUrl);

var images = compose(mediaToImage, head, prop('items'));

var processImageData = compose(Impure.setData('.app'), images);

module.exports = compose(Impure.get(images), url);
