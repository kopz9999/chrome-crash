var BaseController = function( $scope, $sharedData ) {
  this._scope = $scope;
  this._sharedData = $sharedData;
  this._bindScope();
  this._loadSettings();
};

BaseController.storageKeys = {
  setting: 'setting',
  user: 'user'
};

BaseController.prototype._loadSettings = function () {
  var _self = this;
  if ( this._sharedData.setting == null ) {
    chrome.storage.sync.get(chromeCrashApp.storeKey, function(obj){
      _self._readStorage( obj );
    });
  } else {
    this._onLoadSettingsSuccess();
  }
};

BaseController.prototype.getStorableData = function () {
  var saveSetting = {};
  saveSetting[chromeCrashApp.storeKey] = this._sharedData;
  return saveSetting;
};

BaseController.prototype._readStorage = function (storage) {
  var meteorStorage = storage[ chromeCrashApp.storeKey ] || {};
  var setting = meteorStorage[ BaseController.storageKeys.setting ];
  if (setting === undefined ) {
    this._onLoadSettingsFailure();
  } else {
    angular.extend(this._sharedData, meteorStorage);
    this._onLoadSettingsSuccess();
  }
};

BaseController.prototype._bindScope = function () {
  var char = null;
  for (k in this) {
    char = k.charAt(0);
    if ( char != '_' && char != 'constructor' ) {
      this._scope[k] = angular.bind( this, this[k] );
    }
  }
};

BaseController.prototype.displayFormErrorMessage = function () {
  $.gritter.add({
    title: chromeCrashApp.appTitle,
    text: 'Please fill required fields'
  });
};

BaseController.prototype.displayErrorMessage = function (error) {
  $.gritter.add({
    title: chromeCrashApp.appTitle,
    text: error
  });
};

// Callbacks

BaseController.prototype._onLoadSettingsSuccess = function(){
  throw '_onLoadSettingsSuccess not implemented';
};

BaseController.prototype._onLoadSettingsFailure = function(){
  throw '_onLoadSettingsFailure not implemented';
};

ChromeCrash.BaseController = BaseController;
