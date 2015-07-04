chromeCrashApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'pages/login.html',
    controller  : 'LoginController'
  });
  $routeProvider.when('/settings', {
    templateUrl : 'pages/settings.html',
    controller  : 'SettingsController'
  });
});
