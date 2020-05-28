/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function logWeather(e){

  const OPENWEATHER_baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  const GEONAMES_baseURL = 'http://api.geonames.org/geoCodeAddressJSON?q=';
  const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;
  const WEATHERBIT_CURRENT_baseURL = 'https://api.weatherbit.io/v2.0/current?lat=';
  const WEATHERBIT_FORECAST_baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
  const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;

  const d = new Date();
  const todayDate = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate();
  const city = document.querySelector('#city').value;
  const year = document.querySelector('#year').value;
  const month = document.querySelector('#month').value;
  const day = document.querySelector('#day').value;
  const fullDate = year + '-' + month + '-' + day;
  const tripDate = new Date(fullDate).getTime();
  const now = new Date().getTime();
  const interval = tripDate - now;
  const daysToTrip = Math.floor( interval / (1000 * 60 * 60 * 24) );



  Client.countdown(daysToTrip);


  if (daysToTrip < 8) { ////////////////////////////////////////////////////
    document.querySelector('#date').innerHTML = 'departure date: ' + fullDate;
    Client.getLatLng(GEONAMES_baseURL, city, GEONAMES_API_KEY)
    .then(
      async function getWeatherCurrent (geonamesData) {
        const lat = geonamesData.address.lat;
        const lon = geonamesData.address.lng;
        const response = await fetch(WEATHERBIT_CURRENT_baseURL+lat+'&lon='+lon+WEATHERBIT_API_KEY);
        try {
          const weatherbitData = await response.json();
          return weatherbitData;
        } catch(error) {
          console.log('getWeather error', error);
      }
    })
    .then(function(weatherbitData){
      // add data - Call Function
      Client.postData('/addData',
                     {temperature:weatherbitData.data[0].temp, date:fullDate}
      );
    })
    .then(function() {
      Client.updateUICurrent();
    });
  } else { /////////////////////////////////////////////////////////////////

    document.querySelector('#date').innerHTML = 'departure date: ' + fullDate;
    Client.getLatLng(GEONAMES_baseURL, city, GEONAMES_API_KEY)
    .then(
      async function getWeatherForecast (geonamesData) {
        const lat = geonamesData.address.lat;
        const lon = geonamesData.address.lng;
        const response = await fetch(WEATHERBIT_FORECAST_baseURL+lat+'&lon='+lon+WEATHERBIT_API_KEY);
        try {
          const weatherbitData = await response.json();
          return weatherbitData;
        } catch(error) {
          console.log('getWeather error', error);
      }
    })
    .then(function(weatherbitData){
      // add data - Call Function
      Client.postData('/addData',
                     {temperature:weatherbitData.data[15].temp, date:fullDate}
      );
    })
    .then(function() {
      Client.updateUIForecast();
    });
  }
}

export {
  logWeather
};
