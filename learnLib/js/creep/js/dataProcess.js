const cheerio = require('cheerio') // 需熟练掌握
const jsdom = require('jsdom').JSDOM
const fs = require('fs')

const request = require('./myRequest')

function html2$(html) {
  let document = new jsdom(html).window.document
  return document.querySelectorAll.bind(document)
}

function indexParser(buffer){
  let focus = Array.from(html2$(buffer.toString())('.focus-inner'))
  let divs = Array.from(html2$(buffer.toString())('.floor-goods'))

  return divs.map(div => {
    let data = div.innerHTML
    data = data.replace(/&lt;/g, '<')
    data = data.replace(/&gt;/g, '>')
    data = data.replace(/textarea/, 'div')

    var lis = Array.from(html2$(data)('li'))
    return lis.map(li => {
      let oA = li.getElementsByClassName('mod-g-photo')[0]
      let sale = li.getElementsByClassName('mod-g-sales')[0]
      return {
        url: 'https:' + oA.href,
        img_src: 'https:' + oA.children[0].getAttribute('data-lazyload-src'),
        name: li.getElementsByClassName('mod-g-tit')[0].children[0].innerHTML,
        descrption: li.getElementsByClassName('mod-g-desc')[0].innerHTML,
        price: li.getElementsByClassName('mod-g-nprice')[0].innerHTML.match(/\d+(\.\d+)?/g)[0],
        sales: sale && sale.innerHTML ? sale.innerHTML.match(/\d+/g)[0] : 0
      }
    })
  })
}

(async function(){
  try {
    let { body, headers } = await request('https://shouji.tmall.com/')
    let res = indexParser(body)
    let result = []
    res.forEach(item => {
      result = result.concat(item)
    })
    result.sort((x, y) => {
      return parseInt(x.sales) - parseInt(y.sales)
    })
    console.log(result)
  } catch(e) {
    console.log('error:', e)
  }
})()

