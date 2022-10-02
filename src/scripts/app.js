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
    document.querySelector("img[id=img-dest]").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".Temperatura").innerText = temp + "°C";
  })
  }

/**
  *  Función para mostrar el clima correspondiende al recuadro de origen modificando el hmtml.
  * @param {Promise} data Una promesa que contine como respuesta el objeto con el clima que se desea mostrar.
  *
*/
function displayWeatherOrigin(data) {
  data.then(response => {
    const {name} = response;
    const {icon, description} = response.weather[0];
    const {temp} = response.main;
    document.querySelector(".Ciudad_origen").innerText = "Clima de " + name;
    document.querySelector(".Descripcion_origen").innerText = description;
    document.querySelector("img[id=img-Origen]").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".Temperatura_origen").innerText = temp + "°C";
  })
  }


/**
  * Función para leer el string que se encuentra en la barra de busqueda y 
  * realizar la petición del clima con esa información.
  * @param {string} stringToSearch El string que contiene el string con el que se hará la petición.
  * @returns La promesa que contiene el clima dada la información en la barra de busqueda.
*/
function search(stringToSearch) {
  return weather.fetchWeather(weather.getRequestURL(stringToSearch))
}

/**
 * Función que dado un string como clave corrobora que sea correcto, y cambia el texto para que sea aprobado
 * así como dar el clima de la ubicación actual.
 * @param {string} apiKey La llave con la que se harán las peticiones.
 */
async function startAPIKey(apiKey){
  await weather.setApiKey(apiKey)
  if (weather.getApiKey() != apiKey) {
    document.querySelector(".Estado_key").innerText = "Key invalida ❌"
    document.querySelector(".Estado_key").style.display = "flex"
    return 
  }
  navigator.geolocation.getCurrentPosition((localization) => {
    var currentWeather = weather.fetchWeather(
      weather.getRequestURL([localization.coords.latitude, localization.coords.longitude])
    );
    displayWeatherOrigin(currentWeather)    
  }, (msnErr) => console.log(msnErr));
  document.querySelector(".Estado_key").innerText = "KEY Aprobada ✔️, puede buscar el clima."
  document.querySelector(".Lugar_origen").style.display = "flex"
  document.querySelector(".Clima_origen").style.display = "block"
  document.querySelector(".Estado_key").style.display = "flex"
  document.querySelector(".API_Key").style.display = "none"
  document.querySelector(".Key").style.display = "none"
  document.querySelector(".Instrucciones").style.display = "flex"
  document.querySelector(".search").style.display = "flex"
  document.querySelector(".Clima").style.display = "block"
}

/**
  * Función que al cargar la ventana inicializa un objecto Weather, le asigna al objecto la base de datos
  * con la que se trabajará haciendo una petición con ajax, finalmente con geoLocation se accede (si es permitido)
  * a la ubicación actual y se muestra en pantalla.
*/  
window.onload = function() {
  weather = new Weather("")

  $.ajax({
    type: "GET",  

    url: "../resources/data/dataset1.csv",
    dataType: "text",       
    success: function(response)  
    {
      weather.dataBase = new DataBase($.csv.toObjects(response));  
    }   
  });

  document.querySelector("button[id=weather-button]").addEventListener("click", function(){
    displayWeather(search(document.querySelector("input[id=weather-bar]").value))
  })
  
  document.querySelector("input[id=weather-bar]").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        displayWeather(search(document.querySelector("input[id=weather-bar]").value));
      }
    });
  
  document.querySelector("button[id=api-button]").addEventListener("click", function(){
    startAPIKey(document.querySelector("input[id=api-bar]").value)
  })
  
  document.querySelector("input[id=api-bar]").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        startAPIKey(document.querySelector("input[id=api-bar]").value)
      }
    });

};


