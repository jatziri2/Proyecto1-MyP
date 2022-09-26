import { Weather } from "../scripts/Weather.js";

const weather = new Weather('Mi key')

const objectURLTest = [36.20, 138.25]

var URLTest =  weather.getRequestURL('mexico')
console.log(URLTest)

var URLTest2 = weather.getRequestURL(objectURLTest)
console.log(URLTest2)

//weather.fetchWeather(URLTest).then(response => console.log(response))

weather.fetchWeather(URLTest2).then(response => console.log(response))

//weather.fetchWeather('').then(response => console.log(response))
