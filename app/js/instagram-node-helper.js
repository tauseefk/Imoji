var api = require('instagram-node').instagram();

api.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
});

module.exports = api;
