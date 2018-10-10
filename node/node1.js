// assert
const assert = require('assert')
assert.strictEqual(1, 2) // assert.notStrictEqual()
assert.deepEqual([1,2], [1,[2,3]])
assert.deepStrictEqual({ a: 1 }, { a: '1' })
assert.fail('messsage')

// Buffer // Uint8Array 
const buf1 = Buffer.alloc(10, 1)
const buf2 = Buffer.allocUnsafe(10) // 未重写数据
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
buf.slice(start, end)
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
const http = require('http');
const numCPUs = require('os').cpus().length;

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
