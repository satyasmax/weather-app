'use strict';


WeatherApp.
/**
 * Weather resource
 */
factory('Weather', function ($resource, $config, $q, $route, $timeout, GeoAPI, Storage) 
{
	/**
	 * Resource
	 */
  var Weather = $resource(
    'http://query.yahooapis.com/v1/public/yql',
    {
    	format: 'json'
    }
  );
  /**
   * Get weather
   */
  Weather.prototype.query = function () 
  {
    var deferred = $q.defer();
    /**
     * Always get current location first
     */
    GeoAPI.get().
    then(function()
  	{
  		/**
  		 * Check whether locations are set
  		 */
	  	if (Storage.get('locations') != '{}')
	  	{    
	    	var locations = angular.fromJson(Storage.get('locations'));
		  	var calls = [];
		    angular.forEach(locations, function(location, index)
		  	{
		  		calls.push(Weather.prototype.get(location.woeid));
		  	});
	      $q.all(calls)
	      .then(function(results)
	      {        
	        var weathers = {};
	        angular.forEach(results, function(result, index)
	      	{
	      		angular.forEach(result, function(weather, woeid)
	      		{
	      			weathers[woeid] = weather;
	      		});
	      	});
	      	deferred.resolve(weathers);
	      });
	  	}
	  	/**
	  	 * If no location is set, use current location
	  	 */
	  	else
	  	{
	  		var geo = angular.fromJson(Storage.get('geo'));
	  		Weather.get({
	  			q: 'select * from weather.forecast where woeid=' + 
							geo.woeid + 
							' and u="' + 
							$config.deg + 
							'"'
	  		}, 
	  		function (result) 
		    {
		    	var weather = {};
		    	weather[geo.woeid] = result.query.results.channel;		      
		      deferred.resolve(weather);
		    });	  		
	  	};
  	});
    return deferred.promise;
  };

  /**
   * Get weather
   */
  Weather.prototype.get = function (woeid) 
  {
    var deferred = $q.defer();
		Weather.get({
			q: 'select * from weather.forecast where woeid=' + 
					woeid + 
					' and u="' + 
					$config.deg + 
					'"'
		}, 
		function (result) 
    {
    	var weather = {};
    	weather[woeid] = result.query.results.channel;
      deferred.resolve(weather);
    });

    return deferred.promise;
  };
  return new Weather;
}).




/**
 * GeoAPI resource
 */
factory('GeoAPI', function ($resource, $q, $timeout, $config, Storage) 
{
	/**
	 * Resource
	 */
  var GeoAPI = $resource(
    'http://where.yahooapis.com/geocode',
    {
    	flags: 'J',
    	gflags: 'R',
    	appid: $config.appId
    }
  );
  /**
   * Get geo location based on browser location values
   */
  GeoAPI.prototype.get = function (coords) 
  {
		var deferred = $q.defer();
	  navigator.geolocation.getCurrentPosition(
	  	/**
	  	 * Success callback
	  	 */
			function(position)
		  {	
		    GeoAPI.get({
			    location: position.coords.latitude + ',' + position.coords.longitude
			  }, function (result) 
		    {
		    	Storage.add('geo', angular.toJson(result.ResultSet.Results[0]));
		      deferred.resolve(result);
		    });
			},
			/**
			 * Oh no. Something bad happened..
			 */
			function(error)
			{
	    	switch(error.code)
	    	{
					case error.TIMEOUT:
						console.warn("A timeout occured! Please try again!");
						break;
					case error.POSITION_UNAVAILABLE:
						console.warn('We can\'t detect your location. Sorry!');
						break;
					case error.PERMISSION_DENIED:
						console.warn('Please allow geolocation access for this to work.');
						break;
					case error.UNKNOWN_ERROR:
						console.warn('An unknown error occured!');
						break;
				}				
			}
		);
		return deferred.promise;
  };
  return new GeoAPI;
}).





/**
 * 
 * PlaceFinder resource
 */
factory('Where', function ($resource, $q, $timeout, $config) 
{
	/**
	 * Resource
	 */
  var Where = $resource(
    'http://where.yahooapis.com/geocode',
    {
    	format: 'json',
    	appid: $config.appId
    }
  );
  /**
   * Get geo location based on browser location values
   */
  Where.prototype.find = function (q) 
  {
		var deferred = $q.defer();
    Where.get({
	    q: q
	  }, function (results) 
    {
    	if (results.Found == 1)
    	{
    		var tmp = [];
    		tmp.push(results.Result);
    		results.Result = tmp;
    	};
      deferred.resolve(results.Result);    
    });
		return deferred.promise;
  };
  return new Where;
}).




/**
 * Tests services
 * mini Modernizr testers
 */
service('Supports', 
function($rootScope, $config)
{
	/**
	 * Test if localStorage supported
	 */
  var isLocalStorageSupported = function()
  {
	  try
	  {
	  	var mod = 'test';
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
	  }
	  catch(e)
	  {
      return false;
	  }
  };
  /**
   * Test if GeoLocation is supported
   */
  var isGeoLocationSupported = function()
  {
  	if ('geolocation' in navigator && 
  			navigator.geolocation)
  	{
      return true;
  	}
  	else
  	{
  		return false;
  	};
  };
  /**
   * Returns
   */
  return {
  	localStorage: isLocalStorageSupported,
  	geoLocation: isGeoLocationSupported
  }
}).




/**
 * localStorage service
 */
service('Storage', ['$rootScope', '$config', 
function($rootScope, $config)
{
	/**
	 * Correct prefix
	 */
  if ( $config.prefix.substr(-1) !== '.' )
  {
    var prefix = !!$config.prefix ? $config.prefix + '.' : '';
  };
  /**
   * Add in localStorage
   */
  var addToLocalStorage = function(key, value)
  {
    if (!value && 
	    	value !== 0 && 
	    	value !== "") return false;
    try
    {
      localStorage.setItem(prefix+key, value);
    }
    catch (e)
    {
    	console.warn('Storage add error: ', e.Description);
      return false;
    }
    return true;
  };
  /**
   * Read from localStorage
   */
  var getFromLocalStorage = function(key)
  {
    var item = localStorage.getItem(prefix+key);
    if (!item) return null;
    return item;
  };
  /**
   * Remove from localStorage
   */
  var removeFromLocalStorage = function(key) 
  {
    try 
    {
      localStorage.removeItem(prefix+key);
    } 
    catch (e) 
    {
      console.warn('Storage remove error: ', e.Description);
      return false;
    }
    return true;
  };
  /**
   * Clear localStorage
   */
  var clearAllFromLocalStorage = function() 
  {
    var prefixLength = prefix.length;
    for (var key in localStorage) 
    {
      if (key.substr(0,prefixLength) === prefix) 
      {
        try 
        {
          removeFromLocalStorage(key.substr(prefixLength));
        } 
        catch (e) 
        {
          console.warn('Storage cleaning all error: ', e.Description);
          return false;
        }
      }
    }
    return true;
  };
  /**
   * Returns
   */
  return {
    add: addToLocalStorage,
    get: getFromLocalStorage,
    remove: removeFromLocalStorage,
    clearAll: clearAllFromLocalStorage
  };

}]);