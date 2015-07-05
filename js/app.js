var chromeCrashApp = angular.module('chromeCrashApp', [ 'ngRoute' ]);
chromeCrashApp.appTitle = 'Meteor Rest Analyzer';
chromeCrashApp.storeKey = 'meteorData';

chromeCrashApp.value('$sharedData', { setting: null, user: null,
  authTokenHeaders: null });
// create the controller and inject Angular's $scope
chromeCrashApp.controller('MainController', ['$scope', function($scope) {
  $scope.appTitle = chromeCrashApp.appTitle;
}]);

// Controllers
chromeCrashApp.controller('LoginController',
  ['$scope', '$http', '$location', '$sharedData',
    ChromeCrash.LoginController]);

chromeCrashApp.controller('SettingsController',
  ['$scope', '$location', '$sharedData', ChromeCrash.SettingsController]);

chromeCrashApp.controller('AuthTokenController',
  ['$scope', '$location', '$sharedData',
    ChromeCrash.AuthTokenController]);

chromeCrashApp.controller('WebhookController',
  ['$scope', '$http', '$location', '$sharedData',
    ChromeCrash.WebhookController]);

// Directives
chromeCrashApp.directive('crashNotifications',
  ChromeCrash.CrashNotifications.factory);

chromeCrashApp.directive('crashLoader',
  ChromeCrash.CrashLoader.factory);
