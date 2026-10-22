const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherData(state) {
  try {
    // Clear previous error
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    const response = await fetch(weatherApi + state);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
}

function displayWeather(data) {
  // Clear previous content
  alertsDisplay.innerHTML = "";

  // Clear previous error
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  const heading = document.createElement("h2");
  heading.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(heading);

  data.features.forEach((feature) => {
    const p = document.createElement("p");
    p.textContent = feature.properties.headline;
    alertsDisplay.appendChild(p);
  });
}

function displayError(message) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim();

  fetchWeatherData(state);

  // Clear input field after click
  stateInput.value = "";
});

if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherData,
    displayWeather,
    displayError,
  };
}