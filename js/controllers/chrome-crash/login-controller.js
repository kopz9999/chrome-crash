var LoginController = function( $scope, $http, $location, $sharedData ) {
  this._location = $location;
  this.user = {};
  this._currentUser = null;
  this._loadedSettings = false;
  ChromeCrash.SettingsController.__super__.constructor.call(this, $scope, $sharedData);
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
  var postParams = {
    
  };
  $http.post('/someUrl', {msg:'hello word!'}).
    success(function(data, status, headers, config) {
    }).
    error(function(data, status, headers, config) {
    });
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
  if (this._sharedData.setting.rememberCredentials) {
    angular.extend( this.user, this._sharedData.user );
  }
};

LoginController.prototype._onLoadSettingsFailure = function() {
  this._location.path('/settings');
};

ChromeCrash.LoginController = LoginController;
