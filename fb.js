const puppeteer = require('puppeteer')
var moment = require('moment')
let result = []

async function fb(){
    let res = []
    let browser = await puppeteer.launch({headless: true});
    let page = await browser.newPage();
    await page.goto('https://fitbloc.com/booking/',{waitUntil:'networkidle2'})

    await page.waitForSelector("#\\37 7427 > div.bw-widget__sessions.bw-widget__sessions--hide-empty-days > div:nth-child(1) > div[class='bw-session']")
    //console.log('x')
    let data = await page.evaluate(()=>{

        return(document.querySelector('#\\37 7427 > div.bw-widget__sessions.bw-widget__sessions--hide-empty-days').innerText);
    })
    data = data.split(', ')
    data.shift()
    data.forEach(function(data2){
        data2 = data2.split('\n')
        data2.forEach(function(data3,i){
            if(data3.indexOf(' open')!==-1 && data2[i-2].split(' (')[0]==="Gym Entry"){
                //console.log(data2[0],data2[i-2],data3)
                res.push({gym:"FB",date: moment(data2[0] + ' 2021','MMMM D 2021').format("DD MMM YYYY"),time:data2[i-2].split("(")[1].split(' ')[0],slots: Number(data3.split(' ')[0]),ts: moment(data2[0] + ' 2021','MMMM D 2021').format("YYYYMMDD") + moment(data2[i-2].split("(")[1].split(' ')[0],'LT').format('HHmm')})
            }
        })
    })

    await browser.close()
    return(res)
}

module.exports = fb
