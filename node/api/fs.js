const fs = require('fs');
var file = fs.readFile(URL)
fs.readFileSync(URL)
    // file.on() //close, open
    // readStream.bytesRead //已读取字节
    // readStream.path
fs.writeFile(file, data[, options], callback)
fs.writeFileSync()
    // fs.access(path[, mode], callback) // 测试访问权限
    // fs.accessSync()
fs.appendFile(file, data[, options], callback) //异步加载信息到文件
    // error
    // 读文件是不存在报错  
    // 意外错误
    // 文件权限问题
    // 文件夹找不到(不会自动创建文件夹)
fs.appendFileSync()
fs.createReadStream(path[, options]) // 大文件
    // stream.on('data');
    // stream.on('end');
fs.createWriteStream(path[, options])
fs.write(fd, buffer[, offset[, length[, position]]], callback)

fs.stat(path, callback) // 读取文件状态，判断文件是否存在
fs.statSync(path) {}

fs.fstatSync(fd)
    // stats.isFile()
    // stats.isDirectory()
    // stats.isFIFO()
    // stats.isSocket()...
fs.readdir(path[, options], callback)
fs.readdirSync(path[, options])
fs.rmdir(path, callback)
fs.rmdirSync(path)

fs.mkdir(path[, mode], callback)
fs.mkdirSync(path[, mode])
fs.mkdtemp(prefix[, options], callback) // 建立一个唯一的临时文件夹
fs.mkdtempSync(prefix[, options])

fs.open(path, flags[, mode], callback) //避免进程混乱，不建议在调用 fs.open() 、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access()
fs.openSync(path, flags[, mode])
fs.close(fd, callback) //filehandle 关闭文件
fs.closeSync(fd)
fs.read(fd, buffer, offset, length, position, callback)
fs.unlink(url, cb) // 删除url文件
fs.unlinkSync(url, cb)

fs.constants //返回文件常量
fs.access
fs.accessSync

fs.chmod(path, mode, callback) //改写文件权限
fs.chmodSync(fd, mode)
fs.fchmod(fd, mode, callback) //改变已打开文件权限
fs.fchmodSync(fd, mode)
fs.chown(path, uid, gid, callback) //更改文件所有权
fs.chownSync(path, uid, gid)

var fileListen = fs.watch(filename[, options][, listener]) // listener监听函数
    // fileListen.on('change', cb){}
    // fileListen.on('error', cb){}
    // fileListen.on('error',cb){}
    // fileListen.on('close', cb){}
fs.watchFile(filename[, options], function(cur, pre) {})
fs.unwatchFile(filename[, listener]) fs.stat(url, cb(err, stats)); //获取文件信息（atime访问时间, mtime修改时间, birthtime创建时间

fs.rename(oldUrl, newUrl, cb) //文件重命名，移动！
fs.renameSync(oldPath, newPath) fs.realpath(path[, options], callback) fs.realpathSync(path[, options])

fs.symlink(target, path[, type], callback) // 创建文件符号链接
fs.symlinkSync(target, path[, type])

fs.truncate(path, len, callback) //文件内容截取
fs.truncateSync(path, len)