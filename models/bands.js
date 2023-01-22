const Band = require("./band");



class Bands{
    //Se crea el arreglo de bandas
    constructor(){
        this.bands=[];
    }
    //SE agrega una nueva banda
    addBand(band=new Band()){
        this.bands.push(band);
    }
    //se optiene las bandas
    getBands(){
        return this.bands;
    }
    // Se elimina la banda
    deleteBand(id=''){
        this.bands=this.bands.filter(band => band.id !== id);
        return this.bands;
    }
    // El voto de la banda
    voteBand(id=''){
        this.bands = this.bands.map( band=> {
            if(band.id==id){
                band.votes++;
                return band;
            }
            return band;
        } )
    }
}

module.exports = Bands;