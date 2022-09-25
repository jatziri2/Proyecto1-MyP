import { DataBase } from "./DataBase.js";
import { Weather } from "./Weather.js";

var weather;

/**
  *  Función para mostrar el clima modificando el hmtml.
  * @param {Promise} data Una promesa que contine como respuesta el objeto con el clima que se desea mostrar.
  *
*/
function displayWeather(data) {
  data.then(response => {
    const {name} = response;
    const {icon, description} = response.weather[0];
    const {temp} = response.main;
    document.querySelector(".Ciudad").innerText = "Clima de " + name;
    document.querySelector(".Descripcion").innerText = description;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".Temperatura").innerText = temp + "°C";
  })
  }

/**
  * Función para leer el string que se encuentra en la barra de busqueda y 
  * realizar la petición del clima con esa información.
  * @returns La promesa que contiene el clima dada la información en la barra de busqueda.
*/
function search() {
  return weather.fetchWeather(weather.getRequestURL(document.querySelector(".search-bar").value))
}


document.querySelector(".search button").addEventListener("click", () => displayWeather(search()))

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      displayWeather(search());
    }
  });

/**
  * Función que al cargar la ventana inicializa un objecto Weather, le asigna al objecto la base de datos
  * con la que se trabajará haciendo una petición con ajax, finalmente con geoLocation se accede (si es permitido)
  * a la ubicación actual y se muestra en pantalla.
*/  
window.onload = function() {
  weather = new Weather('2ac2c143ed22599cebf3614a4b94cc5c')

  $.ajax({
    type: "GET",  

    url: "../resources/data/dataset1.csv",
    dataType: "text",       
    success: function(response)  
    {
      weather.dataBase = new DataBase($.csv.toObjects(response));  
    }   
  });

  navigator.geolocation.getCurrentPosition((localization) => {
      var currentWeather = weather.fetchWeather(
        weather.getRequestURL([localization.coords.latitude, localization.coords.longitude])
      );
      displayWeather(currentWeather)    
    }, (msnErr) => console.log(msnErr));
  };

