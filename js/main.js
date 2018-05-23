let degreesInCelsius;
let degreesInFahrenheit;

function geoFindMe() {
  let output = document.getElementById("out");
  let weatherDiv = document.querySelector("#weather");
  
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    output.innerHTML = "";
    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
          let obj = JSON.parse(xmlhttp.responseText);
          if(obj.name === "Shuzenji") success(position);
          else {
            weatherDiv.innerHTML = `<p> ${obj.name}, ${obj.sys.country} <br> <span id="degrees" onclick="changeDegrees()">${obj.main.temp}&deg;C</span> <br> ${obj.weather[0].main}`;
            degreesInCelsius = obj.main.temp;
            if(obj.weather[0].main.toLowerCase() === "sun-shower") {
              document.querySelector("#sunny").setAttribute("class", "icon hydrated");
              document.querySelector("#rainy").setAttribute("class", "icon hydrated");
            } else if(obj.weather[0].main.toLowerCase() === "thunderstorm") {
              document.querySelector("#thunderstorm").setAttribute("class", "icon hydrated");
            } else if(obj.weather[0].main.toLowerCase() === "clouds") {
              document.querySelector("#cloudy").setAttribute("class", "icon hydrated");
            } else if(obj.weather[0].main.toLowerCase() === "snow") {
              document.querySelector("#snow").setAttribute("class", "icon hydrated");
            } else if(obj.weather[0].main.toLowerCase() === "clear") {
              document.querySelector("#sunny").setAttribute("class", "icon hydrated");
            } else if(obj.weather[0].main.toLowerCase() === "rain") {
              document.querySelector("#rainy").setAttribute("class", "icon hydrated");
            }
          }
       }
        }
    };
    xmlhttp.send(null);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location. Please grant location access";
  }

  output.innerHTML = "<p>Setting things up…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
}

geoFindMe();

function changeDegrees () {
 let degrees = document.querySelector("#degrees").textContent;
 
 if(degrees[degrees.length-1] === "C") {
   degreesInFahrenheit = degreesInCelsius * 1.8 + 32;
   document.querySelector("#degrees").innerHTML = `${degreesInFahrenheit} &deg;F`;
 } else {
   document.querySelector("#degrees").innerHTML = `${degreesInCelsius} &deg;C`;
 }
}