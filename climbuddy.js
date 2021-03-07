var fb = require('./fb');
var bw = require('./bw');
var lhc = require('./lhc');
var bff = require('./bff');
var oyy = require('./oyy');
let result = []


async function main(){
    result = result.concat(await bw())
    result = result.concat(await lhc())
    result = result.concat(await bff())
    result = result.concat(await fb())
    result = result.concat(await oyy())
    result.sort((a, b) => (a.ts>b.ts) ? 1 : -1)

//console.log(arr);
    return(result)
}

module.exports = main