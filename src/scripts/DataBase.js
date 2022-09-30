export class DataBase {
  
  constructor(bdd){
    this.bdd = bdd;
  }

  /**
   * Funcion para buscar mediante la clave del destino el objeto correspondiente al vuelo deseado.
   * @param {string} dest La clave del aeropuerto donde se llegará.
   * @returns El vuelo buscado, undefined en otro caso.
   */
  searchByDest(dest){
    if (typeof dest != 'string') {
      return undefined
    }
    return this.bdd.find(item => dest == item.destination);
  }

}



     