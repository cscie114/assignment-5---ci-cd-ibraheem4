async function getWeather(location) {
  try {
    const location = "New York"; // Or use any other location you want
    const response = await axios.get(
      `/.netlify/functions/weather?location=${location}`
    );
    const weatherData = response.data;

    // Extract relevant weather information
    const temperature = Math.round(weatherData.main.temp - 273.15); // Convert Kelvin to Celsius
    const description = weatherData.weather[0].description;
    const cityName = weatherData.name;
    const countryCode = weatherData.sys.country;

    // Display weather information on the page
    const weatherContainer = document.getElementById("weather-data");
    weatherContainer.innerHTML = `
      <h2>Weather in ${cityName}, ${countryCode}</h2>
      <p>${description}, ${temperature}°C</p>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Call the getWeather function on page load with the desired location
document.addEventListener("DOMContentLoaded", () => {
  getWeather("New York");
});
