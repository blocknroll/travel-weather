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


  // countdown timer ///////////////////////////
  const day = document.querySelector('#day').value;
  const month = document.querySelector('#month').value;
  const year = document.querySelector('#year').value;
  const date = year + '-' + month + '-' + day;
  let tripDate = new Date(date).getTime();

  const countdown = setInterval (function() {
    // current date
    let now = new Date().getTime();
    // interval between now...trip date
    let interval = tripDate - now;

    let days = Math.floor( interval / (1000 * 60 * 60 * 24) );

    document.querySelector('#interval').innerHTML = days + ' more days!';

    if (days < 0) {
      clearInterval(countdown);
      document.querySelector('#interval').innerHTML = 'TODAY IS THE DAY!!!';
    } else if (days < 1) {
      document.querySelector('#interval').innerHTML = 'leaving tomorrow!!!';
    } else if (days < 2 ) {
      document.querySelector('#interval').innerHTML = days + ' more day!!!';
    }
  }, 1000);



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
