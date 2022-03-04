let weather = {
  paris: {
    name: "Paris",
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    name: "Tokyo",
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    name: "Lisbon",
    temp: 30.2,
    humidity: 20,
  },
  sanFrancisco: {
    name: "San Francisco",
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    name: "Moscow",
    temp: -5,
    humidity: 20,
  },
};

let userCity = prompt("Type a city!")
  .toLowerCase()
  .trim()
  .replace("sanfrancisco", "san francisco");

if (weather[userCity] !== undefined) {
  alert(
    `Temperature in ${weather[userCity].name} is ${Math.round(
      weather[userCity].temp
    )} °C( ${Math.round(
      weather[userCity].temp * (9 / 5) + 32
    )} °F) with a humidity of ${weather[userCity].humidity} %`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${userCity}`
  );
}
