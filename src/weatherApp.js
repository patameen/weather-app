function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationCity = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let mainIcon = response.data.weather[0].icon;
  let country = response.data.sys.country;
  let pressure = response.data.main.pressure;
  let direction = response.data.wind.deg;
  let conditionCode = response.data.weather[0].id;

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

  let windDirection = document.querySelector("#direction");

  if (direction > 348.75 && direction < 11.25) {
    windDirection.innerHTML = `N `;
  } else if (direction > 11.25 && direction < 33.75) {
    windDirection.innerHTML = `NNE `;
  } else if (direction > 33.75 && direction < 56.25) {
    windDirection.innerHTML = `NE `;
  } else if (direction > 56.25 && direction < 78.75) {
    windDirection.innerHTML = `ENE `;
  } else if (direction > 78.75 && direction < 101.25) {
    windDirection.innerHTML = `E `;
  } else if (direction > 101.25 && direction < 123.75) {
    windDirection.innerHTML = `ESE `;
  } else if (direction > 123.75 && direction < 146.25) {
    windDirection.innerHTML = `SE `;
  } else if (direction > 146.25 && direction < 168.75) {
    windDirection.innerHTML = `SSE  `;
  } else if (direction > 168.75 && direction < 191.25) {
    windDirection.innerHTML = `S `;
  } else if (direction > 191.25 && direction < 213.75) {
    windDirection.innerHTML = `SSW `;
  } else if (direction > 213.75 && direction < 236.25) {
    windDirection.innerHTML = `SW `;
  } else if (direction > 236.25 && direction < 258.75) {
    windDirection.innerHTML = `WSW `;
  } else if (direction > 258.75 && direction < 281.25) {
    windDirection.innerHTML = `W `;
  } else if (direction > 281.25 && direction < 303.75) {
    windDirection.innerHTML = `WNW `;
  } else if (direction > 303.75 && direction < 326.25) {
    windDirection.innerHTML = `NW `;
  } else if (direction > 326.25 && direction < 348.75) {
    windDirection.innerHTML = `NNW `;
  }
  let activity = document.querySelector("#suggested-activity");
  if (conditionCode >= 200 && conditionCode <= 232) {
    activity.innerHTML = `Good day to read a book!📖`;
  } else if (conditionCode > 300 && conditionCode < 322) {
    activity.innerHTML = `Good day to watch a movie!🎬`;
  } else if (conditionCode >= 500 && conditionCode <= 531) {
    activity.innerHTML = `Excellent weather to stay home!🧑🏼‍🎨`;
  } else if (conditionCode >= 600 && conditionCode <= 622) {
    activity.innerHTML = `A good day for snow activity?🎿`;
  } else if (conditionCode >= 701 && conditionCode <= 781) {
    activity.innerHTML = `Weather might get interesting!🦄`;
  } else if (conditionCode === 800) {
    activity.innerHTML = `Great time for a jog! 🏃🏽`;
  } else if (conditionCode >= 801 && conditionCode <= 804) {
    activity.innerHTML = `Clouds never stopped nobody! ⚽️`;
  }

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
  let moreInfo = document.querySelector("#more-info");
  moreInfo.setAttribute(
    "href",
    `https://www.google.com/search?q=weather+in+${response.data.name}`
  );
  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-day");

  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 day">
                  <div
                    class="card text-center nextDay"
                    style="max-width: 100px; height: 10rem;"
                  >
                    <div class="card-body">
                      <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                      <p class="card-text"><img src="https://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png" alt="day-icon" id="next-day-icon" width=50px></p>
                      <p class="card-text"><span id="max-temp">${Math.round(
                        forecastDay.temp.max
                      )}</span> | <span id="min-temp">${Math.round(
          forecastDay.temp.min
        )}</span></p>
                    </div>
                  </div>
                </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  function changeToFah(event) {
    event.preventDefault();
    let h2 = document.querySelector("h2");
    let fahrenheitButton = document.querySelector("#fahrenheitButton");
    let celsiusButton = document.querySelector("#celsiusButton");
    h2.innerHTML = `${Math.round(forecast[0].temp.day * 1.8 + 32)}°`;
    fahrenheitButton.innerHTML = `<button id="fahrenheit-button"><strong>F</strong></button>`;
    celsiusButton.innerHTML = `<button id="celsius-button">C</button>`;
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 7 && index > 0) {
        forecastHTML =
          forecastHTML +
          `<div class="col-2 day">
                  <div
                    class="card nextDay"
                    style="max-width: 100px; height: 10rem;"
                  >
                    <div class="card-body">
                      <h5 class="card-title text-center">${formatDay(
                        forecastDay.dt
                      )}</h5>
                      <p class="card-text"><img src="https://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png" alt="day-icon" id="next-day-icon" width=50px></p>
                      <p class="card-text"><span id="max-temp">${Math.round(
                        forecastDay.temp.max * 1.8 + 32
                      )}</span> | <span id="min-temp">${Math.round(
            forecastDay.temp.min * 1.8 + 32
          )}</span></p>
                    </div>
                  </div>
                </div>`;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  function changeToCel(event) {
    event.preventDefault();
    let h2 = document.querySelector("h2");
    let fahrenheitButton = document.querySelector("#fahrenheitButton");
    let celsiusButton = document.querySelector("#celsiusButton");
    h2.innerHTML = `${Math.round(forecast[0].temp.day)}°`;
    displayForecast(response);
    fahrenheitButton.innerHTML = `<button id="fahrenheit-button">F</button>`;
    celsiusButton.innerHTML = `<button id="celsius-button"><strong>C</storng></button>`;
  }
  let tempC = document.querySelector("#celsiusButton");
  tempC.addEventListener("click", changeToCel);
  let tempF = document.querySelector("#fahrenheitButton");
  tempF.addEventListener("click", changeToFah);
}
function getForecast(coordinates) {
  let key = "7dfa514196d8ad8df497144d715c56b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "7dfa514196d8ad8df497144d715c56b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function changeCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#enter-city");
  let apiKey = "7dfa514196d8ad8df497144d715c56b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric&appid=${apiKey}`;
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
