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
  contentFetcher(shuffledcities[6]);
  apifetcher(shuffledcities[6]);
  optionfetcher(shuffledcities[1]);
  optionfetcher(shuffledcities[2]);
  optionfetcher(shuffledcities[3]);
  optionfetcher(shuffledcities[4]);
  optionfetcher(shuffledcities[5]);
  const inputValue = document.getElementById("search-input");
  if (window.innerWidth < 1000) {
    inputValue.placeholder = shuffledcities[6];
  }
};

document.getElementById("search").addEventListener("submit", function (event) {
  event.preventDefault();
  const inputValue = document.getElementById("search-input");
  apifetcher(inputValue.value);
  contentFetcher(inputValue.value);
  inputValue.value = "";
});

function formatDate() {}

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
      const temC = data.main.temp - 273.15;
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
    contentFetcher(city);
  });
}
function contentFetcher(city) {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const weeklyUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
  Promise.all([
    fetch(currentUrl).then((res) => {
      if (!res.ok) {
        console.log("currentUrl: Response was not found");
      }
      return res.json();
    }),
    fetch(weeklyUrl).then((res) => {
      if (!res.ok) {
        console.log("weeklyUrl: Response was not found");
      }
      return res.json();
    }),
  ])
    .then(([currentData, weeklyData]) => {
      contentCreation(currentData, weeklyData);
    })
    .catch((err) => {
      console.error(
        "There was a proplem with the fetch operation: apifetcher => ",
        err
      );
    });
}

