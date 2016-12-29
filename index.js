'use strict';
var flickr = require('./lib/flickr');
var fStems = require('./lib/filteredStems');
var _ = require('ramda');
const defString = "cat dragged the mouse into the cage!";
let head = function(arr) {
  return arr[0];
}
let convertStemToImage = _.compose(flickr, head, fStems);
convertStemToImage(defString);
