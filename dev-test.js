const BlockChain = require('./geospatialblockchain/blockchain');
const Mapp=require('./geospatialblockchain/mapp');

const bc= new BlockChain();
const mapp= new Mapp('./gis_osm_buildings_a_free_1.shp');

for (let i=0; i<3; i++)
{
    console.log(bc.addBlock('jinxingster@gmail.com',48.8660,-71.3228,`McGill ${i}`).toString());

}