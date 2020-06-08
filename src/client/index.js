/*jshint esversion: 8 */

import { logWeather } from './js/logWeather';
import { countdown } from './js/countdown';
import { postData } from './js/postData';
import { updateUICurrent } from './js/updateUICurrent';
import { updateUIForecast } from './js/updateUIForecast';
import { updateUIPic } from './js/updateUIPic';
import './styles/style.scss';
import './styles/colors.scss';
import './styles/fonts.scss';

console.log("index.js - client: running");

// GENERATE button: add event listener. After a click, calls 'logWeather'
document.querySelector('#generate').addEventListener('click', logWeather);

export {
  logWeather,
  countdown,
  postData,
  updateUICurrent,
  updateUIForecast,
  updateUIPic
};
