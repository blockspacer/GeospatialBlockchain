const shp = require('shpjs');
const shapefile=require('shapefile');

class Mapp
{
    constructor(shpfile){

        shapefile.open(shpfile).then(source => source.read()
            .then(function log(result) {
            if (result.done) return;
            console.log(result.value);
            return source.read().then(log);
            }))
        .catch(error => console.error(error.stack));

        this.minLat=0;
        this.minLong=0;
        this.maxLat=0;
        this.maxLong=0;
    }


    static setMap(shapefile)
    {

    }

    getminLat()
    {
        return this.minLat;
    }

    getmaxLat()
    {
        return this.maxLat;
    }

    getminLong()
    {
        return this.minLong;
    }
    getmaxLong () 
    {
        return this.maxLong;
    }
}

module.exports = Mapp;