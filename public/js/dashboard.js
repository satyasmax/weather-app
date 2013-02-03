'use strict';

/**
 * Dashboard controller
 */
function dashboardCtrl($rootScope, $scope, $config, weathers, Storage)
{
  /**
   * Pass some values to view
   */
  $scope.weathers = weathers;

  /**
   * If no locations are absent, advice for one
   */
  $scope.advice = false;
  if (Storage.get('locations') == '{}')
  {
    $scope.geo = angular.fromJson(Storage.get('geo'));
    $scope.advice = true;
  };

  /**
   * Add location
   */
  $scope.add = function(location)
  {
    $scope.advice = false;
    var locations = angular.fromJson(Storage.get('locations')) || {};
    locations[location.woeid] = location;
    Storage.add('locations', angular.toJson(locations));
    $scope.locations = locations;
  };
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
dashboardCtrl.$inject = ['$rootScope', '$scope', '$config', 'weathers', 'Storage'];