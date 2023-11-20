const puppeteer = require('puppeteer');
function chaange(feeling){
    _keyboard(feeling)
}

async function takeScreenshot(feeling) {
    // key mappings for feelings
    let key_mappings={
        "happy":104,
        "sad":115,
        "cry":99,
        "neutral":1,
        "astonished":111
    }

    // Launch a new browser
    const browser = await puppeteer.launch({
        headless: 'new',
    });

    // Create a new page
    const page = await browser.newPage();
    let hello = await page.goto('http://localhost:3000/nemo/nemo.html',{waitUntil:'networkidle2'});
    let feeling_num = key_mappings[feeling];

    try{
        await page.evaluate((feeling_num) => {
            // Your JavaScript code goes here
            console.log('Changing feeling now');
            _keyboard(feeling_num);
        },feeling_num);
        let filename = 'nemo_feels_' + feeling + '.png';
        const screenshotBase64 = await page.screenshot({
            encoding: 'base64',
        });
        return btoa(screenshotBase64);
    }catch(err){
        console.log("error",err);
        return "error";
    }

    browser.close();
}

async function test(){
    let result  = await takeScreenshot("happy");
    console.log(result);
}

// test();
module.exports = {takeScreenshot};