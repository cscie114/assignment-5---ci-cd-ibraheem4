/* eslint-disable no-undef */
const EleventyFetch = require("@11ty/eleventy-fetch");
require("dotenv").config();

module.exports = async function () {
  /* National Parks Service API
     https://developer.nps.gov/api/v1/parks */

  let baseUrl = "https://developer.nps.gov/api/v1/parks";
  let userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0";
  let apiKey = process.env.NPS_API_KEY;
  let limit = 600;

  let requestParams = {
    api_key: apiKey,
    limit: limit,
  };

  try {
    let params = new URLSearchParams(requestParams);
    let queryString = params.toString();
    let url = baseUrl + "?" + queryString;
    // console.log(url);
    let parksData = await EleventyFetch(url, {
      fetchOptions: {
        headers: {
          "User-Agent": userAgent,
        },
      },
      duration: "1d",
      type: "json",
    }).then((jsonData) => {
      return jsonData;
    });
    // console.log(parksData);
    return parksData;
  } catch (err) {
    console.error("something is wrong");
    console.log(err);
  }
};
