var SettingsController = function( $scope, $location, $sharedData ) {
  this.setting = {};
  this._location = $location;
  ChromeCrash.SettingsController.__super__.constructor.call(this, $scope, $sharedData);
};

extend(SettingsController, ChromeCrash.BaseController);

SettingsController.prototype._onLoadSettings = function(setting) {
  if ( setting === undefined ) this._initSettings();
  else this.setting = setting;
};

SettingsController.prototype._initSettings = function () {
  this.setting.authTokenName = 'X-Auth-Token';
  this.setting.userIdName = 'X-User-Id';
  this.setting.authTokenPath = '$.data.authToken';
  this.setting.userIdPath = '$.data.userId';
  this.setting.usernameParam = 'user';
  this.setting.passwordParam = 'password';
  this.setting.webhookParam = 'content';
};

SettingsController.prototype.save = function (setting) {
  var _self = null;
  if ( !this._scope.settingsForm.$valid ) {
    this.displayFormErrorMessage();
    return;
  } else {
    _self = this;
    this._sharedData.setting = setting;
    chrome.storage.sync.set(this.getStorableData(), function(){
      _self.displaySuccessMessage();
    });
    this._location.path( '/' );
  }
};

SettingsController.prototype.switchToLogin = function (setting) {
  if ( this._sharedData.setting == null ) {
    this.save( setting );
  } else {
    this._location.path( '/' );
  }
};

SettingsController.prototype.displaySuccessMessage = function (setting) {
  $.gritter.add({
    title: chromeCrashApp.appTitle,
    text: 'Settings saved'
  });
};

SettingsController.prototype._onLoadSettingsFailure = function () {
  this._initSettings();
};

SettingsController.prototype._onLoadSettingsSuccess = function(){
  angular.extend(this.setting, this._sharedData.setting);
};

ChromeCrash.SettingsController = SettingsController;
