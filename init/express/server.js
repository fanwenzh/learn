const express = require('express')
const log4js = require('log4js')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const ejs = require('ejs')
const hbs = require('hbs')

const fs = require('fs')
const path = require('path')

const r1 = require('./routes/r1')
const config = require('./config')
const db = require('./libs/db')

// 设置静态资源路径
express.static('public', {})
const app = express()

// 绑定database
app.use(function(req, res, next){
  req.db = db
  next()
})

// log4js设置
log4js.configure({
  appenders: {
    debug: {type: 'console'},
    access: {
      type: 'dateFile', //文件输出
      filename: 'log/app.log',
      pattern: "-yyyy-MM-dd",
      backups: 7,
      category: 'access'
    }
  },
  categories: {default: {appenders: ['access'], level:'debug'}}
})
app.use(log4js.connectLogger(log4js.getLogger('access')))

// 划分路由
app.use('/', r1)
// 设置图片
// app.use(favicon(path.join(path.resolve('public'), 'favicon.png')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends: false}))
app.use(cookieParser())

// 设置模板引擎
app.engine('.html', ejs.__express)
app.set('views', path.resolve('./template'))
app.set('view engine', 'html')
app.use(express.static(path.resolve('public')))

// hbs模板，最近2016更新, 慎用
// 设置hbs模板
// var hbs = require('hbs');
// var blocks = {};
// hbs.registerHelper('extend', function (name, context) {
//   var block = blocks[name]
//   if (!block) {
//     block = blocks[name] = []
//   }
//   block.push(context.fn(this))
// })
// // 被覆盖元素{{{block "name"}}}
// hbs.registerHelper('block', function (name) {
//   var val = (blocks[name] || []).join('\n')
//   // 清空block
//   blocks[name] = []
//   return val
// })
// hbs.registerHelper("inc", function (value, options) {
//   return parseInt(value) + 1;
// });
// app.set('view engine', 'html')
// hbs.registerPartials(__dirname + '/views/partials')
// app.engine('html', hbs.__express)


if (!module.parent) {
  app.listen(config.port, function() {
    console.log(`server listen on port ${config.port}`)
  }) 
}