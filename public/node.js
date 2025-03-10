document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('weatherForm');
  const resultDiv = document.getElementById('weatherResult');
  const resultWind = document.getElementById('wind');
  const resultCode = document.getElementById('code');
  const resultDescription = document.getElementById('description');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: city }),
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.innerHTML = `Temperature in ${city}: ${data.temperature}°C`;
        resultWind.innerHTML = `Wind speed in ${city}: ${data.windSpeed} m/s`;
        resultCode.innerHTML = `Country ISO code: ${data.countryCode}`;
        resultDescription.innerHTML = `Weather Description: ${data.weatherDescription}`;
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p id="error">Error fetching weather data</p>`;
    });
});
});
