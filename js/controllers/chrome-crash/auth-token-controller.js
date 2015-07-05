var AuthTokenController = function( $scope, $location, $sharedData ) {
  this._location = $location;
  ChromeCrash.AuthTokenController.__super__.constructor.call(this, $scope,
    $sharedData);
};

extend(AuthTokenController, ChromeCrash.BaseController);

AuthTokenController.prototype.logout = function () {
  this._sharedData.authTokenHeaders = null;
  this.notifications.push( "Token has been dropped" );
  this._saveState();
  this._redirectToLogin();
};

AuthTokenController.prototype._redirectToLogin = function(){
  this._location.path( '/' );
};

AuthTokenController.prototype._onLoadSettingsSuccess = function () {
  if ( this._sharedData.authTokenHeaders == null ) {
    this._redirectToLogin();
  }
};

AuthTokenController.prototype._onLoadSettingsFailure = function () {
  this._redirectToLogin();
};

ChromeCrash.AuthTokenController = AuthTokenController;
