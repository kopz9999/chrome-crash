var WebhookController = function( $scope, $http, $location, $sharedData ) {
  this._location = $location;
  this._http = $http;
  this.user = {};
  this._setting = null;
  this._currentUser = null;
  this._loadedSettings = false;
  ChromeCrash.SettingsController.__super__.constructor.call(this, $scope,
    $sharedData);
};

extend(WebhookController, ChromeCrash.BaseController);

ChromeCrash.WebhookController = WebhookController;
