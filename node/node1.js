// v10.13.0
// assert
const assert = require('assert')
assert.strictEqual(1, 2) // assert.notStrictEqual()
assert.deepEqual([1,2], [1,[2,3]])
assert.deepStrictEqual({ a: 1 }, { a: '1' })
assert.fail('messsage')

// async_hooks // ? 异步处理
const async_hooks = require('async_hooks')
const eid = async_hooks.executionAsyncId()
const asyncHook = async_hooks.createHook({init, before, after, destroy, promiseResolve})
asyncHook.enable()
asyncHook.disable()
function init (asyncId, type, triggerAsyncId, resource) { }
function before (asyncId) { }
function after (asyncId) { }
function destroy (asyncId) { }
function promiseResolve (asyncId) { }

// Uint8Array : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
new Uint8Array()
new Uint8Array(length);
new Uint8Array(typedArray);
new Uint8Array(object);
new Uint8Array(buffer[, byteOffset[, length]]);
// Buffer // 二进制: 1个字节
const buf1 = Buffer.alloc(10, 1) // 默认填充0
const buf2 = Buffer.allocUnsafe(10) // 含未重写数据
const buf3 = Buffer.from([1,2,3]) 

const buf = Buffer.from('hello world', 'ascii'); // utf8 
console.log(buf.toString('hex')); // 输出 68656c6c6f20776f726c64
console.log(buf.toString('base64')); // 输出 aGVsbG8gd29ybGQ=
// 截取部分
const arr = new Uint16Array(20);
const buf = Buffer.from(arr.buffer, 0, 16);
// buf.values(), buf.keys(), buf.entries()
buf.length
Buffer.compare(a, b)
Buffer.concat(list)
buf1.copy(buf2, targetStart, sourceStart, sourceEnd)
buf1.equals(buf2)
buf.fill(value, offset, end, encoding)
buf.includes(value, byteOffset, encoding)
buf.indexOf(value, byteOffset, encoding)
buf.lastIndexOf(value, byteOffset, encoding)
buf.slice(start, end) // 不复制
const json = JSON.stringify(buf); // {"type":"Buffer","data":[1,2,3,4,5]}
buf.toString(encoding, start, end)

// child_process
const child_process = require('child_process')
child_process.spawn() // 产生异步进程
child_process.spawnSync()
child_process.exec() //衍生一个 shell 并在 shell 上运行命令
child_process.execFile(file, args, options, callback)
child_process.fork() //衍生一个新的 Node.js 进程
// promise版本
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function lsExample () {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}
lsExample();

// cluster 多核进程
const cluster = require('cluster');
const worker = cluster.fork(); // 创建进程 // child_process.fork()
cluster.isMaster
cluster.worker
cluster.workers

// console 控制台
console.log()
// crypto 加密
const crypto = require('crypto');
const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
  .update('I love cupcakes')
  .digest('hex');

// dgram (数据报: UDP socket)
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
server.on('error', (err) => {
  console.log(`服务器异常：\n${err.stack}`);
  server.close();
});
server.on('message', (msg, rinfo) => {
  console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
});
server.on('listening', () => {
  const address = server.address();
  console.log(`服务器监听 ${address.address}:${address.port}`);
});
server.bind(41234);
socket.bind({
  address: 'localhost',
  port: 8000,
  exclusive: true
});
// 服务器监听 0.0.0.0:41234

// Error
new Error(msg)
crror.message
error.stack // string

// events
conts EventEmitter = require('events')
const e = new EventEmitter()
e.on('event', (msg)=> {
  console.log(msg)
})
e.emit('event', 'a')
e.addListener(eventName, ()=>{})
e.eventNames()
e.removeListener('event', callback1)
// 异步：setImmediate() 或 process.nextTick()

