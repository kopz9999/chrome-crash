var BaseController = function( $scope, $sharedData ) {
  this.notifications = [];
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

BaseController.prototype._onRequestError = function (status) {
  if ( status < 600 && status >= 500 ){
    this.displayErrorMessage('Server side error');
  } else if (status < 500 && status >= 400) {
    if (status == 401) {
      this.displayErrorMessage('Unauthorized error.'+
        ' Credentials are invalid');
    } else this.displayErrorMessage('Client side occurred');
  } else this.displayErrorMessage('Unknown error occurred');
};

BaseController.prototype._saveState = function () {
  chrome.storage.sync.set(this._getStorableData());
};

BaseController.prototype._getStorableData = function () {
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
  this.notifications.push( 'Please fill required fields' );
};

BaseController.prototype.displayErrorMessage = function (error) {
  this.notifications.push( error );
};

// Callbacks

BaseController.prototype._onLoadSettingsSuccess = function(){
  throw '_onLoadSettingsSuccess not implemented';
};

BaseController.prototype._onLoadSettingsFailure = function(){
  throw '_onLoadSettingsFailure not implemented';
};

ChromeCrash.BaseController = BaseController;
