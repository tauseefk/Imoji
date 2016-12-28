'use strict';
const express = require('express'),
  app = express(),
  filteredStems = require('./lib/filteredStems'),
  flickr = require('./lib/flickr'),
  defString = "I'm surprised! I didn't know you could make it.";

app.set('port', (process.env.PORT || 5000));
app.use('/lib/', express.static(__dirname + '/app/'));
app.get('/', function(req, res) {
  if(req.query.msg == undefined) {
    req.query.msg = defString;
  }
  let stems = filteredStems(req.query.msg);
  flickr.app(stems[0]);
  res.send(flickr.data);
})

app.listen(app.get('port'), function() {
  console.log(`Server started at ${app.get('port')}`);
})
