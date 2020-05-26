/*jshint esversion: 8 */

function countdown() {

  const year = document.querySelector('#year').value;
  const month = document.querySelector('#month').value;
  const day = document.querySelector('#day').value;
  const fullDate = year + '-' + month + '-' + day;
  const tripDate = new Date(fullDate).getTime();
  const now = new Date().getTime();
  const interval = tripDate - now;
  const daysToTrip = Math.floor( interval / (1000 * 60 * 60 * 24) );

  if (daysToTrip < 0) {
    document.querySelector('#interval').innerHTML = 'TODAY IS THE DAY!!!';
  } else if (daysToTrip < 1) {
    document.querySelector('#interval').innerHTML = 'leaving tomorrow!!!';
  } else if (daysToTrip < 2 ) {
    document.querySelector('#interval').innerHTML = daysToTrip + ' more day!!!';
  } else {
    document.querySelector('#interval').innerHTML = daysToTrip + ' more days!';
  }
}

export { countdown };
