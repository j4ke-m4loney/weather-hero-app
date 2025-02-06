// API Key
const API_KEY = "0fa4f249b9cb1a076bc9e88d6d88f1ea"

// DOM Elements 
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.querySelector(".icon");
const temperature = document.querySelector(".temp");
const weatherDetails = document.querySelector(".details");
const challengeText = document.getElementById("challenge-text");

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

// Function to Update UR with Weather Data
function updateWeatherUI(data) {
  weatherDetails.innerText = `${data.weather[0].main} | Humidity: ${data.main.humidity}% | Wind ${data.wind.speed} km/h`
  // weatherIcon.innerText

  console.log("Weather Data Received:", data); // Log full API response
  console.log("Weather Condition:", data.weather[0].main);
  console.log("Humidity:", data.main.humidity);
  console.log("Wind Speed:", data.wind.speed);
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