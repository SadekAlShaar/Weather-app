// index.js
require('dotenv').config(); // to defiend .env
const express = require('express');
const axios = require('axios'); // to send and get data

const app = express();
const port = 3000;


app.use(express.static('public'));

// Endpoint to fetch weather data
//From hier start the integration
app.get('/weather', async (req, res) => {
  const city = req.query.city; 
  if (!city) {
    return res.status(400).send('City is required');
  }

  try {

    // OpenWeatherMap API
    //I can use another API like: Google

    const apiKey = process.env.API_KEY_WEATHER; 
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    
    const data = {
      city: response.data.name,
      temperature: response.data.main.temp,
      weather: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      feelsLike: response.data.main.feels_like,
      tempMin: response.data.main.temp_min,
      tempMax: response.data.main.temp_max,
    };

    res.json(data); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

// Start server
//This step should be set as first, but we set at the bottom because we have to run code before run client side.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
