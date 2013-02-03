'use strict';


/**
 * Dashboard controller
 */
function dashboardCtrl($rootScope, $scope, $config, data)
{
	$scope.weather = data.weather;
};

/**
 * Resolve dashboard
 * @type {Object}
 */
dashboardCtrl.resolve = {
  data: function (Weather) 
  {
  	return Weather.get();
  }
};

/**
 * Inject dependencies
 */
dashboardCtrl.$inject = ['$rootScope', '$scope', '$config', 'data'];