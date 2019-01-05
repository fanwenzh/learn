const fs = require('fs')
const jsdom = require('jsdom').JSDOM

fs.readFile('html/1.html', (err, buffer)=> {

  let dom = (new jsdom(buffer.toString())).window.document.querySelector('div').innerText
  console.log(dom)
})