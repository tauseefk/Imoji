'use strict';

const dotEnv = require('dotenv');
dotEnv.config({ path: __dirname + '/.env'});
const express = require('express'),
  app = express(),
  Routes = require('./routes.js'),
  cors = require('cors'),
  bodyParser = require('body-parser');

app.set('port', (process.env.NODE_PORT || 3000));

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(__dirname));

// var appContainer = document.querySelector('.app');

app.get('/', Routes.home);
app.get('/authorizeUser', Routes.authorizeUser);
app.get('/auth', Routes.handleAuth);
// app.get('/getTag', Routes.getTag);
app.post('/getImagesForTags', Routes.getImagesForTags);

app.listen(app.get('port'), function() {
  console.log(`Node app is running on port: ${app.get('port')}`);
});
