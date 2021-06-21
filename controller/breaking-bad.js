const puppeteer = require("puppeteer");

const webCrawler = async (login, password) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // SEE BELOW WARNING!!!
  });
  const page = await browser.newPage();
  await page.goto('http://legendas.tv/')
  
  await page.waitForSelector('.middle #help-box-close') 
  await page.click('.middle #help-box-close')
  
  await page.waitFor(500)
  await page.click('.container > header > .clearfix > .login > .js_entrar')

  await page.waitForSelector('header > .clearfix > .login > #UserIndexForm > input:nth-child(3)')
  await page.type('header > .clearfix > .login > #UserIndexForm > input:nth-child(3)', login)
  
  await page.waitForSelector('header > .clearfix > .login > #UserIndexForm > input:nth-child(4)')
  await page.type('header > .clearfix > .login > #UserIndexForm > input:nth-child(4)', password)
  
  await page.waitForSelector('.clearfix > .login > #UserIndexForm > .clearfix > input')
  await page.click('.clearfix > .login > #UserIndexForm > .clearfix > input')
  
  await page.waitFor(1000)
  
  await page.waitForSelector('.middle #likebox-close')
  await page.click('.middle #likebox-close')

  await page.waitForSelector('.container #search-box')
  await page.type('.container #search-box', 'breaking bad')
  
  await page.waitFor(500)
  await page.click('.container > header > .clearfix > #BuscaIndexForm > .icon_zoom')
  
  await page.waitFor(1000)
  
  await page.waitForSelector('article:nth-child(1) > div:nth-child(1) > .f_left > p:nth-child(1) > a')
  await page.click('article:nth-child(1) > div:nth-child(1) > .f_left > p:nth-child(1) > a')
  
  await page.waitFor(1000)
  await page.waitFor(500)

  const entity = {
    nome: await page.$eval('body > .container > .middle > .first > h3', el => el.innerText),
    downloads: await page.$eval('.middle > section > aside > p > .number', el => el.innerText),
    likes: await page.$eval('.container > .middle > section > aside:nth-child(4) > p:nth-child(1)', el => el.innerText),
    unLikes: await page.$eval('.container > .middle > section > aside > p:nth-child(2)', el => el.innerText),
    sender: await page.$eval('section > aside > p > .nume > a', el => el.innerText),
    date: await page.$eval('.middle > section > aside > p > .date', el => el.innerText),
    language: await page.$eval('.container > .middle > section > h1 > img', el => el.alt),
    downloadLink: `http://legendas.tv/downloadarquivo/${(await page.url()).split('/')[4]}`,
  }

  await browser.close()

  return entity
};

module.exports = { webCrawler };
