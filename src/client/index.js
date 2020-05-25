/*jshint esversion: 8 */

import { performAction } from './js/app';
import { getWeather } from './js/getWeather';
import { postData } from './js/postData';

import './styles/style.scss';

console.log("index.js - client: running");
alert('yeh brah!');

// GENERATE button - add event listener
document.querySelector('#generate').addEventListener('click', performAction);

export {
  performAction,
  getWeather,
  postData
};
