import { Cache } from "./Cache.js";
import { DataBase } from "./DataBase.js";

export class Weather {

    constructor(apiKey) {
        this.apikey = apiKey
        this.cache = new Cache()        
        this.dataBase = new DataBase()
    }

    /**
     * Setter para el parametro api que a su vez comprueba que la api sea correcta para las peticiones.
     * Para comprobar que sea correcto se hace una petición de prueba si es aceptada la nueva key fue correcta
     * si no se vuelve a la anterior.
     * @param {string} api el api de nuestro clima.
     */
     async setApiKey(apiKey) {
        if (typeof apiKey != 'string') {
            throw 'La api no es un string'
        }
        var lastKey = this.apikey
        this.apikey = apiKey;
        await this.fetchWeather(this.getRequestURL("mexico")).catch((error) => this.apikey = lastKey)
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
     * 
     * @returns el apiKey del objeto
     */
    getApiKey(){
        return this.apikey
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
            location = 'q=' + city.toUpperCase()
        } 
        return "https://api.openweathermap.org/data/2.5/weather?" + 
                location + "&units=metric&APPID=" + this.apikey + "&lang=es";
    }
    
    /**
     * Función que dado un URL realiza la petición al api de OpenWeatherMap y 
     * una vez es devuelta, añadé el json con el clima al cache y devuelve la promesa.
     * @param {string} requestURL EL URL con el que se hará la petición.
     * @returns La promesa que contiene la respuesta de la peticion.
     */
    async fetchWeather(requestURL) {        
          var temp = this.cache.searchByURL(requestURL); 
          if (temp != undefined) {
            return temp.weather
          }
          return await fetch(
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