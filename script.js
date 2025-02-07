// API Key
const API_KEY = "0fa4f249b9cb1a076bc9e88d6d88f1ea"

// DOM Elements 
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.querySelector(".icon");
const temperature = document.querySelector(".temp");
const weatherDetails = document.querySelector(".details");
const challengeText = document.getElementById("challenge-text");
const forecastContainer = document.querySelector(".forecast-container");

// This function will fetch the weather
async function fetchWeather(city) {

  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    if (data.cod === 200) {
      updateWeatherUI(data);
    } else {
      alert("City not found. Please enter another one.")
    }
  } catch (error) {
    console.error("Error fetching weather!", error);
  }
}

// Function to collect 5 day Forecast 
async function fetchForecast(city) {
  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(FORECAST_URL);
    const data = await response.json();

    if (data.cod === "200") {
      updateForecastUI(data);
    } else {
      alert("Error fetching forecast data.");
    }
  } catch (error) {
    console.error("Error fetching forecast!", error);
  }
}


// Function to Update UI with Weather Data
function updateWeatherUI(data) {
  weatherDetails.innerText = `${data.weather[0].main} | Humidity: ${data.main.humidity}% | Wind ${data.wind.speed} km/h`
  temperature.innerText = `${Math.round(data.main.temp)}°C`;

  // Update the weather icon based on condition
  weatherIcon.innerText = getWeatherEmoji(data.weather[0].main);

  // Generate a challenge based on the weather
  generateWeatherChallenge(data.weather[0].main)
}


// Function to Get Emoji for Weather Condition 
function getWeatherEmoji(condition) {
  const weatherEmojis = {
    Clear: "🌞",
    Clouds: "⛅",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "🌨️",
    Mist: "🌬️",
  };
  return weatherEmojis[condition] || "🌎";
}

// Function to Generate a Weather Challenge 
function generateWeatherChallenge(condition) {
  const challenges = {
    Clear: ["Take a walk and enjoy the sun! 🌞", "Sunglasses day! 😎", "Stay hydrated! 💧"],
    Clouds: ["Spot shapes in the clouds ⛅", "Perfect day for coffee! 🍵", "Indoor fun time! 🎮"],
    Rain: ["Splash in puddles! 🌧️", "Movie marathon time! 🍿", "Relax with rain sounds. 🎧"],
    Thunderstorm: ["Watch the lightning! 🌩️", "Stay cozy with a book. 📖", "Hot tea and chill! 🍵"],
    Snow: ["Build a snowman! ⛄", "Winter wonderland adventure! 🥶", "Blanket and hot chocolate time! 🍵"],
    Mist: ["Misty morning walk! 🌬️", "Drive safely in fog! 🚗", "Mysterious weather vibes! 🕯️"]
  };

  const challengeList = challenges[condition] || ["Be the hero and embrace today's weather! 🌍"];

  // Randomly selects a challenge by choosing a random number between 1-3 then mulitplies that number challengeList.length and rounds 
  const randomChallenge = challengeList[Math.floor(Math.random() * challengeList.length)];

  challengeText.innerText = randomChallenge;
}


// Event Listener for Search button
searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if (city) {
    fetchWeather(city);
  } else {
    alert("Please center a city name.")
  }
})