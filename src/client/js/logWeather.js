/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function logWeather(e){
  const d = new Date();
  const newDate = d.getMonth() + 1 + '.' + d.getDate()+ '.' + d.getFullYear();
  const zip = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;

  Client.postData( '/openweather', {zip: zip} )
  .then(function(openWeatherData){
    // add data - Call Function
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
