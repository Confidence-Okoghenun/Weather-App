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

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                let obj = JSON.parse(xmlhttp.responseText);
                // console.table(obj);
                if(obj.name === "Shuzenji") success(position);
                else {
                  weatherDiv.innerHTML = `<p> ${obj.name}, ${obj.sys.country} <br> ${obj.main.temp}&deg;C <br> ${obj.weather[0].main}`;
                }
             }
        }
    };
    xmlhttp.send(null);
    
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}