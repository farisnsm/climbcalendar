const puppeteer = require('puppeteer')
var moment = require('moment')


async function bff(){
    let result = []
    let res1 = []
    const browser = await puppeteer.launch({headless:true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    let page = await browser.newPage();
    await page.goto('https://app.acuityscheduling.com/schedule.php?owner=19322912&owner=19322912&appointmentType=13677944#',{waitUntil:'networkidle2'})
    var week = Math.ceil(moment().format("D") / 7) + 2
    var day  = moment().add(-1,"days").day()+1
    if (day !== 0){
        week++
    }
    //console.log(week)
    //console.log(day)
    let dates = []
    let activedays = await page.evaluate(()=>{
        return (document.querySelector('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div.choose-date > table.calendar').innerHTML)
    })
    activedays=activedays.split('activeday" day="')
    activedays.shift()
    activedays.forEach(function(a){
        dates.push(a.split('"')[0])
    })
    //console.log(dates)

    for (i=1;i<=8;i++){
            //console.log(week)
            //console.log(moment().add(i-1,"days").format("YYYY-MM-DD"))
            if(dates.indexOf(moment().add(i-1,"days").format("YYYY-MM-DD"))!==-1){
                //console.log('x')
                await page.waitForTimeout(500)
                await page.click('#addons-prompt')
                await page.waitForTimeout(500)

                await page.click('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div[class="choose-date"] > table[class="calendar"] > tbody > tr:nth-child('+week+') > td:nth-child('+day+')')
                //console.log('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div.choose-date > table.calendar > tbody > tr:nth-child('+week+') > td:nth-child('+day+')')
                await page.waitForTimeout(1000)
                await page.waitForSelector('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div.choose-time-container > div.choose-time > div > label[data-qa="select_appt"]')
                let data = await page.evaluate(()=>{
                    return document.querySelector('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div.choose-time-container > div.choose-time > div').innerText
                })
                //console.log(moment().add(i,"days").format("DD MMM YYYY"))
                data = data.toString().split("\n\n")
                data.pop()
                data.forEach(function(R){
                    //console.log(R)
                    result.push({gym:"BFF",date: moment().add(i-1,"days").format("DD MMM YYYY"),time:moment(R.split("\n")[0],'LT').format('LT'),slots: Number(R.split("\n")[1].split(' ')[0]),ts: moment().add(i-1,"days").format("YYYYMMDD") + moment(R.split("\n")[0],'LT').format('HHmm')})
                })
                //console.log(result)
            }


            day++
            if(day>=8){
                week++
                day=1
            }
        }


    //console.table(result)
    await browser.close()
    return result
}
//bff()
module.exports = bff
