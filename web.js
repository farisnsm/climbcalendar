var fb = require('./fb');
var bw = require('./bw');
var lhc = require('./lhc');
var bff = require('./bff');
var oyy = require('./oyy');
var moment = require('moment')
var express = require('express')
var app = express()
var cors = require('cors')
let result = []
let port=process.env.PORT || 3000
app.use(cors())

async function main(){
    let used = process.memoryUsage();
    for (let key in used) {
        console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
    let temp = []
    console.log(moment().format("DD MMM YYYY HH:mm A"))

    try{
        //console.log('Querying BW')
        temp = temp.concat(await bw())
        //console.log('BW completed')
    } catch (error) {
        //console.log(error)
    }

    try{
        //console.log('Querying OYY')
        temp = temp.concat(await oyy())
        //console.log('OYY completed')
    } catch (error) {
        //console.log(error)
    }

    try{
        //console.log('Querying FB')
        temp = temp.concat(await fb())
        //console.log('FB completed')
    } catch (error) {
        //console.log(error)
    }

    try{
        //console.log('Querying LHC')
        temp = temp.concat(await lhc())
        //console.log('LHC completed')
    } catch (error) {
        //console.log(error)
    }

    try{
        //console.log('Querying BFF')
        temp = temp.concat(await bff())
        //console.log('BFF completed')
    } catch (error) {
        //console.log(error)
    }


    temp.sort((a, b) => (a.ts>b.ts) ? 1 : -1)
    result = []
    result=temp
    main()
//console.log(arr);
}
main()

app.get('/api',(req,res)=>{
    res.send(result)
})

app.get('/main',(req,res)=>{
    var list = ''
    var table = '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<style>\n' +
        '    table, th, td {\n' +
        '        border: 1px solid black;\n' +
        '        border-collapse: collapse;\n' +
        '        text-align: center;\n' +
        '    }\n' +
        '</style>\n' +
        '<table style="width:100%">\n' +
        '    <tr>\n' +
        '        <th>GYM</th>\n' +
        '        <th>Date</th>\n' +
        '        <th>Start Time</th>\n' +
        '        <th>Slots</th>\n' +
        '    </tr>\n' + 'xxx' +
        '</table>'
    result.forEach(function(R){
        list = list + '<tr>\n' +
            '        <td>'+R.gym+'</td>\n' +
            '        <td>'+R.date+'</td>\n' +
            '        <td>'+R.time+'</td>\n' +
            '        <td>'+R.slots+'</td>\n' +
            '    </tr>'
    })
    res.send(table.split('xxx').join(list))
})

app.listen(port,()=>{
    console.log('Host up')
})


