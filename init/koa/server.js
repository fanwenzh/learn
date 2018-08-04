const koa = require('koa')
const convert = require('koa-convert')
const staticCache = require('koa-static-cache')
const bodyPaser = require('koa-better-body')
const router = require('koa-router')
const session = require('koa-session')
const Mysql = require('mysql-pro')
const ejs = require('koa-ejs')
const path = require('path')

const errorHandler = require('./libs/error_handler')
const db = require('./libs/db')
const logger =  require('./libs/log')
const config = require('./config')

const server = new koa()
server.listen(config.port)

errorHandler(server)
logger(server)

// 链接数据库
server.use(async function(ctx, next){
  ctx.db = db
  await next()
})

// koa-better-body设置上传路径
server.use(convert(bodyParser({
  uploadDir: config.uploadDir
})))

// koa-static-cache
server.use(staticCache(config.wwwDir))

// session
server.key = config.secret_key
server.use(session({}, server))

// ejs
ejs(server, {
  root: path.resolve('template'),
  layout: false,
  viewExt: '.ejs.html',
  cache: false,
  debug: false
})

let mainRouter = new router()
mainRouter.use('/', require('./routers/r1'))
server.use(mainRouter.routes())