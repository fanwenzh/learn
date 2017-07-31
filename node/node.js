// gbk编码
const iconv = require('iconv-lite');
const content2 = iconv.decode(buffer, 'gbk');

// require
__dirname // 获取当前文件所在目录的绝对路径
__filename // 获取当前文件的绝对路径，__dirname + '/' + filename
// 模块对象, module.id, .filename, loaded, parent, children
module.exports
require()
require.cache
require.extensions
require.main
require.resolve()

// require载入顺序
// 1folder- 2package.json的main指向 - 3 index.js
// 加载不以'./' 或 '/'开头的文件，默认为系统核心模块：
// 1系统核心模块- 2当前目录node_module里的模块:require('./node_module/fs') - 3 逐层往上一级目录的node_module查找


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