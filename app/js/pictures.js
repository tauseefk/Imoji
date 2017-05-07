'use strict';
const _ = require('ramda'),
  axios = require('axios'),
  tokenManager = require('./tokenManager'),
  map = _.map,
  curry = _.curry,
  compose = _.compose,
  prop = _.prop,
  filter = _.filter;

const variadicCompose = (...fns) => fns.reduce((f,g) => (...args) => f(g(...args)));

const Impure = {
  setData: curry((sel, data) => document.querySelector(sel).append(data)),
  get: curry((callback, url) => {
      return axios.get(url)
      .then(res => res.data)
      .then(callback);
  })
};

const img = (url) => `<img src="${url}" />`,
  trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
  }),
  head = (x) => x[0],
  url = (t) => `https://api.instagram.com/v1/tags/${t}/media/recent?access_token=${tokenManager.getAccessToken()}`,
  mediaUrl = compose(prop('url'), prop('standard_resolution'), prop('images')),
  mediaToImage = compose(img, mediaUrl),
  images = compose(mediaToImage, head, prop('data')),
  processImageData = compose(Impure.setData('.app'), images);

module.exports = compose(Impure.get(images), url);
