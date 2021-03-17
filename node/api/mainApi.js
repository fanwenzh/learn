// 1.console
console.log()
console.dir()
console.error(new Error('错误'))
console.time()
console.timeEnd()

// 2.process
// terminal 输入窗口
process.stdout.write('');
process.stdin.on('readable', () => {}); //stream
process.stdin.pine(process.stdout); //string

// 获取terminal输入参数 
var argv = process.argv; // 获取输入
var argvs = argv.slice(2);

process.chdir(directory) //改变当前进程工作目录
process.cwd() // 返回进程当前目录
process.env //返回用户环境信息
process.execPath //执行的绝对路径
process.exit() //结束当前进程

process.pid // 返回进程pid
process.seteuid(id) // 设置用户id
process.getegid() //获取进程id

process.setgroups(groups) //Array
process.setgid(id) //设置进程id
process.getgid() //获取进程组id

process.kill(pid[, signal]) //将signal信息发送给pid进程
process.memoryUsage() // 返回内存使用情况
process.nextTick(callback[, ...args]) // 将callback 添加到next tick 队列
process.platform // 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
process.send(message[, sendHandle[, options]][, callback]) // 发送信息给父进程

// 3.File System

// 4.process输入
process.stdin.readline();
process.stdin.on('data', (chunk) => {});
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write(`data: ${chunk}`);
    }
});
process.stdin.on('end', () => {
    process.stdout.write('end');
});

// 5.require
__dirname // 获取当前文件所在目录的绝对路径
__filename // 获取当前文件的绝对路径，__dirname + '/' + filename
require.cache
require.extensions
require.main
require.resolve()