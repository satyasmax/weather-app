'use strict';

/**
 * App filters for view
 */
WeatherApp.
/**
 * Get icons for the weather conditions
 */
filter('iconize', function($config)
{
  return function(code)
  {
    return $config.weatherIconMap[code];
  }
});
