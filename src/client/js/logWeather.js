/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function logWeather(e){

  const OPENWEATHER_baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  const GEONAMES_baseURL = 'http://api.geonames.org/geoCodeAddressJSON?q=';
  const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;
  const WEATHERBIT_baseURL = 'https://api.weatherbit.io/v2.0/current?lat=';
  const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
  const d = new Date();
  const newDate = d.getMonth() + 1 + '.' + d.getDate()+ '.' + d.getFullYear();
  const city = document.querySelector('#city').value;


  Client.countdown();

  Client.getLatLng(GEONAMES_baseURL, city, GEONAMES_API_KEY)
  .then(
    async function getWeatherCurrent (geonamesData) {
      const lat = geonamesData.address.lat;
      const lon = geonamesData.address.lng;

      const response = await fetch(WEATHERBIT_baseURL+lat+'&lon='+lon+WEATHERBIT_API_KEY);
      try {
        const weatherbitData = await response.json();
        return weatherbitData;
      } catch(error) {
        console.log('getWeather error', error);
      }
    }
  ).then(function(weatherbitData){
    // add data - Call Function
    Client.postData('/addData',
                   {temperature:weatherbitData.data[0].temp, date:newDate}
    );
  })
  .then(function() {
    Client.updateUI();
  });
}

export {
  logWeather
};
