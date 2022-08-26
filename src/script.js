function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    minutes = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let changeType = document.querySelector("#typeWeather");
  let changeTemp = document.querySelector("#currentTemp");
  let changeHumidity = document.querySelector("#precipitation");
  let changeWind = document.querySelector("#speedWind");

  let temp = Math.round(response.data.main.temp);
  let weather = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;

  changeType.innerHTML = weather;
  changeTemp.innerHTML = temp;
  changeHumidity.innerHTML = `Humidity: ${humidity}`;
  changeWind.innerHTML = `Wind: ${wind}`;
}

function showWeatherCurrent(response) {
  let nameCity = document.querySelector("#nameCity");
  let changeType = document.querySelector("#typeWeather");
  let changeTemp = document.querySelector("#currentTemp");
  let changeHumidity = document.querySelector("#precipitation");
  let changeWind = document.querySelector("#speedWind");
  let time = document.querySelector("#time");

  let temp = Math.round(response.data.main.temp);
  let place = response.data.name;
  let weather = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;

  nameCity.innerHTML = place;
  changeTemp.innerHTML = temp;
  changeType.innerHTML = weather;
  changeHumidity.innerHTML = `Humidity: ${humidity}`;
  changeWind.innerHTML = `Wind: ${wind}`;
  time.innerHTML = formatDate(response.data.dt * 1000);
}

function showCity() {
  let cityName = document.querySelector("#cityName");
  let city = cityName.value;
  let changeCity = document.querySelector("#nameCity");
  changeCity.innerHTML = city;
  let apiKey = "8ae83c6977d5f0288147cd2a07fecdae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentPlace(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "8ae83c6977d5f0288147cd2a07fecdae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCurrent);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPlace);
}

let currentBtn = document.querySelector("#current");
let searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", showCity);
currentBtn.addEventListener("click", showCurrentPosition);
