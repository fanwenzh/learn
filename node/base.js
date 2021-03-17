// 1、global: 浏览器端为window
// console
console.log()
console.dir()
console.error(new Error('错误'))
console.time()
console.timeEnd()
console.trace();

// cluster： 多进程管理
// 1.普通程序不能“创建”进程，只有系统进程才能创建进程；只有主进程能分裂
// 2.进程是分裂出来
// 3.分裂出来的两个进程执行的是同一套代码
// *4.父子进程之间可以共享资源（包括端口）
const cluster = require('cluster')
const os = require('os')
const process = require('process')
if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length(); i++) {
        cluster.fork() // （只有）主进程派生一个进程 // 4
    }
    console.log('主进程')
} else {
    // 派生进程程序
    let server = http.createServer((req, res)=>{
        console.log(process.pid)
        res.write('aaa')
        res.end()
    })
    server.listen(8080)
}
// process
process.cwd() // 返回当前工作目录
process.chdir('/private/temp') // 切换当前目录
process.env //返回用户环境信息
process.execPath //执行的绝对路径
var argv = process.argv; // 获取输入
var argvs = argv.slice(2);
// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function() { console.log('nextTick callback!'); });
process.on('exit', function() {})

// buffer
new Buffer(data)
arr.push(data)
Buffer.index() // String 或 Buffer
Buffer.slice(s, e) // [s, ..., e-1], substring(s, n)
Buffer.slice(s) // (s, e-1)
var c = Buffer.concat(arr)
buf.toString()
Buffer.prototype.split= Buffer.prototype.split || function(b) {
    let arr = []
    let cur = 0
    let n = 0
    while((n = this.indexOf(b, cur))!=-1) {
        arr.push(this.slice(cur, n))
        cur = n + b.length 
    }
    arr.push(this.slice(cur))
    return arr
}

// fs
const fs = require('fs') // 当读取二进制文件(非.txt)，返回一个Buffer对象
const file1 = fs.readFile('sample.txt', 'utf-8', function(err, data) {
    // data 为二进制，解析为utf8
    var text = data.toString('utf-8');
    // var buf = new Buffer(text, 'utf-8');
})
const file2 = fs.readFileSync(url2, 'utf8')
fs.writeFile('output.txt', data, function(err) {})
fs.writeFileSync('output.txt', data)
fs.stat('sample.txt', function(err, stat) { // 获取文件信息
    if (stat.isFile()) {
        console.log('size:' + stat.size);
        console.log('birth time: ' + stat.birthtime);
        console.log('modified time: ' + stat.mtime.getTime()); // .atime, ctime(create), mtime(modify) 
    }
})

// stream
// 所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable
process.stdin.readline();
process.stdin.on('data', (inputStream) => {}) // process.stdout()
var rs = fs.createReadStream('sample.txt', 'utf-8');
rs.on('data', function(chunk) {})
rs.on('end', function() {})
rs.on('error', function(err) {})
var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n'); // 直接写txt流
ws1.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8')); // 通过Buffer 写入
ws1.end();
ws.on('finish', function(){})
// pipe 管道
var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');
rs.pipe(ws);
// readable.pipe(writable, { end: false }); // end事件触发后不自动关闭writable流

// http
var http = require('http');
var server = http.createServer(function(req, res) {
    console.log(request.method + ':' + request.url);
    response.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end('<h1>hello world</h1>');
})
server.listen(8000, ip, function(err) {
    console.log('Server is running at http://127.0.0.1:8080/');
})

// const path = require('path')
path.parse(str)
path.dirname(路径名)
path.pathname(文件名)
path.extname(文件类型)
path.reolve('./a.txt') // 将相对路径解析为绝对路径

// const querystring = require('querystring') // ?
let obj = querystring.parse(str)
// const url = require('url)
// https://nodejs.org/dist/latest-v8.x/docs/api/url.html
const myUrl = url.parse(someUrl)
.href, host, pathname, query, hash

// const Event = rquire('events').EventEmiter
let ev = new Event()
ev.on('msg', function(arg){})
ev.emit('msg', myArg)

// const dns = require('dns')
dns.resolve('google.com', (err, res)=>{})


