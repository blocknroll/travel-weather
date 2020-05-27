/*jshint esversion: 8 */

async function getWeather (baseURL, zip, apiKey) {
  console.log(zip);
  const response = await fetch(baseURL+zip+apiKey);
  try {
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('getWeather error', error);
  }
}

export { getWeather };
