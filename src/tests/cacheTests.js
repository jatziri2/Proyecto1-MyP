import { Cache } from "../scripts/Cache.js";

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

function main(){
  const cache = new Cache();
  cache.resetTime = 3000
  const mssgPush = 'El metodo no añade como debe'
  const testWeather = {URL: 'www.hola' , weather: {temperature: 31.5}}

  cache.push(1)
  console.assert(JSON.stringify(cache.data) == JSON.stringify([1]), {mssgPush})
  cache.push(testWeather)
  console.assert(JSON.stringify(cache.data) == JSON.stringify([1, testWeather]), {mssgPush})
  
  try {
    cache.push()
  } catch (error) {
    console.assert(JSON.stringify(cache.data) == JSON.stringify([1, testWeather]), {mssgPush})  
  }
  delay(3000).then(() => console.assert(JSON.stringify(cache.data) == JSON.stringify([]), {mssgPush})) 

  const mssgSearch = 'El metodo no devuelve el objecto buscado'
  const cacheSearch = new Cache()
  cacheSearch.resetTime = 2000
  cacheSearch.push(testWeather)
  console.assert(JSON.stringify(cacheSearch.searchByURL('www.hola')) == JSON.stringify(testWeather), {mssgSearch})
  console.assert(cacheSearch.searchByURL() == undefined, {mssgSearch})
  console.assert(cacheSearch.searchByURL([1]) == undefined, {mssgSearch}) 
}

main()

