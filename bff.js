const puppeteer = require('puppeteer')
var moment = require('moment')
let result = []

async function bff(){
    let res1 = []
    let browser = await puppeteer.launch({ignoreDefaultArgs: ['--disable-extensions']});
    let page = await browser.newPage();
    await page.goto('https://app.acuityscheduling.com/schedule.php?owner=19322912&owner=19322912&appointmentType=13677944#',{waitUntil:'networkidle2'})
    var week = Math.ceil(moment().format("D") / 7) + 3
    var day  = moment().add(-1,"days").day()+1
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
    for (i=1;i<=7;i++){
        //console.log(week)
        //console.log(moment().add(i-1,"days").format("YYYY-MM-DD"))
        if(dates.indexOf(moment().add(i-1,"days").format("YYYY-MM-DD"))!==-1){
            //console.log('x')
            await page.click('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div.choose-date > table.calendar > tbody > tr:nth-child('+week+') > td:nth-child('+day+')')
            //console.log('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div.choose-date > table.calendar > tbody > tr:nth-child('+week+') > td:nth-child('+day+')')
            await page.waitForSelector('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div.choose-time-container > div.choose-time > div > label[data-qa="select_appt"]')
            let data = await page.evaluate(()=>{
                return document.querySelector('#step-pick-appointment > div.pane.pick-appointment-pane > div.choose-date-time > div.choose-time-container > div.choose-time > div').innerText
            })
            //console.log(moment().add(i,"days").format("DD MMM YYYY"))
            data = data.toString().split("\n\n")
            data.pop()
            data.forEach(function(R){
                result.push({gym:"BFF",date: moment().add(i,"days").format("DD MMM YYYY"),time:R.split("\n")[0],slots: Number(R.split("\n")[1].split(' ')[0]),ts: moment().add(i,"days").format("YYYYMMDD") + moment(R.split("\n")[0],'LT').format('HHmm')})
            })
            //console.log(result)
        }


        day++
        if(day>=8){
            week++
            day=1
        }
    }
    await browser.close()
    return result
}

module.exports = bff