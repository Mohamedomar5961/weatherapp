const key = "bc15f6779cb135dee27cb56d69f09ee2";
const container = document.getElementById("container");
const option = document.getElementById("option");
const content = document.getElementById("content");

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "San Francisco",
  "Charlotte",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington D.C.",
  "Boston",
  "El Paso",
  "Detroit",
  "Nashville",
  "Portland",
  "Memphis",
  "Oklahoma City",
  "Las Vegas",
  "Louisville",
  "Baltimore",
  "Milwaukee",
  "Albuquerque",
  "Tucson",
  "Fresno",
  "Sacramento",
  "Kansas City",
  "Long Beach",
  "Mesa",
  "Atlanta",
  "Miami",
  "Omaha",
  "Raleigh",
  "Colorado Springs",
  "Boise",
  "New Orleans",
  "Wichita",
  "Laredo",
  "Chandler",
  "Madison",
  "St. Louis",
  "Durham",
  "Lubbock",
  "Scottsdale",
];
container.style.height = screen.height * 0.8 + "px";
const shuffler = cities.sort(() => 0.5 - Math.random());
const shuffledcities = shuffler.slice(0, 7);
window.onload = function () {
  poopiFetcher(shuffledcities[6]);
  apifetcher(shuffledcities[6]);
  optionfetcher(shuffledcities[1]);
  optionfetcher(shuffledcities[2]);
  optionfetcher(shuffledcities[3]);
  optionfetcher(shuffledcities[4]);
  optionfetcher(shuffledcities[5]);
  weeklyFetcher(shuffledcities[6]);
};
console.log(window.outerHeight);
document.getElementById("search").addEventListener("submit", function (event) {
  event.preventDefault();
  const inputValue = document.getElementById("search-input").value;
  apifetcher(inputValue);
  poopiFetcher(inputValue);
  weeklyFetcher(inputValue);
});

function formatDate() {}

function weeklyFetcher(city) {
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        console.log("papfof not good");
      }
      return res.json();
    })
    .then((data) => {
      const Data = data.list[0];
      const temp = Math.round(Data.main.temp - 273.15);
      const wind = Math.round(Data.wind.speed * 3.6);
      const date = new Date(Data.dt);

      console.log();
    })
    .catch((err) => {
      console.error(
        "There is a problem with the fetch operation: weeklyFetcher => ",
        err
      );
    });
}

function apifetcher(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        console.log("Response was not found");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Searched City: ", data);
      const temK = data.main.temp;
      const temC = temK - 273.15;
      const rainyBg = 'url("img/rainy.jpg")';
      const snowyBg = 'url("img/snow-pixel.jpg")';
      const sunyBg = 'url("img/sunny.jpg")';
      if (temC < 11) {
        container.style.backgroundImage = snowyBg;
      } else if (temC > 10 && temC < 16) {
        container.style.backgroundImage = rainyBg;
      } else if (temC > 15) {
        container.style.backgroundImage = sunyBg;
      }
    })
    .catch((err) => {
      console.error(
        "There was a proplem with the fetch operation: apifetcher => ",
        err
      );
    });
}

function poopiFetcher(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        console.log("Response was not found");
      }
      return res.json();
    })
    .then((data) => {
      contentCreation(data);
    })
    .catch((err) => {
      console.error(
        "There was a proplem with the fetch operation: apifetcher => ",
        err
      );
    });
}

function optionfetcher(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        console.log("Response was not found");
      }
      return res.json();
    })
    .then((data) => {
      const temK = data.main.temp;
      const temC = temK - 273.15;
      const htemk = data.main.temp_max;
      const htemC = htemk - 273.15;
      const high = Math.round(htemC);
      const ltemk = data.main.temp_min;
      const ltemC = ltemk - 273.15;
      const low = Math.round(ltemC);
      const temperture = Math.round(temC);
      optionCreation(city, temperture, high, low);
    })
    .catch((err) => {
      console.error(
        "There was a proplem with the fetch operation: optionfetcher => ",
        err
      );
    });
}

function optionCreation(city, temperture, highT, lowT) {
  const option1 = document.createElement("div");
  option1.id = "option1";
  const degs = document.createElement("div");
  degs.id = "degs";
  const degree = document.createElement("p");
  degree.classList.add("degree");
  const span = document.createElement("span");
  const high_low = document.createElement("div");
  high_low.id = "high-low-div";
  const up = document.createElement("p");
  const down = document.createElement("p");
  const arrowup = document.createElement("i");
  arrowup.classList.add("fa-solid", "fa-arrow-up");
  const arrowdown = document.createElement("i");
  arrowdown.classList.add("fa-solid", "fa-arrow-down");
  const optionCity = document.createElement("p");
  optionCity.classList.add("option-city");
  const tempText = document.createTextNode(temperture);
  const cityText = document.createTextNode(city);
  const highText = document.createTextNode(highT);
  const lowText = document.createTextNode(lowT);
  span.textContent = "°";

  option.appendChild(option1);
  option1.appendChild(degs);
  degs.appendChild(degree);
  degree.appendChild(tempText);
  degree.appendChild(span);
  degs.appendChild(high_low);
  high_low.appendChild(up);
  up.appendChild(arrowup);
  up.appendChild(highText);
  high_low.appendChild(down);
  down.appendChild(arrowdown);
  down.appendChild(lowText);
  option1.appendChild(optionCity);
  optionCity.appendChild(cityText);

  option1.addEventListener("click", (event) => {
    console.log("clicked");
    apifetcher(city);
  });
}

function contentCreation(data) {
  const temperture = Math.round(data.main.temp - 273.15);
  const wind = Math.round(data.wind.speed * 3.6);
  const date = new Date(data.dt);
  const humidity = data.main.humidity;
  const visibility = data.visibility;
  const description = data.weather[0].description;

  const time = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  const theDate = date.toLocaleString("en-US", {
    month: "short",
    weekday: "long",
  });

  const month = date.toLocaleString("en-US", {
    month: "short",
  });
  const dayOfWeek = date.toLocaleString("en-US", {
    weekday: "long",
  });
  const day = date.getDate();

  const tempDesc = document.createElement("div");
  const humWinVis = document.createElement("div");
  const future = document.createElement("div");
  const tempInfo = document.createElement("div");
  const timeDate = document.createElement("p");
  const temp = document.createElement("p");
  const desc = document.createElement("p");
  const tempSpan = document.createElement("span");
  const dateSpan = document.createElement("span");
  tempDesc.id = "temp-desc";
  humWinVis.id = "hum-win-vis";
  future.id = "future";
  tempInfo.id = "temp-info";
  timeDate.id = "time-date";
  temp.id = "temp";
  desc.id = "desc";
  tempSpan.id = "temp-span";
  dateSpan.id = "date=span";
  temp.textContent = Math.round(data.main.temp - 273.15);
  tempSpan.textContent = "°";
  const descText = document.createTextNode(description);
  const timeDateText = document.createTextNode(time);
  dateSpan.textContent = `${dayOfWeek}, ${month} ${day}`;

  content.appendChild(tempDesc);
  content.appendChild(humWinVis);
  content.appendChild(future);
  tempDesc.appendChild(tempInfo);
  tempDesc.appendChild(timeDate);
  tempInfo.appendChild(temp);
  tempInfo.appendChild(desc);
  temp.appendChild(tempSpan);
  desc.appendChild(descText);
  tempDesc.appendChild(timeDate);
  timeDate.appendChild(timeDateText);
  timeDate.appendChild(dateSpan);

  console.log("Fun Temp: ", temperture);
}
