# Weather Journal App

## Overview
The goal of this project is to create an asynchronous web app that uses Web API and user data to dynamically update the UI.

A user can enter a zip code and their mood, and then click to "Log Your Weather."

An Event Listener is listening for that click, and once it hears it, performs a series of steps, asynchronously:

- First, the user's inputs are retrieved from the DOM.

- Next, the user's zip code is sent in an API call to openweathermap.org.

- After receiving the returned weather data, a POST request is sent to the   server to post the new weather info, along with the user's text input.

- After that's completed, the UI is updated to display the user's post.
