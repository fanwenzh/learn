// commonjs规范
// http://javascript.ruanyifeng.com/nodejs/module.html
// 所有代码都运行在模块作用域，不会污染全局作用域。
// 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
// 模块加载的顺序，按照其在代码中出现的顺序。

module.id // 模块的识别符，通常是带有绝对路径的模块文件名。
module.filename // 模块的文件名，带有绝对路径。
module.loaded // 返回一个布尔值，表示模块是否已经完成加载。
module.parent // 返回一个对象，表示调用该模块的模块。
module.children // 返回一个数组，表示该模块要用到的其他模块。
module.exports // 表示模块对外输出的值。

// commonjs规范， 同步加载， 应用于服务端
// AMD规范， 异步加载， 应用于浏览器端

// require：个人理解，返回js文件的一个复制；多次加载会从缓存中直接读取
__dirname // 获取当前文件所在目录的绝对路径
__filename // 获取当前文件的绝对路径，__dirname + '/' + filename
// require载入顺序
// 1folder- 2package.json的main指向 - 3 index.js
// 加载不以'./' 或 '/'开头的文件，默认为系统核心模块：
// 1系统核心模块- 2当前目录node_module里的模块:require('./node_module/fs') - 3 逐层往上一级目录的node_module查找

// require(): 加载外部模块
// require.resolve()：将模块名解析到一个绝对路径
// require.main：指向主模块
// require.cache：指向所有缓存的模块
// require.extensions：根据文件的后缀名，调用不同的执行函数

// promise
// setTimeout(function() {
//   console.log(1)
// }, 0);
// new Promise(function executor(resolve) {
//   console.log(2);
//   for( var i=0 ; i<10000 ; i++ ) {
//     i == 9999 && resolve();
//   }
//   console.log(3);
// }).then(function() {
//   console.log(4);
// });
// console.log(5);
// 2, 3, 5, 4, 1

// gbk编码
const iconv = require('iconv-lite');
const content2 = iconv.decode(buffer, 'gbk');

// buffer
// Buffer.alloc(size[, fill[, encoding]])
const buf = Buffer.alloc(5, 'a')
    // buf.write(string[, offset[, length]][, encoding])，buf长度
    // 从第2位开始写入ss字符串
buf.write('ss', 2)
    // 大端小端问题：BE(网络)、LE(文件)
buf.writeInt16LE(1)
    // 解决问题
    // 1.尝试解决，2.问题整理需求，3.抽象关键词，4，google
    // stackoverflow

// const net = require('net) // TCP 原生Socket
// const io = require('sockit.io) // 封装  
