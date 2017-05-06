let accessToken = null;

module.exports = {
  getAccessToken: function() {
    return accessToken;
  },
  setAccessToken: function(token) {
    accessToken = token;
  }
}
