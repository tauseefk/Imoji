'use strict';
var flickr = require('./lib/flickr');
var fStems = require('./lib/filteredStems');
var _ = require('ramda');
const defString = "I'm surprised! I didn't know you could make it.";
let convertStemToImage = _.compose(_.map(flickr), fStems);
convertStemToImage(defString);
