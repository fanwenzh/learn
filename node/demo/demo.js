// ### process.stdin
// process.stdin.readline();
// // 当前命令行中后回车符出现 触发
// process.stdin.on('data', (input) => {
//     // input为输入流	
//     input = input.toString().trim();
// })

// 'use strict'
// // 实现require
// function $require(id) {
//     const fs = require('fs')
//     const path = require('path')

//     const filename = path.join(__dirname, id)
//     $require.cache = $require.cache || {}
//         // require的缓存机制
//     if ($require.cache[filename]) {
//         // 所有require都返回exports对象
//         return require.cache[filename].exports;
//     }
//     const dirname = path.dirname(filename)
//     let code = fs.reqdFileSync(filename)
//     let module = { id: filename, exports: {} }
//     let exports = module.exports
//         // ` `相当于 eval()
//     code = `
//         (function($require, module, exports, __dirname, __filename) {
//             ${code}
//         })($require, ,module, exports, dirname, filename);`
//     //缓存
//     $require.cache[filename] = module
//     return module.exports
// }

// 读取歌词 06.js
// const fs = require('fs')
// const path = require('path')
// const iconv = require('iconv-lite')

// var begin = new Date().getTime();
// fs.readFile(path.join(__dirname, './../1.lrc'), (err, data) => {
//      toString('') 没有gbk类型
//     var lines = iconv.decode(data, 'gbk').split('/n')
//         // 查找字符串，首先考虑用正则匹配
//         // /s为空白字符，.为任意非空白字符, 括号开头判断正则匹配为第几组
//     var regexp = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s.+/
//     lines.forEach((line) => {
//         // [00:12.12] 中文歌词
//         var matches = regexp.match(line)
//         if (matches) {
//             // matches[0] 为 原字符串
//             var m = parseFloat(matches[1]);
//             var s = parseFloat(matches[2]);
//             var f = parseFloat(matches[3]);
//             var lyric = matches[4];
//             // 减去循环代码执行的时间
//             var offset = new Date().getTime() - begin;
//             setTimeout(() => {
//                 console.log(lyric)
//             }, m * 60 * 1000 + s * 1000 + f - offset)
//         } else {
//             // 不是歌词
//             console.log(line);
//         }
//     })
// })

// readline demo
// 使用readline模块逐行读入
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin, // 输入流
//     output: process.stdout //输出流
// });
// // 获取输入
// rl.prompt()
//     // 监听行的流读入事件
// rl.on('line', (line) => {
//     console.log(`Received: ${line}`);
//     rl.prompt()
// }).on('close', () => {
//     console.log('have a great day!');
//     // 退出
//     process.exit(0);
// });

// fs
// const fs = require("fs");
// var reader = fs.createReadStream(url);
// var writer = fs.createWriteStream(url);
// fs.stat('./list.md', (err, stats) => {
//     if (err) return;
//     else{
//         fs.unlink('./list.md', (err) => {
//             if (err) console.log(err);
//             fs.writeFile('./list.md', new Date);
//         })
//         var total = 0;
// reader.on('data', (chunk) => {
//     writer.write(chunk, err => {
//         console.log('写入' + (total += chunk.length) / status.size * 100 + '%');
//     })
// })
// reader.on('end', () => {})
//     }    
// });

// var reader = fs.createReadStream(url);
// var writer = fs.createWriteStream(url);
// writer.on('pipe', (src)=>{});
// reader.pipe(writer);

// http启动
// const http = require('http');
// const server = http.createServer((req, res) => {
//     // 每次访问都触发
// });
// server.listen(500, (error) => {
//     if (error) console.log('create error');
//     else
//         console.log('server lister at port 500');
// })

// 打印当前目录所有文件
// const fs = require('fs');
// const path = require('path');
// var target = path.join(__dirname, process.argv[2] || '../');
// console.log(target);
// function loaddir(target, level) {
//     // 空数组数 * '|  '
//     var prefix = new Array(level + 1).join('│  ');
//     var dirinfo = fs.readdirSync(target);
//     var dirs = [];
//     var files = [];
//     dirinfo.forEach(info => {
//         var stat = fs.statSync(path.join(target, info));
//         if (stat.isDirectory()) {
//             dirs.push(info);
//         } else {
//             files.push(info);
//         }
//     });
//     var next = level + 1;
//     dirs.forEach(dir => {
//         console.log(`${prefix}├─ ${dir}`);
//         loaddir(path.join(target, dir), next);
//     });
//     var count = files.length - 1;
//     files.forEach(file => {
//         if (count--) {
//             console.log(`${prefix}├─ ${file}`);
//         } else {
//             console.log(`${prefix}└─ ${file}`);
//         }
//     });
// }
// loaddir(target, 0);

// 创建多个文件夹
// var path = require('path');
// var fs = require('fs');
// function mkdirs(pathname, callback) {
//     // 取得父模块文件目录
//     let root = path.dirname(module.parent.filename);
//     pathname = path.isAbsolute(pathname) ? pathname : path.join(__dirname, pathname);
//     var relativePath = path.relative(root, pathname);
//     var folders = relativePath.split(path.sep);
//     try {
//         let pre = '';
//         folders.forEach(folder => {
//             fs.mkdirSync(path.join(root, pre, folder));
//             pre = path.join(pre, folder);
//         })
//         callback && callback(null);
//     } catch (e) {
//         console.log('error', e);
//         callback && callback(e);
//     }
// }
// mkdirs('hello', () => {
//     console.log('ok');
// })

// watchFile
// fs.watchFile(target, { interval: 200 }, (curr, prev) => {
//     // 一旦文件变化，触发该函数
//     // 判断文件到底有没有变化， 减少不必要的转换
//     if (curr.mtime === prev.mtime) {
//         return false;
//     }
// })