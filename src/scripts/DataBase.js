export class DataBase {

  constructor(bdd){
    this.bdd = bdd;
  }

  /**
   * Funcion para buscar mediante la clave del destino el objeto correspondiente al vuelo deseado.
   * @param {String} dest La clave del aeropuerto donde se llegará.
   * @returns El vuelo buscado, undefined en otro caso.
   */
  searchByDest(dest){
    return this.bdd.find(item => dest == item.destination);
  }

}



     