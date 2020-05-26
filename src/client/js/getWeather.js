/*jshint esversion: 8 */

async function getWeather (OPENWEATHER_baseURL, zip, OPENWEATHER_API_KEY) {
  const response = await fetch(OPENWEATHER_baseURL+zip+OPENWEATHER_API_KEY);
  try {
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('getWeather error', error);
  }
}

export { getWeather };
