/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function logWeather() {

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


  if (daysToTrip < 8) { /////////////////////////////////////////////////////

    // add departure date to index.html
    document.querySelector('#date').innerHTML = 'departure date: ' + fullDate;

    // pass the city into /getLatLng
    Client.postData( '/getLatLng', {city: city} )
    .then( function(latLngData) {
      // pass the returned 'latLngData' into /getWeatherCurrent
      // 'latLngData' could be named anything
      Client.postData( '/getWeatherCurrent', {latLngData: latLngData} )
      .then(function(weatherCurrentData) {
        // pass the returned 'weatherCurrentData' and 'fullDate' into addData
        // 'weatherCurrentData' could be named anything
        Client.postData('/addData',
                       {temperature:weatherCurrentData.data[0].temp, date:fullDate}
        // 'temperature' could be named anything. 'temp' comes from weatherbit
        );
      })
      .then(function() {
        // fetch the newly posted data and update th UI with the temp
        Client.updateUICurrent();
      });
    })
    .then(function() {
      // pass the 'city' input into /getPic and request images from Pixabay
      Client.postData( '/getPic', {city: city} )
      .then(function(picData) {
        // pass returned 'picData' into updateUI - add the pic and Pixabay logo
        Client.updateUIPic(picData);
      });
    });

  } else { //////////////////////////////////////////////////////////////////

    // add departure date to index.html
    document.querySelector('#date').innerHTML = 'departure date: ' + fullDate;

    // pass the city into /getLatLng
    Client.postData( '/getLatLng', {city: city} )
    .then( function(latLngData) {
      // pass the returned 'latLngData' into /getWeatherForecast
      // 'latLngData' could be named anything
      Client.postData( '/getWeatherForecast', {latLngData: latLngData} )
      .then(function(weatherForecastData) {
        // pass the returned 'weatherForecastData' and 'fullDate' into addData
        // 'weatherForecastData' could be named anything
        Client.postData('/addData',
                       {temperature:weatherForecastData.data[15].temp, date:fullDate}
        // 'temperature' could be named anything. 'temp' comes from weatherbit
        );
      })
      .then(function() {
        Client.updateUIForecast();
      });
    })
    .then(function() {
      // pass the 'city' input into /getPic and request images from Pixabay
      Client.postData( '/getPic', {city: city} )
      .then(function(picData) {
        // pass returned 'picData' into updateUI - add the pic and Pixabay logo
        Client.updateUIPic(picData);
      });
    });
  }

}

export {
  logWeather
};
