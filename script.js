// Select DOM elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');


const API_KEY = '6cd58e77c84b01aa998f04b56511de40'; // Get your API key from https://openweathermap.org/

// Event listener for form submission
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        weatherInfo.innerHTML = '<p>Loading...</p>';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('City not found or invalid API key.');
        }

        const data = await response.json();

        // Extract relevant data
        const { name, main, weather } = data;
        const temperature = main.temp;
        const description = weather[0].description;

        // Display weather information
        weatherInfo.innerHTML = `
      <p><strong>Location:</strong> ${name}</p>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Condition:</strong> ${description}</p>
    `;
    } catch (error) {
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});