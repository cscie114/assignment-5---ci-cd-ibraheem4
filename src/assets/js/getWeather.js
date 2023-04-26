async function getWeather(location) {
  try {
    const response = await axios.get(`/api/weather?location=${location}`);
    const data = response.data;

    // Convert temperature from Kelvin to Celsius
    const temperature = data.main.temp - 273.15;

    // Update the DOM with the weather data
    const weatherElement = document.getElementById("weather-data");
    weatherElement.textContent = `Temperature in ${
      data.name
    }: ${temperature.toFixed(1)}°C`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Call the getWeather function on page load with the desired location
document.addEventListener("DOMContentLoaded", () => {
  getWeather("New York");
});
