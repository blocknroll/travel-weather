/*jshint esversion: 8 */

import { logWeather } from './js/logWeather';
import { getWeather } from './js/getWeather';
import { postData } from './js/postData';
import { updateUI } from './js/updateUI';
import { getLatLng } from './js/getLatLng';
import { countdown } from './js/countdown';
import './styles/style.scss';

console.log("index.js - client: running");

// GENERATE button - add event listener
document.querySelector('#generate').addEventListener('click', logWeather);

export {
  logWeather,
  getWeather,
  postData,
  updateUI,
  getLatLng,
  countdown
};
