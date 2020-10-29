// 

const logger = require('./logger').withPrefix('[process-address]');

logger.log("========================================================================")

const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const address = require('./AllData.json');

let list = address.map(it=>{
    return {
        name: it.CityName,
        area: it.AreaList.map(a=>{
            return {
                name: a.AreaName
            }
        })
    };
})

const fs = require('fs');

fs.writeFile('./dist/address.json', JSON.stringify(list), ()=>{});

// let ziplist = address.reduce((res,it)=>{

//     let city = it.CityName;

//     return it.AreaList.reduce((r,it)=>{
//         let zip = it.ZipCode;
//         if(zip) {
//             r[zip] = city + it.AreaName;
//         }
//         return r;
//     }, res);

// },{})

// fs.writeFile('./dist/address.zipcode.json', JSON.stringify(ziplist), ()=>{});

logger.log("done. ====================================================================")