/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function logWeather(e){
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

    // async POST Function //////////////////////////
  const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), //body datatype must match "Content-Type" header
    });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("postData error", error);
      // appropriately handle the error
    }
  };

  Client.countdown(daysToTrip);


  if (daysToTrip < 8) { /////////////////////////////////////////////////////

    // add departure date to index.html
    document.querySelector('#date').innerHTML = 'departure date: ' + fullDate;

    Client.postData( '/getLatLng', {city: city} )
    .then( function(geonamesData) {
      // Client.postData( '/getWeatherCurrent', {geonamesData: geonamesData} );
      // console.log('sent geonamesData to /getWeatherCurrent');

      postData('/getWeatherCurrent', {geonamesData: geonamesData} )
      .then(function(res) {
        console.log(res);
        console.log(res.data[0].temp);
        postData('/addData',
                       {temperature:res.data[0].temp, date:fullDate}
        );
      })
      .then(function() {
        Client.updateUICurrent();
      });
    });

    // .then( function(weatherbitData) {
    //   console.log(weatherbitData);
    //   Client.postData('/addData',
    //                  {temperature:weatherbitData, date:fullDate}
    //   );
    // });
    // .then(function() {
    //   Client.updateUICurrent();
    // });


  } else { //////////////////////////////////////////////////////////////////

    // add departure date to index.html
    document.querySelector('#date').innerHTML = 'departure date: ' + fullDate;

    Client.postData( '/getLatLng', {city: city} )
    .then( function(geonamesData) {
      // Client.postData( '/getWeatherCurrent', {geonamesData: geonamesData} );
      // console.log('sent geonamesData to /getWeatherCurrent');

      postData('/getWeatherForecast', {geonamesData: geonamesData} )
      .then(function(res) {
        console.log(res);
        console.log(res.data[0].temp);
        postData('/addData',
                       {temperature:res.data[0].temp, date:fullDate}
        );
      })
      .then(function() {
        Client.updateUIForecast();
      });
    });

    // Client.postData( '/getLatLng', {city: city} )
    // .then( function(geonamesData) {
    //   Client.postData( '/getWeatherForecast', {geonamesData: geonamesData} );
    // })
    // .then( function(weatherbitData) {
    //   Client.postData('/addData',
    //                  {temperature:weatherbitData.data[0].temp, date:fullDate}
    //   );
    // })
    // .then(function() {
    //   Client.updateUIForecast();
    // });

  }
}

export {
  logWeather
};
