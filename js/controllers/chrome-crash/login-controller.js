var LoginController = function( $scope, $http, $location, $sharedData ) {
  this._location = $location;
  this._http = $http;
  this.user = {};
  this._setting = null;
  this._currentUser = null;
  this._loadedSettings = false;
  ChromeCrash.SettingsController.__super__.constructor.call(this, $scope,
    $sharedData);
};

extend(LoginController, ChromeCrash.BaseController);

LoginController.prototype.authenticate = function (user) {
  if ( this._loadedSettings ) {
    if ( !this._scope.usersForm.$valid ) {
      this.displayFormErrorMessage();
      return;
    } else {
      this._currentUser = user;
      if ( this._sharedData.setting.rememberCredentials ) {
        this.saveCredentials();
      }
      this.doRequest();
    }
  } else {
    this.displayErrorMessage('Settings not loaded');
  }
};

LoginController.prototype.doRequest = function () {
  var postParams = {};
  var _self = this;
  postParams[ this._setting.usernameParam ] = this._currentUser.username;
  postParams[ this._setting.passwordParam ] = this._currentUser.password;
  this._http.post( this._setting.loginResource, postParams).
    success(function(data, status, headers, config) {
      _self.onRequestSuccess( data );
    }).
    error(function(data, status, headers, config) {
      if ( status < 600 && status >= 500 ){
        this.displayErrorMessage('Server side error');
      } else if (status < 500 && status >= 400) {
        if (status == 401) {
          this.displayErrorMessage('Unauthorized error.'+
            ' Credentials are invalid');
        } else this.displayErrorMessage('Client side occurred');
      } else this.displayErrorMessage('Unknown error occurred');
    });
};

LoginController.prototype.onRequestSuccess = function( data ){
  var authTokenHeaders = {};
  var authToken = jsonPath(data, this._setting.authTokenPath);
  var userId = jsonPath(data, this._setting.userIdPath);
  if (authToken) authTokenHeaders[this._setting.authTokenName] = authToken[0];
  if (userId) authTokenHeaders[this._setting.userIdName] = userId[0];
  if ( authToken || userId ) {
    this._location.path("/land");
  } else this.displayErrorMessage("Could not read auth token");
};

LoginController.prototype.saveCredentials = function () {
  var _self = this;
  this._sharedData.user = this._currentUser;
  chrome.storage.sync.set(this.getStorableData(), function(){
    _self.displaySaveCredentialsSuccessMessage();
  });
};

LoginController.prototype.displaySaveCredentialsSuccessMessage = function () {
  $.gritter.add({
    title: chromeCrashApp.appTitle,
    text: 'Credentials saved'
  });
};

LoginController.prototype._onLoadSettingsSuccess = function() {
  this._loadedSettings = true;
  this._setting = this._sharedData.setting;
  if (this._sharedData.setting.rememberCredentials) {
    angular.extend( this.user, this._sharedData.user );
  }
};

LoginController.prototype._onLoadSettingsFailure = function() {
  this._location.path('/settings');
};

ChromeCrash.LoginController = LoginController;
