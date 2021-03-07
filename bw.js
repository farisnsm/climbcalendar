const puppeteer = require('puppeteer')
var moment = require('moment')

async function bw(){
    let Result = []
    let browser = await puppeteer.launch({ignoreDefaultArgs: ['--disable-extensions']});
    let page = await browser.newPage();

    await page.goto('https://www.picktime.com/566fe29b-2e46-4a73-ad85-c16bfc64b34b',{waitUntil:'networkidle2'})
    //wait for close
    await page.waitForSelector('div[id="wrapper"] > div[class="modal fade in"] > div[class="modal-dialog modal-lg"] > div[class="modal-content"] > div[class="modal-header clearfix"] > button[type="button"]')
    //click close
    await page.click('div[id="wrapper"] > div[class="modal fade in"] > div[class="modal-dialog modal-lg"] > div[class="modal-content"] > div[class="modal-header clearfix"] > button[type="button"]')

    //wait for weekday
    await page.waitForSelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"]')
    //click weekday
    await page.click('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"] > li:nth-child(1)');
    await page.waitFor(500)
    await page.click('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"] > li:nth-child(1)');

    await page.waitForSelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list sessions-list"]')
    let data1 = await page.evaluate(()=>{
        return document.querySelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list sessions-list"]').innerText
    })

    let res1 = data1.toString().split("\n").join("").split("\t\t").join("xxx").split("\t").join("").split('xxx')
    res1.forEach(function(R){
        if(R.split("Asia/Singapore (")[1].split(" ")[0].split('/')[0]!=='0'){
            Result.push({gym:"BW",date: moment(R.split(", ")[0],"Do MMM YYYY").format("DD MMM YYYY"),time:R.split(" ")[3] + R.split(" ")[4],slots: Number(R.split("Asia/Singapore (")[1].split(" ")[0].split('/')[0]),ts:moment(R.split(", ")[0],"Do MMM YYYY").format("YYYYMMDD") + moment(R.split(" ")[3] + R.split(" ")[4],'LT').format('HHmm')})
        }
    })

    await page.goto('https://www.picktime.com/566fe29b-2e46-4a73-ad85-c16bfc64b34b',{waitUntil:'networkidle2'})
    //wait for close
    await page.waitForSelector('div[id="wrapper"] > div[class="modal fade in"] > div[class="modal-dialog modal-lg"] > div[class="modal-content"] > div[class="modal-header clearfix"] > button[type="button"]')
    //click close
    await page.click('div[id="wrapper"] > div[class="modal fade in"] > div[class="modal-dialog modal-lg"] > div[class="modal-content"] > div[class="modal-header clearfix"] > button[type="button"]')

    //wait for weekend
    await page.waitForSelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"]')
    //click weekday
    await page.click('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"] > li:nth-child(2)');
    await page.waitFor(500)
    await page.click('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"] > li:nth-child(2)');

    await page.waitForSelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list sessions-list"]')
    let data2 = await page.evaluate(()=>{
        return document.querySelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list sessions-list"]').innerText
    })

    let res2 = data2.toString().split("\n").join("").split("\t\t").join("xxx").split("\t").join("").split('xxx')
    res2.forEach(function(R){
        if(R.split("Asia/Singapore (")[1].split(" ")[0].split('/')[0]!=='0'){
            Result.push({gym:"BW",date: moment(R.split(", ")[0],"Do MMM YYYY").format("DD MMM YYYY"),time:R.split(" ")[3] + R.split(" ")[4],slots: Number(R.split("Asia/Singapore (")[1].split(" ")[0].split('/')[0]),ts:moment(R.split(", ")[0],"Do MMM YYYY").format("YYYYMMDD") + moment(R.split(" ")[3] + R.split(" ")[4],'LT').format('HHmm')})
        }
    })
    //console.table(Result)

    await browser.close()
    return Result
    //console.table(res)
}

module.exports = bw