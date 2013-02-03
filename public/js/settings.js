'use strict';


/**
 * Settings controller
 */
function settingsCtrl($rootScope, $scope, $q, $config, home, Where, Storage)
{
  var self = this;

  $scope.geo = angular.fromJson(Storage.get('geo'));
  $scope.locations = angular.fromJson(Storage.get('locations'));

	$scope.search = function(q)
  {
    Where.find(q).
    then(function(results)
    {
      //var results = self.readableAddresses(results.Result);
      //console.warn('results ->', results);
      $scope.results = results;
    });
  };

  $scope.add = function(location)
  {
    var locations = angular.fromJson(Storage.get('locations')) || {};
    locations[location.woeid] = location;
    Storage.add('locations', angular.toJson(locations));
    $scope.locations = locations;
  };

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
 * Prototypes
 */
settingsCtrl.prototype = {
  constructor: settingsCtrl,

  // readableAddresses: function(results)
  // {
  //   angular.forEach(results, function(result, index)
  //   {
  //     result['added'] = result.line1 + ' ' + 
  //                       result.line2 + ' ' + 
  //                       result.line3 + ' ' + 
  //                       result.line4;
  //   });
  //   return results;
  // }
}

/**
 * Inject dependencies
 */
settingsCtrl.$inject = ['$rootScope', '$scope', '$q', '$config', 'home', 'Where', 'Storage'];
