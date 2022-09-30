import { Cache } from "./Cache.js";
import { DataBase } from "./DataBase.js";

export class Weather {

    constructor(apiKey) {
        this.apikey = apiKey
        this.cache = new Cache()        
        this.dataBase = new DataBase()
    }

    /**
     * Función que asigna el objecto que es dado como parametro al atributo dataBase.
     */
    setDataBase(dataBase) {
        if (typeof dataBase != 'DataBase') {
            throw 'No es una base de datos'
        }
        this.dataBase = dataBase
    }

    /**
     * Función que dado un array con coordenadas o un string devuelve el link 
     * para hacer la petición del clima deseado.
     * @param {*} city 
     * @returns EL URL para hacer la petición.
     */
    getRequestURL(city){
        var location;
        
        if (typeof city == 'object') {
            location = "lat=" + city[0] + "&lon=" + city[1]  
        } else if (typeof city == 'string' && city.length == 3) {
            var destination = this.dataBase.searchByDest(city.toUpperCase())
                location = "lat=" + destination.destination_latitude + 
                           "&lon=" + destination.destination_longitude
        } else {
            location = 'q=' + city
        } 
          
        return "https://api.openweathermap.org/data/2.5/weather?" + 
                location + "&units=metric&APPID=" + this.apikey + "&lang=es";
    }
    
    /**
     * Función que dado un URL realiza la petición al api de OpenWeatherMap y 
     * una vez es devuelta, añadé el json con el clima al cache y devuelve la promesa.
     * @param {String} requestURL EL URL con el que se hará la petición.
     * @returns La promesa que contiene la respuesta de la peticion.
     */
    fetchWeather(requestURL) {        
          var temp = this.cache.searchByURL(requestURL); 
          if (temp != undefined) {
            return temp.data
          }
          return fetch(
            requestURL
            ).then(function(response) {
                if (!response.ok) {
                  throw new Error("Clima no encontrado.");
                }
                return response.json();
              }).then((data) => {
                this.cache.push({URL: requestURL, weather: data});
                return data
                });       
    }
}