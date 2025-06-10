const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual OpenWeatherMap API key

async function getWeatherByCity() {
  const city = document.getElementById("city-input").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeatherData(url);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        fetchWeatherData(url);
      },
      (error) => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById("weather-info").innerHTML = `<p>Error: ${data.message}</p>`;
      return;
    }

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    document.getElementById("weather-info").innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById("weather-info").innerHTML = `<p>Unable to fetch weather data.</p>`;
  }
}
