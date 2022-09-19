/*
Clase para el manejo de una base de datos, util para implementar funciones donde 
sea necesario borrar o buscar cierta información.
*/
let DataBase = class {
  constructor(bdd){
    this.bdd = bdd;
  }
  /**
   * Funcion para buscar mediante el ID el objeto correspondiente al vuelo con ese ID.
   * @param {*} ID El numero de identificación del vuelo que deseamos obtener.
   * @returns El vuelo buscado, undefined en otro caso.
   */
  searchByID(ID){
    return this.bdd.find(item => Math.floor(ID) == item.No_Vuelo);
  }
}

/*
Clase cache implementada para el manejo del mismo, hacer que se borre cada cierto tiempo,
añadir o borar datos y cualquier funcion necesaria para trabajar con un cache.
*/
let Cache = class {
  constructor(){
    this.data = Array();
  }
  /**
   * Función para añadir elementos al cache, mediante la función <code>setTimeout</code> que es una promesa
   * pasados 5 minutos se borrara el dato que fue almacenado en el cache.
   * @param {*} element El elemento que se añadira al array que contiene toda la información en el cache. 
   */
  push(element){
    var data = this.data;
    data.push(element);
    setTimeout( function(){
      const index = data.indexOf(element);
      data.splice(index, 1);
    }, 300000)
  }
  /**
   * Funcion para buscar mediante la location el vuelo con tal location dentro del cache.
   * @param {*} location La location del vuelo que deseamos obtener.
   * @returns El vuelo buscado, undefined si no existe tal vuelo.
   */
  searchByLocation(location){
    return this.data.find(item => item.direccion == location);
  }
}

/*
Objeto para mostrar y menejar el clima. 
*/
let weather = {
    apikey: "KEY",
    cache: new Cache(),
    /**
     * Función para realizar la petición al api del clima.
     * @param {*} city Un string con el nombre de la ciudad, un array con las coordenadas
                       Un array con las coordenadas de la ciudad deseada.
                       El id del vuelo en la base de datos deseado.
     */
    fetchWeather: function(city) {
        var location; //String que contendra el url para la petición.
        //Revisamos el tipo del parametro para manejar la información segun este.
        if (typeof city == "object"){
            location = "https://api.openweathermap.org/data/2.5/weather?lat="
            + city[0] + "&lon=" + city[1] + "&units=metric&APPID="
            + this.apikey + "&lang=es";
        } else if (Math.floor(city) == city) {
          var destination = this.dataBase.searchByID(city);
          location = "https://api.openweathermap.org/data/2.5/weather?lat="
            + destination.destination_latitude + "&lon=" + destination.destination_longitude + "&units=metric&APPID="
            + this.apikey + "&lang=es";
        } else {  
            location = "https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=metric&APPID="
            + this.apikey + "&lang=es";
        } 
        
        //Se trata de buscar en el cache si la locación se encuentra ya consultada,
        //en caso de que no cuando tratemos de acceder al atributo del objeto nos soltara
        //error y se realizara la petición de forma normal.
        try {
          var temp = this.cache.searchByLocation(location); 
          this.displayWeather(temp.weather);
        } catch (error) {
          fetch(
            location  
            ).then(function(response) {
                //Si la petición no fue correcta cambiamos las instrucciones para que se vuelva a intentar
                //y tiramos un error.
                if (!response.ok) {
                  document.querySelector("div.Instrucciones").innerText =
                  "Clima no encontrado, vuelva a intentarlo:    ";
                  throw new Error("Clima no encontrado.");
                }
                //Si se realiza de forma correcta nos aseguramos que las instrucciones
                //sigan siendo las correctas, y regresamos el onjeto deseado.
                document.querySelector("div.Instrucciones").innerText =
                  "Introduzca el numero o el destino de su ticket:";
                return response.json();
              }).then((data) => {
                //Fimalmente llamamos a la función para que muestre el clima y añadimos la consulta al cache.
                this.displayWeather(data)
                this.cache.push({direccion: location, weather: data});
              });
        }
          
    },
    /**
     * Función para mostrar el clima modificando el hmtml.
     * @param {*} data El objeto con el clima que se desea mostrar.
     */
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        document.querySelector(".Ciudad").innerText = "Clima de " + name;
        document.querySelector(".Descripcion").innerText = description;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".Temperatura").innerText = temp + "°C";

    },
    /**
     * Función para leer lo que se encuentra en la barra de buqueda y 
     * realizar la petición con esa información.
     */
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

//Listener para la barra de busqueda que detecta cuando se presiona el buscar para
//realizar la petición deseada.
document.querySelector(".search button").addEventListener("click", () => weather.search());

//Listener para la barra de busqueda que cuando se presiona enter en el teclado 
//realiza la busqueda deseada.
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

/**
 * Función que cuando se esta cargando la ventana lee la base de datos para que sea asignada
 * como atributo a nuestro objeto weather y pide la ubicación para cambiar el clima a la locación actual.
 */  
window.onload = function() {
  $.ajax({
    type: "GET",  

    url: "../resources/data/datasetModificado.csv",
    dataType: "text",       
    success: function(response)  
    {
      weather.dataBase = new DataBase($.csv.toObjects(response));  
    }   
  });

  navigator.geolocation.getCurrentPosition((localization) => {
    weather.fetchWeather([localization.coords.latitude, localization.coords.longitude]);    
    }, (msnErr) => console.log(msnErr));
  };

