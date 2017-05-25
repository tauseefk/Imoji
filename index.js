'use strict';

const dotEnv = require('dotenv');
dotEnv.config({ path: __dirname + '/.env'});
const express = require('express'),
  app = express(),
  Routes = require('./routes.js'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  sessions = require("client-sessions");

app.set('port', (process.env.PORT || 3000));

app.use(cors());
app.use(sessions({
  cookieName: 'userAuth', // cookie name dictates the key name added to the request object
  secret: process.env.SESSION_SECRET, // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  cookie: {
    path: '/', // cookie will only be sent to requests under '/api'
    maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
    ephemeral: false, // when true, cookie expires when the browser closes
    httpOnly: true, // when true, cookie is not accessible from javascript
    secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
}));

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
