function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "7dfa514196d8ad8df497144d715c56b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

  function showTemp(response) {
    let temperature = Math.round(response.data.main.temp);

    let locationCity = response.data.name;

    let weatherDescription = response.data.weather[0].description;

    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;
    let mainIcon = response.data.weather[0].icon;

    let h1 = document.querySelector("h1");
    h1.innerHTML = `${locationCity}`;
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${temperature}`;
    let description = document.querySelector("#weather-description");
    description.innerHTML = `${weatherDescription}`;
    let humidityInfo = document.querySelector("#humidity");
    humidityInfo.innerHTML = `${humidity}`;
    let windInfo = document.querySelector("#wind");
    windInfo.innerHTML = `${Math.round(wind)}`;
    console.log(response.data.weather[0].icon);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${mainIcon}@2x.png`
    );
    let localTimeZone = response.data.timezone / 3600;

    // create Date object for current location
    var d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 3600000 * localTimeZone);

    // return time as a string

    let localTime = document.querySelector("#local-time");
    let options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h24",
    };
    localTime.innerHTML = `Local Time: ${nd.toLocaleString("en-US", options)}`;

    function changeToFah(event) {
      event.preventDefault();
      let fahrenheitButton = document.querySelector("#fahrenheitButton");
      let celsiusButton = document.querySelector("#celsiusButton");
      h2.innerHTML = `${temperature * 1.8 + 32}`;
      fahrenheitButton.innerHTML = `<button id="fahrenheitButton"><strong>F</strong></button>`;
      celsiusButton.innerHTML = `<button id="celsiusButton">C /</button>`;
    }
    function changeToCel(event) {
      event.preventDefault();
      let fahrenheitButton = document.querySelector("#fahrenheitButton");
      let celsiusButton = document.querySelector("#celsiusButton");
      h2.innerHTML = `${temperature}`;

      fahrenheitButton.innerHTML = `<button id="fahrenheitButton">F</button>`;
      celsiusButton.innerHTML = `<button id="celsiusButton"><strong>C</storng> /</button>`;
    }
    let tempC = document.querySelector("#celsiusButton");
    tempC.addEventListener("click", changeToCel);
    let tempF = document.querySelector("#fahrenheitButton");
    tempF.addEventListener("click", changeToFah);
  }

  function changeCity(event) {
    event.preventDefault();
    let citySearch = document.querySelector("#enter-city");

    let apiKey = "7dfa514196d8ad8df497144d715c56b0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric&appid=${apiKey}`;

    function showWeather(response) {
      let cityName = document.querySelector("h1");
      cityName.innerHTML = `${response.data.name}`;
      let mainIcon = response.data.weather[0].icon;
      let iconElement = document.querySelector("#icon");
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${mainIcon}@2x.png`
      );

      let temperature = Math.round(response.data.main.temp);
      let descriptionInfoSearched = response.data.weather[0].description;
      let humidityInfoSearched = response.data.main.humidity;
      let windInfoSearched = response.data.wind.speed;
      let h2 = document.querySelector("h2");
      h2.innerHTML = `${temperature}`;
      let weatherDescriptionSearched = document.querySelector(
        "#weather-description"
      );
      weatherDescriptionSearched.innerHTML = `${descriptionInfoSearched}`;
      let humiditySearched = document.querySelector("#humidity");
      humiditySearched.innerHTML = `${humidityInfoSearched}`;
      let windSearched = document.querySelector("#wind");
      windSearched.innerHTML = `${Math.round(windInfoSearched)}`;

      let localTimeZoneSearched = response.data.timezone / 3600;

      // create Date object for current location
      var d = new Date();

      // convert to msec
      // add local time zone offset
      // get UTC time in msec
      var utc = d.getTime() + d.getTimezoneOffset() * 60000;

      // create new Date object for different city
      // using supplied offset
      var nd = new Date(utc + 3600000 * localTimeZoneSearched);

      // return time as a string

      let localTimeSearched = document.querySelector("#local-time");

      let options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h24",
      };
      localTimeSearched.innerHTML = `Local Time: ${nd.toLocaleString(
        "en-US",
        options
      )}`;
    }
    axios.get(apiUrl).then(showWeather);
  }
  let cityInfo = document.querySelector("#city-form");
  cityInfo.addEventListener("submit", changeCity);
  //Geolocation after pressing arrow

  axios.get(apiUrl).then(showTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);

function geolocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#location-now");
locationButton.addEventListener("click", geolocal);
