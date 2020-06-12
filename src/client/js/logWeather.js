/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function logWeather() {

  const d = new Date();
  const todayDate = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate();
  const city = document.querySelector('.city').value;
  const year = document.querySelector('.year').value;
  const month = document.querySelector('.month').value;
  const day = document.querySelector('.day').value;
  const fullDate = year + '-' + month + '-' + day;
  const tripDate = new Date(fullDate).getTime();
  const now = new Date().getTime();
  const interval = tripDate - now;
  const daysToTrip = Math.floor( (interval / (1000 * 60 * 60 * 24) ) + 1 );


  // start by displaying the results box on index.html
  document.querySelector('.results').style.display = 'grid';

  // start the countdown and add to index.html
  Client.countdown(daysToTrip);


  if (daysToTrip <= 7) { // if 7 days or less until trip, get the current weather

    // add city to index.html
    document.querySelector('.city-result').innerHTML = city;

    // add departure date to index.html
    document.querySelector('.date').innerHTML = 'departure date: ' + fullDate;

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

        // update the UI with the returned weather data
        Client.updateUICurrent(weatherCurrentData);
      });
    })

    .then(function() {
      // pass the 'city' input into /getPic and request images from Pixabay
      Client.postData( '/getPic', {city: city} )

      .then(function(picData, city) {
        // pass returned 'picData' into updateUI, which adds the pic
        Client.updateUIPic(picData, city);
      });
    });


  //////////////////////////////////////////////////////////////////////
  } else { // if more than 7 days until trip, get the forecasted weather

    // add city to index.html
    document.querySelector('.city-result').innerHTML = city;

    // add departure date to index.html
    document.querySelector('.date').innerHTML = 'departure date: ' + fullDate;

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

        // update the UI with the returned weather data
        Client.updateUIForecast(weatherForecastData);
      });
    })

    .then(function() {
      // pass the 'city' input into /getPic and request images from Pixabay
      Client.postData( '/getPic', {city: city} )

      .then(function(picData) {
        // pass returned 'picData' into updateUI, which adds the pic
        Client.updateUIPic(picData);
      });
    });
  }

}

export {
  logWeather
};
