const koa = require('koa')
const convert = require('koa-convert')
const staticCache = require('koa-static-cache')
const bodyParser = require('koa-better-body') // koa-multer
const Router = require('koa-router')
const session = require('koa-session')
const ejs = require('koa-ejs')
const path = require('path')
const cors = require('koa-cors') // 或设置跨域头

const errorHandler = require('./libs/error_handler')
const db = require('./libs/db')
const logger =  require('./libs/log')
const config = require('./config')

const server = new koa()
server.listen(config.port, () => {
  console.log('server listen at port 8081')
})

// errorHandler(server)
// logger(server)
server.use(cors())

// 链接数据库
server.use(async function(ctx, next){
  ctx.db = db
  await next()
})

server.use(async (ctx, next) => {
  // ctx.cookies.get('key') // 自带cookie解析
  // console.log(path.resolve('./template'))
  // ctx.request.headers
  await next()
})

// koa-better-body设置上传路径, 自动拦截存储
server.use(convert(bodyParser({
  uploadDir: config.uploadDir
})))

// koa-static-cache: 设置静态文件目录
// server.use(staticCache(config.wwwDir))

// session
server.key = config.secret_key
server.use(session({}, server))

ejs(server, {
  root: path.resolve('template'),
  layout: false,
  viewExt: 'ejs.html',
  cache: false,
  debug: false
})

let mainRouter = new Router()
mainRouter.use('/', require('./routers/r1'))
server.use(mainRouter.routes())