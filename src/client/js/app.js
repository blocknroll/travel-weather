/*jshint esversion: 8 */

// CALLBACK function to execute when GENERATE button is clicked
function performAction(e){

  const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
  const apiKey = process.env.API_KEY_OPENWX;
  let d = new Date();
  let newDate = d.getMonth() + 1 + '.' + d.getDate()+ '.' + d.getFullYear();
  let zip = document.getElementById('zip').value;
  let feelings = document.querySelector('#feelings').value;

  Client.getWeather(baseURL, zip, apiKey)
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
  performAction
};
