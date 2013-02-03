'use strict';

/**
 * Dashboard controller
 */
function dashboardCtrl($rootScope, $scope, $config, weathers)
{
  /**
   * Pass some values to view
   */
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