'use strict';
/**
 * Directives
 */
WeatherApp.
directive('appVersion', ['$config', function($config)
{
  return function(scope, elm, attrs)
  {
    elm.text($config.version);
  };
}]);