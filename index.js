

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const puppeteer = require('puppeteer');
const { createCipheriv } = require('crypto');

request('https://www.biographyonline.net/people/100-most-influential.html', fn);

function fn(error, response, html) {

    if (error) {
        console.log(error);
    }
    else if (response.statusCode == 404) {
        console.log("Page not Found");
    }
    else {
        getName(html);
    }
}
let AllHeros = [];
function getName(html) {

    const $ = cheerio.load(html);
    let names = $('.post-content.clearfix ol li a');


    for (let i = 0; i < names.length; i++) {
        let data = $(names[i]).text().trim();
        AllHeros.push(data);
    }


}


(async function () {

    try {
        let browserOpen = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']

        })

        let pagesarr = await browserOpen.pages();
        cPage = pagesarr[0];
        await cPage.goto('https://en.wikipedia.org/wiki/Main_Page');


        let randomPerson = AllHeros[Math.floor(Math.random() * AllHeros.length)];
         


        await cPage.waitForSelector('input[placeholder="Search Wikipedia"]', { visible: true });
        await cPage.type('input[placeholder="Search Wikipedia"]', randomPerson);
        await cPage.keyboard.press('Enter');
        await cPage.waitForSelector('.searchresults.mw-searchresults-has-iw>p>b>a', { visible: true });
        await cPage.click('.searchresults.mw-searchresults-has-iw>p>b>a', { delay: 50 });
 
    }
    catch (error) {
        console.log(error);
    }

})()