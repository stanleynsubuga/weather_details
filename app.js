const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8080;

// Middleware to parse request body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'node.html'));
});

app.post('/', (req, res) => {
  const query = req.body.city;
  const key = "bb150e22c95a79df3f392efa45be9dad";
  const unit = "metric";
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=${unit}`;

  https.get(url, (response) => {
    let data = '';

    // Listen for data chunks
    response.on("data", (chunk) => {
      data += chunk;
    });

    // End of response
    response.on("end", () => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherType = weatherData.weather[0].description
      const countryCity = weatherData.sys.country
      const weatherWind = weatherData.wind.speed

      console.log(countryCity);
      console.log(weatherType);      
      console.log(temp);
      console.log(weatherWind);

      res.json({
        temperature: temp,
        windSpeed: weatherWind,
        countryCode: countryCity,
        weatherDescription: weatherType
      });
    });

  }).on('error', (error) => {
    console.error(error);
    res.send('Error fetching weather data');
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`App is listening on port ${process.env.PORT || port}`);
});
