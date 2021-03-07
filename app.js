var main = require ('./climbuddy')

async function x(){
    let x = await main()
    console.table(x)
}

x()