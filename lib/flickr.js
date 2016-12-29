'use strict';
var _ = require('ramda');
const map = _.map,
  curry = _.curry,
  compose = _.compose,
  prop = _.prop,
  filter = _.filter;

var Impure = {
  setData: curry(function(sel, data) {
    $(sel).append(data);
  }),
  get: curry(function(callback, url) {
    $.getJSON(url, callback);
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
  return `http://api.flickr.com/services/feeds/photos_public.gne?tags=${t}&format=json&jsoncallback=?`;
};

var mediaUrl = compose(prop('m'), prop('media'));

var mediaToImage = compose(img, mediaUrl);

var images = compose(mediaToImage, head, prop('items'));

var processImageData = compose(Impure.setData('.app'), images);

module.exports = compose(Impure.get(processImageData), url, trace("Stems: "));