function contentCreation(data, weekly) {
  const wind = Math.round(data.wind.speed * 3.6);
  const humidity = data.main.humidity;
  const visibility = data.visibility / 1000;
  const description = data.weather[0].description;
  const inputValue = document.getElementById("search-input");
  if (window.innerWidth < 1000) {
    inputValue.placeholder = data.name;
  }

  const timezone = data.timezone;
  const localTime = new Date((data.dt + timezone) * 1000);

  const time = localTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  const month = localTime.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const dayOfWeek = localTime.toLocaleString("en-US", {
    weekday: "short",
    timeZone: "UTC",
  });
  const day = localTime.getDate();

  const tempDesc = document.getElementById("temp-desc");
  if (!tempDesc) {
    const tempDesc = document.createElement("div");
    const humWinVis = document.createElement("div");
    const future = document.createElement("div");
    const tempInfo = document.createElement("div");
    const timeDate = document.createElement("div");
    const cityName = document.createElement("p");
    const tem_img = document.createElement("img");
    const timedateP = document.createElement("p");

    const temp = document.createElement("p");
    const desc = document.createElement("p");
    const tempSpan = document.createElement("span");
    const dateSpan = document.createElement("span");
    const windDiv = document.createElement("div");
    const humityDiv = document.createElement("div");
    const visiblityDiv = document.createElement("div");
    const windP = document.createElement("p");
    const humP = document.createElement("p");
    const visP = document.createElement("p");
    const windI = document.createElement("i");
    const humI = document.createElement("i");
    const visI = document.createElement("i");
    const windPText = document.createElement("p");
    const humPText = document.createElement("p");
    const visPText = document.createElement("p");
    const tomorrow = document.createElement("p");

    windPText.textContent = "Wind";
    humPText.textContent = "Humidity";
    visPText.textContent = "Visibility";
    tem_img.id = "tem_img";
    cityName.id = "city_name";
    timedateP.id = "timedateP";
    windI.classList.add("fa-solid", "fa-wind");
    humI.classList.add("fa-solid", "fa-droplet");
    visI.classList.add("fa-solid", "fa-eye");
    windDiv.id = "wind";
    humityDiv.id = "humity";
    visiblityDiv.id = "visiblity";
    tempDesc.id = "temp-desc";
    humWinVis.id = "hum-win-vis";
    future.id = "future";
    tempInfo.id = "temp-info";
    timeDate.id = "time-date";
    temp.id = "temp";
    desc.id = "desc";
    tempSpan.id = "temp-span";
    dateSpan.id = "date-span";
    temp.textContent = Math.round(data.main.temp - 273.15);
    tempSpan.textContent = "°";
    desc.textContent = description;
    cityName.textContent = data.name;
    timedateP.textContent = time;
    dateSpan.textContent = `${dayOfWeek}, ${month} ${day}`;
    windP.textContent = `${wind} km/h`;
    humP.textContent = `${humidity} %`;
    visP.textContent = `${visibility} km`;

    content.appendChild(tempDesc);
    content.appendChild(humWinVis);
    content.appendChild(future);
    tempDesc.appendChild(tempInfo);
    tempDesc.appendChild(timeDate);
    tempInfo.appendChild(temp);

    tempInfo.appendChild(desc);
    temp.appendChild(tempSpan);
    timeDate.appendChild(cityName);
    timeDate.appendChild(timedateP);
    timedateP.appendChild(dateSpan);

    humWinVis.appendChild(windDiv);
    humWinVis.appendChild(humityDiv);
    humWinVis.appendChild(visiblityDiv);
    windDiv.appendChild(windP);
    windDiv.appendChild(windI);
    windDiv.appendChild(windPText);
    humityDiv.appendChild(humP);
    humityDiv.appendChild(humI);
    humityDiv.appendChild(humPText);
    visiblityDiv.appendChild(visP);
    visiblityDiv.appendChild(visI);
    visiblityDiv.appendChild(visPText);

    if (window.innerWidth < 1000) {
      tem_img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      tempInfo.appendChild(tem_img);
    }

    let i = 0;
    let t = 0;
    while (i < 5) {
      const dateString = weekly.list[t].dt_txt;
      const date = new Date(dateString);
      const dayOfWeek = date.toLocaleString("en-US", {
        weekday: "short",
      });
      const month = date.toLocaleString("en-US", {
        month: "short",
      });
      const day = date.getDate();

      const dayDiv = document.createElement("div");
      const dayTemp = document.createElement("p");
      const dayIcon = document.createElement("img");
      const dayDate = document.createElement("p");
      const dayTempSpan = document.createElement("span");

      dayIcon.id = `day${i}Icon`;
      dayTemp.id = `day${i}Temp`;
      dayDate.id = `day${i}Date`;

      dayIcon.src = `http://openweathermap.org/img/wn/${weekly.list[t].weather[0].icon}@2x.png`;
      dayTemp.textContent = `${Math.round(weekly.list[t].main.temp - 273.15)}`;
      dayDate.textContent = `${dayOfWeek}, ${month} ${day}`;
      dayTempSpan.textContent = "°";

      if (window.innerWidth < 1000) {
        if (i === 0) {
          const tomorrowDesc = document.createElement("p");
          const tomorrowDiv = document.createElement("div");
          tomorrowDesc.textContent = weekly.list[t].weather[0].description;
          tomorrow.textContent = "Tomorrow";
          tomorrowDesc.id = "tomorrowDesc";

          future.appendChild(dayDiv);
          dayDiv.appendChild(dayIcon);
          dayDiv.appendChild(tomorrowDiv);
          tomorrowDiv.appendChild(tomorrow);
          tomorrowDiv.appendChild(tomorrowDesc);
          dayDiv.appendChild(dayTemp);
          dayTemp.appendChild(dayTempSpan);
        } else {
          future.appendChild(dayDiv);
          dayDiv.appendChild(dayTemp);
          dayTemp.appendChild(dayTempSpan);
          dayDiv.appendChild(dayIcon);
          dayDiv.appendChild(dayDate);
        }
      } else {
        future.appendChild(dayDiv);
        dayDiv.appendChild(dayTemp);
        dayTemp.appendChild(dayTempSpan);
        dayDiv.appendChild(dayIcon);
        dayDiv.appendChild(dayDate);
      }

      t = t + 8;
      i++;
    }
  } else {
    const temp = document.getElementById("temp");
    const tempSpan = document.getElementById("temp-span");
    const desc = document.getElementById("desc");
    const windP = document.querySelector("#wind p");
    const humP = document.querySelector("#humity p");
    const visP = document.querySelector("#visiblity p");
    const timedateP = document.getElementById("timedateP");
    const dateSpan = document.getElementById("date-span");
    const cityName = document.getElementById("city_name");
    const tem_img = document.getElementById("tem_img");
    cityName.textContent = data.name;

    temp.textContent = Math.round(data.main.temp - 273.15);
    tempSpan.textContent = "°";
    desc.textContent = description;
    windP.textContent = `${wind} km/h`;
    humP.textContent = `${humidity} %`;
    visP.textContent = `${visibility} km`;
    if (window.innerWidth < 1000) {
      tem_img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

    temp.appendChild(tempSpan);
    console.log("Top: ", data);

    const utc_seconds = Math.floor(Date.now() / 1000);
    const local_time = new Date((utc_seconds + data.timezone) * 1000);
    const current_time = local_time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    const current_dayOfWeek = local_time.toLocaleString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });
    const current_month = local_time.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const current_day = local_time.toLocaleString("en-US", {
      day: "numeric",
      timeZone: "UTC",
    });
    timedateP.textContent = current_time;

    dateSpan.textContent = `${current_dayOfWeek}, ${current_month} ${current_day}`;
    timedateP.appendChild(dateSpan);

    let i = 0;
    let t = 0;
    while (i < 5) {
      const dayIcon = document.getElementById(`day${i}Icon`);
      const dayTemp = document.getElementById(`day${i}Temp`);
      const dayDate = document.getElementById(`day${i}Date`);
      if (window.innerWidth < 1000) {
        const tomorrowDesc = document.getElementById("tomorrowDesc");
      }

      const forecastTime = new Date((weekly.list[t].dt + data.timezone) * 1000);

      const week_dayOfWeek = forecastTime.toLocaleString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      });
      const week_month = forecastTime.toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
      });
      const week_day = forecastTime.getUTCDate();

      dayIcon.src = `http://openweathermap.org/img/wn/${weekly.list[t].weather[0].icon}@2x.png`;
      dayTemp.textContent = `${Math.round(weekly.list[t].main.temp - 273.15)}`;
      // dayDate.textContent = `${week_dayOfWeek}, ${week_month} ${week_day}`;
      t = t + 8;
      i++;
    }

    console.log("Else");
  }
}
