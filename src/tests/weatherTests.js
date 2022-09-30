import { Weather } from "../scripts/Weather.js";

function main() {
    const weather = new Weather('Mi key')
    const errMssg = "La función no se comportá correctamente"
    const objectURLTest = [36.20, 138.25]
    
    var proofURL = "https://api.openweathermap.org/data/2.5/weather?q=mexico&units=metric&APPID=Mi key&lang=es"
    var URLTest  =  weather.getRequestURL('mexico')
    console.assert(proofURL = URLTest, errMssg)

    var proofURL2 = "https://api.openweathermap.org/data/2.5/weather?lat=36.2&lon=138.25&units=metric&APPID=Mi key&lang=es"
    var URLTest2  = weather.getRequestURL(objectURLTest)
    console.assert(proofURL2 = URLTest2, errMssg)

    //weather.fetchWeather(URLTest).then(response => console.log(response))
    //weather.fetchWeather(URLTest2).then(response => console.log(response))
    //weather.fetchWeather('').then(response => console.log(response))
}

main()