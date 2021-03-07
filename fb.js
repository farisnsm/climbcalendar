const puppeteer = require('puppeteer')
var moment = require('moment')
let result = []

async function fb(){
    let res = []
    let browser = await puppeteer.launch({headless: true,ignoreDefaultArgs: ['--disable-extensions']});
    let page = await browser.newPage();
    await page.goto('https://fitbloc.com/booking/',{waitUntil:'networkidle2'})

    await page.waitForSelector('div[id="mk-boxed-layout"] > div[id="mk-theme-container"] > div[id="theme-page"] > div[class="mk-main-wrapper-holder"] > div[id="mk-page-id-7896"] > div[class="theme-content no-padding"] > div[class="mk-page-section-wrapper"] > div[id="schedule"] > div[class="page-section-content vc_row-fluid mk-grid "] > div[class="mk-padding-wrapper wpb_row"] > div[class="vc_col-sm-12 wpb_column column_container  jupiter-donut- _ jupiter-donut-height-full"] >  div[class="wpb_raw_code wpb_content_element wpb_raw_html"] > div[class="wpb_wrapper"] > healcode-widget[data-type="schedules"] > div[id="bw-widget__schedules-77427"] > div[id="77427"] > div[class="bw-widget__sessions bw-widget__sessions--hide-empty-days"] > div[class="bw-widget__day"]')

    let data = await page.evaluate(()=>{
        return(document.querySelector('div[id="mk-boxed-layout"] > div[id="mk-theme-container"] > div[id="theme-page"] > div[class="mk-main-wrapper-holder"] > div[id="mk-page-id-7896"] > div[class="theme-content no-padding"] > div[class="mk-page-section-wrapper"] > div[id="schedule"] > div[class="page-section-content vc_row-fluid mk-grid "] > div[class="mk-padding-wrapper wpb_row"] > div[class="vc_col-sm-12 wpb_column column_container  jupiter-donut- _ jupiter-donut-height-full"] >  div[class="wpb_raw_code wpb_content_element wpb_raw_html"] > div[class="wpb_wrapper"] > healcode-widget[data-type="schedules"] > div[id="bw-widget__schedules-77427"] > div[id="77427"] > div[class="bw-widget__sessions bw-widget__sessions--hide-empty-days"] > div[class="bw-widget__day"]').innerText);
    })
    //console.log(data)
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
    //console.log(res)
    await browser.close()
    return(res)
}
//fb()
module.exports = fb