// multer 上传multipart/form-data文件: body-parser接收普通post数据
// https://github.com/expressjs/multer
const body = require('body-parser')
const expressStatic = require('express-static-cache')
const multer = require('multer')
let server = express()
server.user(body.urlencoded({extended: false}))
let multerObj = new multer({dest: './upload'})
server.use(multerObj.any()) // single()
server.use(express.static('./www/')) // 设置静态目录
//处理请求, server.use(url, (req,res)=>{}) // 处理所有方法的请求
// AJAX添加onprocess后上传文件浏览器会发送两个请求OPTIONS（测试）和POST方法, 在node中用use即可 
server.post('/api', (req, res, next)=>{
  // 浏览器限制 req.header['origin'] == null // 本地调试
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send({'msg': "OK"});
//   res.sendFile(文件绝对路径) // path.resolve()
  res.sendStatus(404) // writeHeader, write, end
  res.redirect(url) // .setHeader('location', url), .write(401), .end()
  console.log(req.body);      //普通POST数据
  console.log(req.files);     //文件POST数据
  next(); // 下一匹配
});
server.listen(8080)
// router
let rooter1 = express.Router()
router1.get('/:id/comment', (req, res, next)=>{next()})
server.use('url', router1)
// /article/123  => req.params // 方便路由, 利于SEO
// /article?id=234&cb=2 => req.query // 灵活

// log4js日志记录
var express = require('express'),
    app = express(),
    log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'console' }, // 控制台输出
        app: {
            type: 'dateFile', //文件输出 // console, file, dateFile
            filename: 'logs/app.log',
            pattern: "-yyyy-MM-dd",
            backups: 7, // 当文件内容超过文件存储空间时, 备份文件数量
            // compess: true, // 是否以压缩的形式保存
            encoding: 'utf-8',
            category: 'access' // log4js Name
        }
    },
    categories: {
        default: {
            appenders: ['out', 'app'], // appenders
            level: 'debug'
        }
    }
})
let logger = log4js.getLogger('access')
app.use(log4js.connectLogger(logger))

// bodyParser 请求体解析
var bodyParser = require('body-parser')
app.use(bodyParser.json());
// 解析request的body中的urlencoded字符，true为扩展模式数据
app.use(bodyParser.urlencoded({ extended: false })); 
req.body // 解析的内容

// assert=require('assert');
assert(arguments.length==2, '必须传2个参数');

// const crypto = require('crypto')
const secret = "test"
const hash = crypto.createHmac('sha256', secret).update('test').digest('hex')
const 还是 = crypto.createHash('md5').update('something').digest('hex')

// uuid = require('uuid/v4')
var str = uuid().replace(/\-/g, '')

// var zlib = require('zlib')
const zlib = require('zlib')
let gz = zlib.createGzip();
let rs = fs.createReadStream('file.js')
let rs = fs.createWriteStream('file.js.gz')
rs.pipe(gz).pipe(ws)
ws.on('finish', ()=>{console.log('完成')})
// 下载zip文件需要设置头content-encoding
let rs=fs.createReadStream(`www${req.url}`)
res.setHeader('content-encoding', 'gzip')
let gz = zlib.createGzip()
rs.pip(gz).pipe(res)
rs.on('error', err=>{res.end()})

// mysql
// 1.增   INSERT
//   INSERT INTO 表 (字段列表) VALUES(值列表)
//   INSERT INTO user_table (ID, name, gender, chinese, math, english) VALUES(0, 'blue', '男', 35, 18, 29);
// 2.删   DELETE
//   DELETE FROM 表 WHERE 条件
//   DELETE FROM user_table WHERE ID=3;
// 3.改   UPDATE
//   UPDATE 表 SET 字段=值, 字段2=值2, ... WHERE 条件
//   UPDATE user_table SET chinese=100 WHERE ID=2;
// 4.查   SELECT
//   SELECT 字段列表 FROM 表 WHERE 条件
//   SELECT name, gender FROM user_table WHERE ID=2;
let db = mysql.creatConnection({host, port, user, password, database})
db = mysql.createPool({})
db,query('sqlString', (err, data)=>{})

// 客户端浏览器
document.cookie='a=1&b=2'
// 服务端cookie：cookie-parser
const cookieParser = require('cookie-parser');
server.use(cookieParser('myServerKey')); // cookie生成, 传入key签名防篡改
console.log(req.cookies)                    // 接收普通{key, value}
console.log(req.signedCooikes)              // 接收签名的{key, value}
res.cookie('newCookieKey', val, { signed: true }) // 向客户端返回cookie,{dom, path, expire}
// cookie-session: 不能跨域
const cookieSession = require('cookie-session')
server.use(cookieSession({
    // 密钥添加方式选其1
    keys: ['key1', 'key2'], // 循环密钥
    secret: 'sessionKey' // 1个密钥
}))
server.getConnections('/a', (req, res)=> {
    if(!req.session['count']) { // 添加count属性
        req.session.count = 1
    } else {
        req.session.count++
    }
    res.send(`第${req.session.count}次访问`)
    res.end()
})

// CMD规范
exports.attr = 12 // or
module.exports = {attr1: 1, attr2: 2}
let mod = require('./url') // 个人模块
// node 模块（有读取顺序）：node_modules
let mod2 = require('url')
// webpack
import some from 'url'
