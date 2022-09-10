function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
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

function formatDay(timestamp) {
  let newDate = new Date(timestamp * 1000);
  let day = newDate.getDay();
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml += `<div class="col-2 d-flex flex-column mb-3 card-item">
            <div class="p-2 ps-4 card-item-date">${formatDay(
              forecastDay.dt
            )}</div>
            <div class="p-2 ps-4">
              <img class="w-100 card-item-img" src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="sun" />
            </div>
            <div class="p-2 ps-4 mb-4 card-item-temperature">${Math.round(
              forecastDay.temp.day
            )}°C</div>
      </div>`;
    }
  });
  forecastHtml += `</div>`;
  forecastElement.innerHTML = forecastHtml;
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
  changeWind.innerHTML = `Wind: ${wind} `;
  changeIcon(response);
}

function getForecast(coordinates) {
  let apiKey = "8ae83c6977d5f0288147cd2a07fecdae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherCurrent(response) {
  let nameCity = document.querySelector("#nameCity");
  let changeType = document.querySelector("#typeWeather");
  let changeTemp = document.querySelector("#currentTemp");
  let changeHumidity = document.querySelector("#precipitation");
  let changeWind = document.querySelector("#speedWind");
  let time = document.querySelector("#time");

  celsiusTemp = response.data.main.temp;

  let temp = Math.round(celsiusTemp);
  let place = response.data.name;
  let weather = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;

  nameCity.innerHTML = place;
  changeTemp.innerHTML = `${temp}`;
  changeType.innerHTML = weather;
  changeHumidity.innerHTML = `Humidity: ${humidity}`;
  changeWind.innerHTML = `Wind: ${wind}`;
  time.innerHTML = formatDate(response.data.dt * 1000);
  changeIcon(response);
}

function changeIcon(response) {
  let weather = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${weather}`);

  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  let city = cityName.value;
  let changeCity = document.querySelector("#nameCity");
  changeCity.innerHTML = city;
  let apiKey = "8ae83c6977d5f0288147cd2a07fecdae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCurrent);
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

function changeUnitsCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  celsiusLink.classList.remove("activeLink");
  farenheitLink.classList.add("activeLink");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheitTemp);
}

function changeUnitsFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  farenheitLink.classList.remove("activeLink");
  celsiusLink.classList.add("activeLink");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let currentBtn = document.querySelector("#current");
let searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", showCity);
currentBtn.addEventListener("click", showCurrentPosition);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", changeUnitsCelsius);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeUnitsFarenheit);

showCurrentPosition();
