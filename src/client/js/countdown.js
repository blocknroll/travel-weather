/*jshint esversion: 8 */

function countdown(daysToTrip) {
  if (daysToTrip < 0) {
    document.querySelector('#interval').innerHTML = 'days until trip: TODAY IS THE DAY!!!';
  } else if (daysToTrip < 1) {
    document.querySelector('#interval').innerHTML = 'days until trip: leaving tomorrow!!!';
  } else if (daysToTrip < 2 ) {
    document.querySelector('#interval').innerHTML = 'days until trip: ' + daysToTrip + ' more day!!!';
  } else {
    document.querySelector('#interval').innerHTML = 'days until trip: ' + daysToTrip + ' more days!';
  }
}

export { countdown };
