function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationCity = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let mainIcon = response.data.weather[0].icon;
  let country = response.data.sys.country;
  let pressure = response.data.main.pressure;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${locationCity}`;
  let locationCountry = document.querySelector("#country");
  locationCountry.innerHTML = `${country}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = `${weatherDescription}`;
  let humidityInfo = document.querySelector("#humidity");
  humidityInfo.innerHTML = `${humidity}`;
  let windInfo = document.querySelector("#wind");
  windInfo.innerHTML = `${Math.round(wind)}`;
  let pressureInfo = document.querySelector("#pressure");
  pressureInfo.innerHTML = `${pressure}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${mainIcon}@2x.png`
  );
  let localTimeZone = response.data.timezone / 3600;
  var d = new Date();
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  var nd = new Date(utc + 3600000 * localTimeZone);
  let localTime = document.querySelector("#local-time");
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h24",
  };
  localTime.innerHTML = `${nd.toLocaleString("en-US", options)}`;

  function changeToFah(event) {
    event.preventDefault();
    let fahrenheitButton = document.querySelector("#fahrenheitButton");
    let celsiusButton = document.querySelector("#celsiusButton");
    h2.innerHTML = `${Math.round(temperature * 1.8 + 32)}°`;
    fahrenheitButton.innerHTML = `<button id="fahrenheit-button"><strong>F</strong></button>`;
    celsiusButton.innerHTML = `<button id="celsius-button">C</button>`;
  }
  function changeToCel(event) {
    event.preventDefault();
    let fahrenheitButton = document.querySelector("#fahrenheitButton");
    let celsiusButton = document.querySelector("#celsiusButton");
    h2.innerHTML = `${temperature}°`;

    fahrenheitButton.innerHTML = `<button id="fahrenheit-button">F</button>`;
    celsiusButton.innerHTML = `<button id="celsius-button"><strong>C</storng></button>`;
  }
  let tempC = document.querySelector("#celsiusButton");
  tempC.addEventListener("click", changeToCel);
  let tempF = document.querySelector("#fahrenheitButton");
  tempF.addEventListener("click", changeToFah);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast-day");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 day">
                  <div
                    class="card text-center nextDay"
                    style="max-width: 100px; height: 10rem;"
                  >
                    <div class="card-body">
                      <h5 class="card-title">${day}</h5>
                      <p class="card-text"><img src="http://openweathermap.org/img/wn/01d@2x.png" alt="day-icon" id="next-day-icon" width=50px></p>
                      <p class="card-text"><span id="max-temp">13</span> | <span id="min-temp">10</span></p>
                    </div>
                  </div>
                </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "7dfa514196d8ad8df497144d715c56b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  console.log(apiUrl);
  displayForecast();
  axios.get(apiUrl).then(showTemp);
}

function changeCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#enter-city");
  let apiKey = "7dfa514196d8ad8df497144d715c56b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  displayForecast();
  axios.get(apiUrl).then(showTemp);
}

function geolocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

navigator.geolocation.getCurrentPosition(showPosition);

let cityInfo = document.querySelector("#city-form");
cityInfo.addEventListener("submit", changeCity);

let locationButton = document.querySelector("#location-now");
locationButton.addEventListener("click", geolocal);
