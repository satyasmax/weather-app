'use strict';


/**
 * Dashboard controller
 */
function dashboardCtrl($rootScope, $scope, $config, weathers)
{
  $scope.weathers = weathers;
};

/**
 * Resolve dashboard
 * @type {Object}
 */
dashboardCtrl.resolve = {
  weathers: function (Weather) 
  {
  	return Weather.query();
  }
};

/**
 * Inject dependencies
 */
dashboardCtrl.$inject = ['$rootScope', '$scope', '$config', 'weathers'];