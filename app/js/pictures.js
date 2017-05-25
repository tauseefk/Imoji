'use strict';

const axios = require('axios'),
  tokenManager = require('./tokenManager'),
  map = require('ramda').map,
  curry = require('ramda').curry,
  compose = require('ramda').compose,
  prop = require('ramda').prop,
  filter = require('ramda').filter;

const variadicCompose = (...fns) => fns.reduce((f,g) => (...args) => f(g(...args)));

const Impure = {
  setData: curry((sel, data) => document.querySelector(sel).append(data)),
  get: curry((callback, url) => {
      return axios.get(url)
      .then(res => res.data.data)
      .then(data => {
        if(data !== null && data.length > 0) {
          return callback(data);
        }
      })
      .catch(console.error.bind(this));
  })
};

const img = (url) => `<img src="${url}" />`,
  trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
  }),
  head = (x) => x[0],
  mediaUrl = compose(prop('url'), prop('standard_resolution'), prop('images')),
  mediaToImage = compose(img, mediaUrl),
  images = compose(mediaUrl, head);

module.exports = Impure.get(images);
