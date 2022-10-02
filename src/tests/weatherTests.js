import { Weather } from "../scripts/Weather.js";

async function delay(time) {
    return await new Promise(resolve => setTimeout(resolve, time));
  }


//Para correr las pruebas reemplace todos los "Mi key" por la key deseada, de otra forma soltará errores en los asserts y en todo. 
function main() {
    const weather = new Weather("Key")
    const errMssg = "La función no se comportá correctamente"
    const objectURLTest = [36.20, 138.25]
    
    weather.setApiKey("")
    console.assert("" == weather.getApiKey(), errMssg)


    weather.setApiKey("Mi key")
    console.assert("Mi key" == weather.getApiKey(), errMssg)

    var proofURL = "https://api.openweathermap.org/data/2.5/weather?q=MEXICO&units=metric&APPID=Mi key&lang=es"
    var URLTest  =  weather.getRequestURL("mexico")
    console.assert(proofURL == URLTest, errMssg)

    var proofURL2 = "https://api.openweathermap.org/data/2.5/weather?lat=36.2&lon=138.25&units=metric&APPID=Mi key&lang=es"
    var URLTest2  = weather.getRequestURL(objectURLTest)
    console.assert(proofURL2 == URLTest2, errMssg)

    delay(3000).then(() => weather.fetchWeather(URLTest).then(response => console.log(response)))
    delay(3000).then(() => weather.fetchWeather(URLTest2).then(response => console.log(response)))
    //delay(3000).then(() => weather.fetchWeather('').then(response => console.log(response)))
}

main()