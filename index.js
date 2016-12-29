'use strict';
var flickr = require('./lib/flickr');
var fStems = require('./lib/filteredStems');
var _ = require('ramda');
const defString = "cat dragged the mouse into the cage!";
var head = function(arr) {
  return arr[0];
}
var convertStemToImage = _.compose(flickr, head, fStems);
convertStemToImage(defString);
