'use strict';
const map = require('ramda').map,
  curry = require('ramda').curry,
  compose = require('ramda').compose,
  prop = require('ramda').prop,
  filter = require('ramda').filter,
  http = require('http');

var container;

var Impure = {
  setData: curry(function(container, data) {
    container = data;
    console.log(container);
  }),
  get: curry(function(callback, url) {
    http.get(url, function(res) {
      res.setEncoding('utf8');
      let str = "";
      res.on('data', function(chunk) {
        str += chunk;
      });
      res.on('end', function() {
        try{
          callback(eval(str));
        } catch(e) {
          console.error(e.message);
        }
      });
    });
  })
};

var img = function(url) {
  return `<img src="${url}" />`;
}

var trace = curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

var url = function(t) {
  return `http://api.flickr.com/services/feeds/photos_public.gne?tags=${t}&format=json&jsoncallback=?`;
};

var mediaUrl = compose(prop('m'), prop('media'));

var mediaToImage = compose(img, mediaUrl);

var images = compose(map(mediaToImage), prop('items'));

var setImageData = compose(Impure.setData(container), images);

var app = compose(Impure.get(setImageData), url);

module.exports = {
  app: app,
  data: container
};
