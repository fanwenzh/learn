const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const urlLib = require('url')
const assert = require('assert')

function requestUrl(url, headers) {
  let urlObj = urlLib.parse(url)
  let httpMode = null

  if(urlObj.protocol == 'http:') {
    httpMode = http
  } else if (urlObj.protocol == 'https:'){
    httpMode = https
  } else {
    throw Error(`无法识别协议 ${urlObj.protocol}`)
  }

  return new Promise((resolve, reject)=>{
    let req = httpMode.request({
      host: urlObj.host,
      path: urlObj.path,
      headers
    }, res => {
      if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode == 304) {
        let arr = []
        res.on('data', data => {
          arr.push(data)
        })
        res.on('end', () => {
          let buffer = Buffer.concat(arr)
          resolve({
            status: 200,
            body: buffer,
            headers: res.headers
          })
        })
      } else if(res.statusCode == 301 || res.statusCode==302){
        resolve({
          status: res.statusCode,
          body: null,
          headers: res.headers
        })
      } else {
        reject({
          status: res.statusCode,
          body: null,
          headers: res.headers
        })
      }
    })
    req.on('error', err=>{
      console.log('error:',err)
    })
    req.write('') // 发送post数据
    req.end() // 发送请求
  })
}

async function request (url, reqHeaders) {
  try {
    while(1) {
      var { status, body, headers } = await requestUrl(url, reqHeaders)
      if (status == 200) {
        let filename = urlLib.parse(url).hostname
        filename = filename.substring(0, filename.length-3) + 'html'
        let fileUrl = 'html/' + filename
        fs.writeFile(fileUrl, body, err => {
          if (err) {
          } else { console.log('Complete') }
        })
        return {body, headers}
      } else {
        console.log(headers.location)
        url = headers.location
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = request
