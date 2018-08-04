const koa = require('koa')
const router = require('koa-router')
const staticCache = require('koa-static-cache')
const betterBody = require('koa-better-body') // 解析请求
const convert = require('koa-convert') // 中间件1到3过度插件
const session = require('koa-session')
const path = require('path')

let server = new koa()
server.listen(8080)

// template
const Pug = require('koa-pug');
// let pug = new Pug({
//   viewPath: pathlib.resolve('./template'), // 模板路径
//   // pretty: false,
//   app: server // pug.use(server)
// });
// server.use(async ctx => {
//   await ctx.render('templateName', { a: 12 });
// });
const ejs = require('koa-ejs');
// ejs(server, {
//   root: pathlib.resolve('../template'), // 模板路径
//   layout: false, // 添加文件夹路径
//   viewExt: 'ejs' // 扩展名
// });
// server.use(async ctx => {
//   await ctx.render('1', {
//     name: 'hi',
//     age: 18
//   });
// });

// const mysql = require('koa-mysql') // 应用generator，仅适配koa1, 改用mysql-pro
// const db = mysql.createPool({host: 'localhost', port: 3309, user:'hi', password:'hi', database:'test'})
// server.use(async ctx => {
//   // koa-mysql为yield版本, 则需要改*function(){}
//   let data = await convert(db.query)(`SELECT * FROM user_table`);
//   ctx.response.body = data;
// });
const Mysql = require('msql-pro')
let mysql = new Mysql({
  mysql:{
    host: 'localhost',
    port: 3309,
    user: 'name',
    password: 'hi',
    database: 'basename'
  }
})
let r1 = router()
server.use(r1.routes())
r1.get('/user', async ctx=>{
  // await db.query('sql').then()
  await client.startTransaction();
  // INSERT INTO topic_table VALUES(1,'v1'),(2,'v2'),(3,'v3') // 同时插入多条数据
  let data = await db.executeTransaction('SELECT * FRO user_table WHERE ID=? AND age=?', [id, 18]);
  await client.stopTransaction();
  ctx.response.body = data
})


// session
// const key = require('./.keys') // 保存为.keys文件，通过exports到处
server.keys=['123','sdfs']
server.use(session({}, server));

server.use(convert(betterBody({
  uploadDir: path.resolve('./upload'), // 上传文件夹
  // keepExtensions: true // 保留扩展名
})))
// const static = require('koa-static')
// server.use(path.resolve('url'), {gzip: true}) // 源码并没有实现gzip压缩
server.use(staticCache(path.resolve('www'))) // 压缩文件中的文本数据，如nginx服务器

let r1 = router();
server.use(r1.routes()); // 全依赖router
r1.get('/aaa', async (ctx, next) => {
  //ctx.req         原生req对象
  //ctx.request     封装req对象

  //ctx.res
  //ctx.response

  // ctx.request.query // get
  // ctx.params // 路由参数

  // console.log(ctx.cookies.get('a')); // cookie获取和设置方式不同
  // ctx.cookies.set('b', 5, {
  //   maxAge: 86400 * 1000,
  //   expires: // Date对象
  // });
  ctx.session['key'] = 1

  console.log(ctx.request.headers);
  ctx.request.fields // post的dataform表单：数据+文件信息
  ctx.request.files  // post的file：文件信息(全)

  ctx.response.status = 403
  //ctx.response.set('a', 12);
  //ctx.response.body={a: 12, b: 55};

});

