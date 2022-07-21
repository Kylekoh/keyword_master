const puppeteer = require('puppeteer');

(async function getAccessToken() { 
    const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();
    const naver_id = 'ko12ztwe';
    const naver_pw = 'rmflawk88!';
    await page.goto('https://searchad.naver.com/login?returnUrl=https:%2F%2Fmanage.searchad.naver.com&returnMethod=get');
    await page.type('#uid', naver_id, {delay: 100})
    await page.type('#upw', naver_pw, {delay: 100})
    await page.waitFor(1000);
    await page.click('.btn_login button');
    await page.waitForNavigation();
    
    await page.waitFor(5000);
    const cookies_got = await page.cookies()
    
    
    const localStorageData = await page.evaluate(() => {
        let json = {};
        for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        json[key] = localStorage.getItem(key);
        }
        return json;
    });
    
    const access_token_got = JSON.parse(localStorageData.tokens)['1295182']['bearer']
    console.log(access_token_got)
})()

