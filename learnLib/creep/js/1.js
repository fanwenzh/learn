const fs = require('fs')
const jsdom = require('jsdom').JSDOM
const cheerio = require('cheerio')

fs.readFile('html/test.html', (err, data)=> {
  // data = data.toString().replace(/\\t|\\n/g, '')
  // console.log(data)
  // var d = (new jsdom(data)).window.document
  // var lis = d.querySelectorAll('div')
  var $ = cheerio.load(data.toString())
  let lis = $('.f1')
  $ = cheerio.load(lis[0].children[0].data)
  lis  = $('li')
  console.log(lis.length, lis[0])
})