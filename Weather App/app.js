(function() {

	var Weather = {
		init: function() {
			this.getLocation();
			this.showTime();
			$('#switch').on('click', this.changeUnit);
		},

		cache: {
			showFahrenheit: false,
		},

		getLocation: function() {
      var c = Weather.cache;
      
      if ( window.chrome ) {
        $.getJSON('http://ip-api.com/json', function(json) {
          c.lat = json.lat;
          c.long = json.lon;
          Weather.getInformation();
        });
      } else {
        if ( navigator.geolocation ) {
          navigator.geolocation.getCurrentPosition(function(data) {
            c.lat = data.coords.latitude;
            c.long = data.coords.longitude;
            Weather.getInformation();
          });
        }
      }
			
		},

		getInformation: function() {
			var c = Weather.cache;
    
			$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + c.lat + '&lon=' + c.long + '&units=imperial&appid=3acc16ffae9e45df92a064e41646355f', function(json) {
        
				c.location = json.name;
				c.country = json.sys.country;
        		c.fahrenheit = Math.round(json.main.temp);
				c.celcius = Math.round((c.fahrenheit - 32) * 5 / 9);
				c.icon = json.weather[0].id;
				c.coverage = json.weather[0].main;
				c.sunrise = json.sys.sunrise;
				c.sunset = json.sys.sunset;
        
				Weather.showMainInformation();
				Weather.showCurrentCoverage();
			});
		},

		showMainInformation: function() {
			var c = Weather.cache;
      
			// Show Location
			$('#location').html(c.location + ', ' + c.country);
			// Show Temperature
			$('#temperature').html(c.showFahrenheit === false ? c.celcius : c.fahrenheit);
		},

		showCurrentCoverage: function() {
			var c = Weather.cache;
			var currentTime = new Date().getTime() / 1000;

			// Show daytime icon
			if ( currentTime > c.sunrise && currentTime < c.sunset ) {
				$('#icon').attr('class', 'wi wi-owm-day-' + c.icon);
			} else {
				$('#icon').attr('class', 'wi wi-owm-night-' + c.icon);
			}
      // Show coverage text
			$('#status').html(Weather.cache.coverage);
		},

		showTime: function() {
			var time = new Date();
			var hours = time.getHours();
			var minutes = time.getMinutes();

			// Display 0 if time is below 10
			if ( hours < 10 ) {
				$('#time').html(minutes < 10 ? '0' + hours + ':0' + minutes : '0' + hours + ':' + minutes);
			} else {
				$('#time').html(minutes < 10 ? hours + ':0' + minutes : hours + ':' + minutes);
			}
		},

		changeUnit: function() {
			var c = Weather.cache;
      
      // Toggle temperature unit
			if ( c.showFahrenheit === false ) {
				$('#temperature').html(c.fahrenheit);
				c.showFahrenheit = true;
			} else {
				$('#temperature').html(c.celcius);
				c.showFahrenheit = false;
			}
      
      // Toggle button
			$('#switch').toggleClass('toggle');
			$('#switch').text(function(i, text){
		        return text === "° F" ? "° C" : "° F";
		    });
      // Creates the fade in effect on the temperature text
			$('#temperature').toggleClass('toggle');
		},

	};

	Weather.init();

})();

/* Inspired by http://codepen.io/jdtadlock/pen/ONNEPM and modified by http://codepen.io/Shivelle/ */