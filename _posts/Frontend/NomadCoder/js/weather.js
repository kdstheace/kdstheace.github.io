const API_KEY = "499a04608d995294da3bc65a2358a4cf";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(`${lat},${lon}`);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&unit=metric`;
  fetch(url)
    .then((rsp) => rsp.json())
    .then((data) => {
      const weatherSpan = document.querySelector("#weather span:first-child");
      const citySpan = document.querySelector("#weather span:last-child");
      citySpan.innerText = data.name;
      weatherSpan.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoError() {
  alert("You fucked up");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