// fs
fs.open('/open/some/file.txt', 'r', (err, fd) => { // fd: 文件描述
  fs.fstat(fd, (err, stat) => { // 通过文件描述读取
    console.log('stat', stat) // 文件详细描述
  })
  fs.close(fd, (err) => {}) // close
})
fs.unlink(url, (err) => {}) // 删除文件
fs.readFile('./test.json', 'utf-8', (err, data) => { // data: 二进制文件
  data.toString() // 设置输出编码, utf-8
})
fs.writeFile('./file', data, {'flag': 'a'},(err) => {}) // a: 没有创建, w: 写
// 读取文件
var buffer = new Buffer(255);
fs.read(fd, buffer, 0, 10, 0, function (err, bytesRead, buffer) {})
fs.write(fd, buffer, offset, length, position, function (err, bytesWritten, buffer) {})
fs.mkdir('./newdir', (err) => {}) // fs.rmdir()
fs.readdir(url, (err, files) => {})
fs.access(path, mode, (err) => {})
fs.appendFile(path, data, options, (err) => {})
fs.chmod(path, mode, callback)
fs.watch(fileOrDir, (event, filename) => { 
  event == 'change' // event == rename
})
fs.promise // experimental

// global
__dirname
__filename

// http
const http = require('http')
const keepAliveAgent = new http.Agent({keepAlive: true}) // 添加代理
options.agent = keepAliveAgent
http.request(options, onResponseCallback)
const proxy = http.createServer((req, res)=>{ // or 添加代理服务器
  res.writeHead(200, {'ContentType': 'text/plain'})
  res.end('ok')
}) 
proxy.on('connect', (req, cltSocket, head) => { 
  // 代理链接服务器
  const srcUrl = url.parse(`http://${req.url}`)
  const srvSocket = net.connect(srcUrl.port, srcUrl.hostname, ()=>{
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n')
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  })
})
// 获取请求
request.getHeader('content-type') // .setHeader(), removeHeader(), getHeaderNames()
http.get()
http.request()
// http2
const http2 = require('http2');
const fs = require('fs');
const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

// module
module.exports= {}
exports.a= class A{}

// TCP
const net = require('net')
const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  throw err;
});

// path
const path = require('path')
path.delimiter
path.dirname(path) // 获取路径
path.extname(path) // 扩展名
path.join()

// process 进程
process.argv // 命令行参数
process.argv0 // 起始命令, 如node
process.env.NODE_ENV
process.chdir(directory) // 改变工作路径
process.cwd() // 当前工作目录
process.execPath // 执行绝对路径
process.kill(pid[, signal])
process.nextTick(()=>{})
process.send(message[, sendHandle[, options]][, callback]) // 与父进程通信

// querystring
querystring.parse(str[, sep[, eq[, options]]])
querystring.stringify(obj[, sep[, eq[, options]]])

// readline
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('你认为 Node.js 中文网怎么样？', (answer) => {
  console.log(`多谢你的反馈：${answer}`);
  rl.close();
});
rl.write(data)
rl.resume() // 恢复传递
rl.pause()
rl.on('line', (input) => {})

// stream
const stream = require('stream');
// error, finish, pipe, unpipe, 
fs.end(), fs.pause(), fs.read()
// example
const fs = require('fs');
const r = fs.createReadStream('file.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);

// StringDecoder
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
decoder.write(Buffer.from([0xE2]));
decoder.write(Buffer.from([0x82]));
console.log(decoder.end(Buffer.from([0xAC])));

// immediate 定时器
setImmediate(callback[, ...args]) // 下一个队列循环
clearImmediate(immediate)
setTimeout(callback, delay[, ...args])
clearTimeout(timeout)
// promisify
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout)

// url
const url = require('url');
const myurl = url.parse('http://www.baidu.com')
const { URL, URLSearchParams} = require('url')
const myurl2 = new URL('myurl')
// myurl.hostname, .href, .host, .origin, .pathname, .port
params = new URLSearchParams('?user=abc&query=xyz'); // params.get('user'), .set(), 
console.log(params.toString());

// zlib 压缩
const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const inp = fs.createReadStream('input.txt');
const out = fs.createWriteStream('input.txt.gz');
inp.pipe(gzip).pipe(out);