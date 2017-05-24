'use strict';

const natural = require('natural'),
  wordTokenizer = new natural.WordTokenizer(),
  stemmer = natural.PorterStemmer,
  stem = stemmer.stem;

const map = require('ramda').map,
  curry = require('ramda').curry,
  filter = require('ramda').filter,
  compose = require('ramda').compose;

const c_tokenize = function(tkr) {
  return function(str) {
    return tkr.tokenize(str);
  }
}
const trace = function(x) {
  console.log(x);
  return x;
}
const gtTwo = function(x) {
  return x.length > 2;
}
const wordTkr = c_tokenize(wordTokenizer),
  findStems = compose(map(stem), wordTkr),
  filteredStems = compose(filter(gtTwo), findStems),
  logFilteredStems = compose(trace, filteredStems);

module.exports = filteredStems;
