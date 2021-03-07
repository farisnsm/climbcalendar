var fb = require('./fb');
var bw = require('./bw');
var lhc = require('./lhc');
var bff = require('./bff');
var oyy = require('./oyy');
var moment = require('moment')
var express = require('express')
var app = express()
let result = []
let port=process.env.PORT || 3000

async function main(){
    let temp = []
    console.log(moment().format("DD MMM YYYY HH:mm A"))
    temp = temp.concat(await bw())
    temp = temp.concat(await lhc())
    temp = temp.concat(await bff())
    temp = temp.concat(await fb())
    temp = temp.concat(await oyy())
    temp.sort((a, b) => (a.ts>b.ts) ? 1 : -1)
    result=temp
//console.log(arr);
}
main()
setInterval(main, 60000);

app.get('/',(req,res)=>{
    res.send(result)
})

app.listen(port,()=>{
    console.log('Host up')
})


