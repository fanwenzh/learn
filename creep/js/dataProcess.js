const cheerio = require('cheerio') // 需熟练掌握
const jsdom = require('jsdom').JSDOM
const fs = require('fs')

const request = require('./myRequest')

function html2$(html) {
  let document = new jsdom(html).window.document
  return document.querySelectorAll.bind(document)
}

fs.readFile('./html/shouji.tmall.html', (err, buffer)=>{
  let divs = Array.from(html2$(buffer.toString())('.mui-zebra-module'))
  // let divs = Array.from(cheerio.load(buffer)('.mui-zebra-module'))
  divs = divs.slice(1, divs.length - 1)
  // console.log(html2$(divs[0].firstElementChild.firstElementChild.children[2])("li"))


})
