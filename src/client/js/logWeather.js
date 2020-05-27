/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function logWeather(e){

  const OPENWEATHER_baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

  const GEONAMES_baseURL = 'http://api.geonames.org/geoCodeAddressJSON?q=';
  const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;

  let d = new Date();
  let newDate = d.getMonth() + 1 + '.' + d.getDate()+ '.' + d.getFullYear();
  let zip = document.querySelector('#zip').value;
  let feelings = document.querySelector('#feelings').value;
  let city = document.querySelector('#city').value;


  Client.getLatLng(GEONAMES_baseURL, city, GEONAMES_API_KEY);

  Client.getWeather(OPENWEATHER_baseURL, zip, OPENWEATHER_API_KEY)
  .then(function(data){
    // add data - Call Function
    Client.postData('/addData',
            {temperature:data.main.temp, date:newDate, feelings:feelings}
    );
  })
  .then(function() {
    Client.updateUI();
  });

}

export {
  logWeather
};
