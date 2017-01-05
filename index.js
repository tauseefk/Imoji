'use strict';
var flickr = require('./lib/flickr');
var fStems = require('./lib/filteredStems');
var _ = require('ramda');
const defString = "Quick brown fox jumped over a lazy dog";
var appContainer = document.querySelector('.app');
var head = function(arr) {
  return arr[0];
}
var convertStemToImage = _.compose(_.map(flickr), fStems);
convertStemToImage(defString);

document.querySelector(".input").addEventListener('change', function(e){
  while(appContainer.lastChild) {
    appContainer.removeChild(appContainer.lastChild);
  }
  convertStemToImage(e.target.value.trim());
})
