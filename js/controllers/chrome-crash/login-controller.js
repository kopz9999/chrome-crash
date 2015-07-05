var LoginController = function( $scope, $http, $location, $sharedData ) {
  this.loading = false;
  this._location = $location;
  this._http = $http;
  this.user = {};
  this._setting = null;
  this._currentUser = null;
  this._loadedSettings = false;
  ChromeCrash.LoginController.__super__.constructor.call(this, $scope,
    $sharedData);
};

// SuperClass
extend(LoginController, ChromeCrash.BaseController);
// Concerns
extend(LoginController.prototype, ChromeCrash.Authenticable);

LoginController.prototype.authenticate = function (user) {
  if ( this._loadedSettings ) {
    if ( !this._scope.usersForm.$valid ) {
      this.displayFormErrorMessage();
      return;
    } else {
      this._currentUser = user;
      if (this._setting.rememberCredentials) this._saveCredentials();
      this._doRequest();
    }
  } else {
    this.displayErrorMessage('Settings not loaded');
  }
};

LoginController.prototype._doRequest = function () {
  var _self = this;
  this._scope.loading = true;
  this._http.post( this._setting.loginResource, this.getCredentialParams()).
    success(function(data, status, headers, config) {
      _self._scope.loading = false;
      _self._onRequestSuccess( data );
    }).
    error(function(data, status, headers, config) {
      _self._scope.loading = false;
      _self._onRequestError( status );
    });
};

LoginController.prototype._onRequestSuccess = function( data ){
  var authTokenHeaders = this.getAuthTokenHeaders(data);
  if ( Object.keys(authTokenHeaders).length > 0 ) {
    this._sharedData.authTokenHeaders = authTokenHeaders;
    this._saveState();
    this._location.path("/land");
  } else this.displayErrorMessage("Could not read auth token");
};

LoginController.prototype._saveCredentials = function () {
  this._sharedData.user = this._currentUser;
  this._saveState();
  this._displaySaveCredentialsSuccessMessage();
};

LoginController.prototype._displaySaveCredentialsSuccessMessage = function () {
  this.notifications.push( 'Credentials saved' );
};

LoginController.prototype._onLoadSettingsSuccess = function() {
  this._loadedSettings = true;
  this._setting = this._sharedData.setting;
  if (this._sharedData.setting.rememberCredentials) {
    angular.extend( this.user, this._sharedData.user );
  }
  // You are already logged in
  if ( this._sharedData.authTokenHeaders != null ) {
    this._location.path('/webhook');
  }
};

LoginController.prototype._onLoadSettingsFailure = function() {
  this._location.path('/settings');
};

ChromeCrash.LoginController = LoginController;
