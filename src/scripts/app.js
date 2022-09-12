

let weather = {
    apikey: "",
   
    fetchWeather: function(city) {
        var location;
        if(typeof city == "string"){
            location = "https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=metric&APPID="
            + this.apikey;
        } else if (typeof city == "object"){
            location = "https://api.openweathermap.org/data/2.5/weather?lat="
            + city[0] + "&lon=" + city[1] + "&units=metric&APPID="
            + this.apikey;
        }
        
        fetch(
            location  
            ).then(function(response) {
                if (!response.ok) {
                  document.querySelector("div.Instrucciones").innerText =
                  "Clima no encontrado, vuelva a intentarlo:    ";
                  throw new Error("Clima no encontrado.");
                }
                return response.json();
              }).then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".Ciudad").innerText = "Clima de " + name;
        document.querySelector(".Descripcion").innerText = description;
        document.querySelector(".Temperatura").innerText = temp + "C";

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", () => weather.search());
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

window.onload = function() {
  navigator.geolocation.getCurrentPosition((localizacion) => {
    weather.fetchWeather([localizacion.coords.latitude, localizacion.coords.longitude]);    
    }, (msnErr) => console.log(msnErr));
  };

