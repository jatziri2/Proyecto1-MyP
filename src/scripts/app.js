var bdd;
    $.ajax({
      type: "GET",  
      url: "../resources/data/datasetModificado.csv",
      dataType: "text",       
      success: function(response)  
      {
        bdd = $.csv.toObjects(response);  
      }   
    });


let weather = {
    apikey: "",
    cache: {},
    fetchWeather: function(city) {
        var location;
        if (typeof city == "object"){
            location = "https://api.openweathermap.org/data/2.5/weather?lat="
            + city[0] + "&lon=" + city[1] + "&units=metric&APPID="
            + this.apikey + "&lang=es";
        } else if (Math.floor(city) == city) {
          var vueloDestino = bdd.find(item => Math.floor(city) == item.No_Vuelo); 
          location = "https://api.openweathermap.org/data/2.5/weather?lat="
            + vueloDestino.destination_latitude + "&lon=" + vueloDestino.destination_longitude + "&units=metric&APPID="
            + this.apikey + "&lang=es";
        } else {  
            location = "https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=metric&APPID="
            + this.apikey + "&lang=es";
        } 

        fetch(
            location  
            ).then(function(response) {
                if (!response.ok) {
                  document.querySelector("div.Instrucciones").innerText =
                  "Clima no encontrado, vuelva a intentarlo:    ";
                  throw new Error("Clima no encontrado.");
                }
                document.querySelector("div.Instrucciones").innerText =
                  "Introduzca el numero o el destino de su ticket:";
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
        document.querySelector(".Temperatura").innerText = temp + "°C";

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

