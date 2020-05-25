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
    postData('/addData',
            {temperature:data.main.temp, date:newDate, feelings:feelings}
    );
  })
  .then(
    // UPDATE UI with the returned data
    async function updateUI() {
      const request = await fetch('/all');
      try{
        const allData = await request.json();
        console.log(allData);
        document.querySelector('#date').innerHTML = 'happy ' + allData.date + '!';

        document.querySelector('#temp').innerHTML = "it's " +
                                                    allData.temperature.toFixed() +
                                                    '<span>&#176;</span>F';

        document.querySelector('#content').innerHTML = "and I'm feeling " +
                                                        allData.feelings;
      } catch(error) {
        console.log('updateUI error', error);
      }
    }
  );
}



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


export {
  performAction
};
