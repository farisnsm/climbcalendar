const puppeteer = require('puppeteer')
var moment = require('moment')

async function lhc(){
    let res1 = []
    let res2 = []
    let browser = await puppeteer.launch({headless: true});
    let page = await browser.newPage();
    await page.goto('https://widget.fitdegree.com/231/live-schedule?open_externally=false&today_only=false',{waitUntil:'networkidle2'})
    await page.waitForSelector('body > app-root > live-schedule-widget > fd-registrable-preview:nth-child(3)')
    let data = await page.evaluate((i)=>{
        return(document.querySelector('body > app-root > live-schedule-widget').innerHTML);
    })
    res1 = data.toString().split('</div></div>').join('</div>').split('class="date-header">')
    res1.shift()
    res1.forEach(function(R){

        R = R.split('dasharray: ')
        const date = moment(R[0].split('<')[0] + ' 2021','dddd, MMM D YYYY').format("DD MMM YYYY")
        const date2 = moment(R[0].split('<')[0] + ' 2021','dddd, MMM D YYYY').format("YYYYMMDD")
        R.shift()
        //console.table(R)
        R.forEach(function(r){
            if(r.split('c3="">')[1].split('</h1>')[0] === 'Gym entry'){
                let slots = ''
                if(r.split(";")[0].split(', ')[0]/100*40 % 1 === 0){
                    //console.log('x')
                    slots = 40-r.split(";")[0].split(', ')[0]/100*40
                } else{
                    slots = 42-Math.round(r.split(";")[0].split(', ')[0]/100*42)
                }
                //console.log(slots,r.split('c3="">')[1].split('</h1>')[0],r.split('class="date"><!----> ')[1].split(' ')[0])
                res2.push({gym:"LHC",date: date,time:r.split('class="date"><!----> ')[1].split(' ')[0],slots: slots,ts: date2 + moment(r.split('class="date"><!----> ')[1].split(' ')[0],'LT').format('HHmm')})
            }

        })
    })
    return(res2)

}

module.exports = lhc