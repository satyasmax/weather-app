'use strict';


/**
 * Settings controller
 */
function settingsCtrl($rootScope, $scope, $q, $config, Where)
{
  var self = this;

	$scope.search = function(q)
  {
    Where.find(q).
    then(function(results)
    {
      //var results = self.readableAddresses(results.Result);

      $scope.results = results.Result;
    });
  };

};

/**
 * Resolve dashboard
 * @type {Object}
 */
// settingsCtrl.resolve = {
//   settings: function (Where) 
//   {
//   	return Where.find('Hurriyet');
//   }
// };

/**
 * Prototypes
 */
settingsCtrl.prototype = {
  constructor: settingsCtrl,

  readableAddresses: function(results)
  {
    angular.forEach(results, function(result, index)
    {
      result['added'] = result.line1 + ' ' + 
                        result.line2 + ' ' + 
                        result.line3 + ' ' + 
                        result.line4;
    });
    return results;
  }
}

/**
 * Inject dependencies
 */
settingsCtrl.$inject = ['$rootScope', '$scope', '$q', '$config', 'Where'];
