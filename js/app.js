var chromeCrashApp = angular.module('chromeCrashApp', [ 'ngRoute' ]);
chromeCrashApp.appTitle = 'Meteor Analyzer';
chromeCrashApp.storeKey = 'meteorData';

chromeCrashApp.value('$sharedData', { setting: null, user: null });
// create the controller and inject Angular's $scope
chromeCrashApp.controller('MainController', ['$scope', function($scope) {
  $scope.appTitle = chromeCrashApp.appTitle;
}]);

chromeCrashApp.controller('LoginController',
  ['$scope', '$http', '$location', '$sharedData',  window.ChromeCrash.LoginController]);

chromeCrashApp.controller('SettingsController',
  ['$scope', '$location', '$sharedData', window.ChromeCrash.SettingsController]);
