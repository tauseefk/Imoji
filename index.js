'use strict';
const express = require('express'),
  app = express(),
  filteredStems = require('./lib/filteredStems'),
  myString = "I'm surprised! I didn't know you could make it.";

app.set('port', (process.env.PORT || 5000));
app.use('/lib/', express.static(__dirname + '/app/'));

app.get('/', function(req, res) {
  res.send(filteredStems(req.query = myString));
})

app.listen(app.get('port'), function() {
  console.log(`Server started at ${app.get('port')}`);
})
