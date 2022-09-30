import { DataBase } from "../scripts/DataBase.js"

class objTest {
    constructor(destination){
        this.destination = destination
    }
}


function main() {
    const bdd = Array()
    for (let i = 0; i < 100; i++) {
        bdd.push(new objTest(i.toString()))
    }
    const mssgSearch = 'El metodo no funciona como debe'
    const bddObj = new DataBase(bdd)
    console.assert(JSON.stringify(bddObj.searchByDest('15')) == JSON.stringify(new objTest('15')), {mssgSearch})
    console.assert(bddObj.searchByDest()    == undefined, {mssgSearch})
    console.assert(bddObj.searchByDest([1]) == undefined, {mssgSearch}) 
    
}

main()