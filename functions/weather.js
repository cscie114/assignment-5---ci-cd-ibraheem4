const axios = require("axios");

exports.handler = async function (event) {
  try {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const location = event.queryStringParameters.location || "New York";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
