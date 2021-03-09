const puppeteer = require('puppeteer')
var moment = require('moment')

async function oyy(){
    let Result = []
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    let page = await browser.newPage();

    await page.goto('https://www.picktime.com/oyy',{waitUntil:'networkidle2'})
    //wait for close
    await page.waitForSelector('div[id="wrapper"] > div[class="modal fade in"] > div[class="modal-dialog modal-lg"] > div[class="modal-content"] > div[class="modal-header clearfix"] > button[type="button"]')
    //click close
    await page.click('div[id="wrapper"] > div[class="modal fade in"] > div[class="modal-dialog modal-lg"] > div[class="modal-content"] > div[class="modal-header clearfix"] > button[type="button"]')

    //wait for weekday
    await page.waitForSelector('#booking-content > div.booking-body-cont.unselectable > div.booking-body.clearfix > div > ul')
    //click weekday
    await page.click('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"] > li:nth-child(1)');
    await page.waitForTimeout(500)
    await page.click('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"] > li:nth-child(1)');

    await page.waitForSelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list class-list"]')
    //click weekday
    await page.click('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"]');
    await page.waitForTimeout(500)
    await page.click('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"]');

    await page.waitForSelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list sessions-list"]')
    let data1 = await page.evaluate(()=>{
        return document.querySelector('div[id="wrapper"] > div[id="booking-content"] > div[class="booking-body-cont unselectable"] > div[class="booking-body clearfix"] > div[class="booking-list-box"] > ul[class="booking-list sessions-list"]').innerText
    })

    let res1 = data1.toString().split("\n").join("").split("\t\t").join("xxx").split("\t").join("").split('xxx')
    //console.table(res1)
    res1.forEach(function(R){
        if(R.split("Singapore (")[1].split('/')[0]!=='0'){
            Result.push({gym:"OYY",date: moment(R.split(", ")[0],"Do MMM YYYY").format("DD MMM YYYY"),time:moment(R.split(" ")[3] + R.split(" ")[4],'LT').format('LT'),slots: Number(R.split("Singapore (")[1].split('/')[0]),ts:moment(R.split(", ")[0],"Do MMM YYYY").format("YYYYMMDD") + moment(R.split(" ")[3] + R.split(" ")[4],'LT').format('HHmm')})
        }
    })


    await browser.close()
    return(Result)
    //console.table(Result)
    //console.table(res)
}

module.exports = oyy