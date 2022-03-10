function formatDate() {
  let time = document.querySelector("h3");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
  time.innerHTML = `${day} ${hours}:${minutes}`;
}
formatDate(new Date());
//Search city, show in h1 and temperature in h2
//Note to self:Still need .trim() in case of searching spaces!!!

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "7dfa514196d8ad8df497144d715c56b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  console.log(apiUrl);
  console.log(latitude);
  console.log(longitude);
  function showTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    let locationCity = response.data.name;
    console.log(locationCity);
    let weatherDescription = response.data.weather[0].description;
    console.log(weatherDescription);
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;

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
      console.log(temperature);
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
    let cityName = document.querySelector("h1");
    cityName.innerHTML = `${citySearch.value}`;

    let apiKey = "7dfa514196d8ad8df497144d715c56b0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric&appid=${apiKey}`;

    function showWeather(response) {
      let temperature = Math.round(response.data.main.temp);
      let h2 = document.querySelector("h2");
      h2.innerHTML = `${temperature}`;
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
