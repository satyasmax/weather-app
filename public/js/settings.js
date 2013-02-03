'use strict';

/**
 * Settings controller
 */
function settingsCtrl($rootScope, $scope, $q, $config, home, Places, Storage)
{

  /**
   * Target is current
   */
  var self = this;

  /**
   * Pass some values to view
   */
  $scope.geo = angular.fromJson(Storage.get('geo'));
  $scope.locations = angular.fromJson(Storage.get('locations'));

  /**
   * Search for location
   */
	$scope.search = function(q)
  {
    Places.find(q).
    then(function(results)
    {
      $scope.results = results;
    });
  };

  /**
   * Add location
   */
  $scope.add = function(location)
  {
    var locations = angular.fromJson(Storage.get('locations')) || {};
    locations[location.woeid] = location;
    Storage.add('locations', angular.toJson(locations));
    $scope.locations = locations;
  };

  /**
   * Remove location
   */
  $scope.remove = function(key)
  {
    var locations = angular.fromJson(Storage.get('locations'));
    delete locations[key];
    Storage.add('locations', angular.toJson(locations));
    $scope.locations = locations;    
  };

};

/**
 * Resolve dashboard
 * @type {Object}
 */
settingsCtrl.resolve = {
  home: function (Storage) 
  {
  	return angular.fromJson(Storage.get('locations'));
  }
};

/**
 * TODO
 * Still needed?
 * 
 * Prototypes
 */
settingsCtrl.prototype = {
  constructor: settingsCtrl
}

/**
 * Inject dependencies
 */
settingsCtrl.$inject = ['$rootScope', '$scope', '$q', '$config', 'home', 'Places', 'Storage'];