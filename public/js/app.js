'use strict';


/**
 * Init Angular App
 */
var WeatherApp = angular.module('WeatherApp', ['ngResource']).



/**
 * App configuration and routing
 */
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider)
{
	/**
	 * Handle cors
	 */
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	/**
	 * App routes
	 */
  $routeProvider.
  	/**
  	 * Dashboard
  	 */
  	when('/dashboard', {
	  	templateUrl: 'views/dashboard.html', 
	  	controller: dashboardCtrl,
	  	resolve: dashboardCtrl.resolve
		}).
  	/**
  	 * Settings
  	 */
  	when('/settings', {
	  	templateUrl: 'views/settings.html', 
	  	controller: settingsCtrl,
	  	resolve: settingsCtrl.resolve
		}).
		/**
		 * Otherwise redirect to base
		 */
  	otherwise({
	  	redirectTo: '/dashboard'
	  });
}]).



/**
 * App constants
 */
value('$config',
{
  version: '0.1.0',
  appId: 'DzgogZ38',
  deg: 'c',
  weatherIconMap: [
		'storm', 'storm', 'storm', 'lightning', 'lightning', 'snow', 'hail', 'hail',
		'drizzle', 'drizzle', 'rain', 'rain', 'rain', 'snow', 'snow', 'snow', 'snow',
		'hail', 'hail', 'fog', 'fog', 'fog', 'fog', 'wind', 'wind', 'snowflake',
		'cloud', 'cloud_moon', 'cloud_sun', 'cloud_moon', 'cloud_sun', 'moon', 'sun',
		'moon', 'sun', 'hail', 'sun', 'lightning', 'lightning', 'lightning', 'rain',
		'snowflake', 'snowflake', 'snowflake', 'cloud', 'rain', 'snow', 'lightning'
	],
	prefix: 'WeatherApp'
}).



/**
 * App controller
 */
run(['$rootScope', '$location', '$timeout', '$config', 'Supports', 'Storage', 
function($rootScope, $location, $timeout, $config, Supports, Storage)
{
	//Storage.add('locations', '[]');
	
	/**
	 * These tests checks only if the technology is supported
	 */
	// TODO
	// 
	if (Supports.localStorage)
	{
		//console.log('local supports');
	}
	else
	{
		//console.warn('no local');
	};
	//
	//
	// TODO
	// 
	if (Supports.geoLocation)
	{
		//console.log('geolocation supports');
	}
	else
	{
		//console.warn('no geolocation');
	};
	//
	//
  /**
   * Detect route change start
   */
  $rootScope.$on("$routeChangeStart", function (event, next, current) 
  {
    $rootScope.alertType = "";
    $rootScope.alertMessage = "Loading...";
    $rootScope.active = "progress-striped active progress-warning";
  });
  /**
   * Route change successfull
   */
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous) 
  {
    $rootScope.alertType = "alert-success";
    $rootScope.alertMessage = "Successfully changed routes :]";
    $rootScope.active = "progress-success";
    $rootScope.newLocation = $location.path();
  });
  /**
   * Route change is failed!
   */
  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) 
  {
    alert("ROUTE CHANGE ERROR: " + rejection);
    $rootScope.alertType = "alert-error";
    $rootScope.alertMessage = "Failed to change routes :[";
    $rootScope.active = "";
  });
  /**
   * General status messages
   */
  $rootScope.alertType = "alert-info";
  $rootScope.alertMessage = "Welcome to the resolve demo";
}]);

