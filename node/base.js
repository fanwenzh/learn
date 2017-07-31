// 1、global: 浏览器端为window
// console
console.log()
console.dir()
console.error(new Error('错误'))
console.time()
console.timeEnd()
console.trace();

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

// fs
const fs = require('fs') // 当读取二进制文件(非.txt)，返回一个Buffer对象
const file1 = fs.readFile('sample.txt', 'utf-8', function(err, data) {
    var text = data.toString('utf-8');
    // var buf = new Buffer(text, 'utf-8');
})
const file2 = fs.readFileSync(url2, 'utf8')
fs.writeFile('output.txt', data, function(err) {})
fs.writeFileSync('output.txt', data)
fs.stat('sample.txt', function(err, stat) { // fs.statSync()
    if (stat.isFile()) {
        console.log('size:' + stat.size);
        console.log('birth time: ' + stat.birthtime);
        console.log('modified time: ' + stat.mtime);
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
// pipe 管道
var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');
rs.pipe(ws);
// readable.pipe(writable, { end: false }); // end事件触发后不自动关闭writable流

// http
var http = require('http');
var server = http.createServer(function(req, res) {
    console.log(request.method + ':' + request.url);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>hello world</h1>');
})
server.listen(8000, ip, function(err) {
    console.log('Server is running at http://127.0.0.1:8080/');
})