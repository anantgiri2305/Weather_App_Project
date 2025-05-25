const apiKey = "247600b0bfcc6f554a3df5cc40c6ef28"; // Replace with your actual API key

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let city = cityInput.value.trim();

  // Basic validation
  if (!city) {
    resultDiv.innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
    return;
  }

  // Auto-append ',IN' if country not provided
  if (!city.includes(",")) {
    city += ",IN"; // Defaults to India
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("City not found. Please enter a valid city name.");
      } else if (res.status === 401) {
        throw new Error("Invalid API key. Please check your API key.");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }

    const data = await res.json();
    const { main, weather, name, sys } = data;

    resultDiv.innerHTML = `
      <h2>${name}, ${sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" />
      <p><strong>Temperature:</strong> ${main.temp} °C</p>
      <p><strong>Condition:</strong> ${weather[0].description}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color: red;">${err.message}</p>`;
  }
});
