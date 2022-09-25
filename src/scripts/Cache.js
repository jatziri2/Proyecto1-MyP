export class Cache {
    constructor(){
      this.data = Array()
      this.resetTime = 300000
    }
    /**
     * Función para añadir elementos al cache, mediante la función <code>setTimeout</code> que es una promesa
     * pasados 5 minutos se borrara el dato que fue almacenado en el cache.
     * @param {*} element El elemento que se añadira al array que contiene toda la información en el cache. 
     */
    push(element){
      if (element == null || element == undefined) {
        throw 'No se pudó añadir el elemento'
      }

      var data = this.data
      data.push(element)
      setTimeout( function(){
        const index = data.indexOf(element)
        data.splice(index, 1)
      }, this.resetTime)
    }
  
    /**
     * Funcion para buscar mediante el URL el clima con tal URL dentro del cache.
     * @param {String} requestURL El URL del clima que deseamos obtener.
     * @returns El clima buscado, undefined si no existe tal clima.
     */
    searchByURL(requestURL){
      return this.data.find(item => item.URL == requestURL);
    }
}