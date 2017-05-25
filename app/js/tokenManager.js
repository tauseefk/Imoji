var accessToken = null,
  userName = "",
  userAvatar = "";

module.exports = {
  getAccessToken: function() {
    return accessToken;
  },
  setAccessToken: function(token) {
    accessToken = token;
  },
  getUserName: function() {
    return userName;
  },
  getUserAvatar: function() {
    return userAvatar;
  },
  setUserData: function(name, avatar) {
    userName = name;
    userAvatar = avatar;
  }
}
