var accessToken = null,
  userName = "";

module.exports = {
  getAccessToken: function() {
    return accessToken;
  },
  setAccessToken: function(token) {
    accessToken = token;
  },
  getUserName: function() {
    return userName;
  }
  setUserName: function(userName) {
    userName = name;
  }
}
