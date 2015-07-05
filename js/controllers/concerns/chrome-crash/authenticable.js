// Authenticable
var Authenticable = {};
Authenticable.getCredentialParams = function () {
  var postParams = {};
  var setting = this._sharedData.setting;
  postParams[ setting.usernameParam ] = this._sharedData.user.username;
  postParams[ setting.passwordParam ] = this._sharedData.user.password;
  return postParams;
};
Authenticable.getAuthTokenHeaders = function(data) {
  var authTokenHeaders = {};
  var setting = this._sharedData.setting;
  var authToken = jsonPath(data, setting.authTokenPath);
  var userId = jsonPath(data, setting.userIdPath);
  if (authToken) authTokenHeaders[setting.authTokenName] = authToken[0];
  if (userId) authTokenHeaders[setting.userIdName] = userId[0];
  return authTokenHeaders;
};

ChromeCrash.Authenticable = Authenticable;
