/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function logWeather(e){
  const d = new Date();
  const newDate = d.getMonth() + 1 + '.' + d.getDate()+ '.' + d.getFullYear();
  const zip = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;
  const city = document.querySelector('#city').value;


  Client.postData( '/getLatLng', {city: city} );

  Client.postData( '/openweather', {zip: zip} )
  .then(function(openWeatherData){
    // pass returned openWeatherData to addData Call Function
    Client.postData('/addData',
                   { temperature:openWeatherData.main.temp,
                     date:newDate,
                     feelings:feelings }
    );
  })
  .then(function() {
    Client.updateUI();
  });
}

export {
  logWeather
};
