// 窗口输入输出
process.argv //doc参数
process.env //返回用户环境信息

process.execPath // 执行的绝对路径

process.stdin.on('readable', () => {});
process.stdin.read();
'data'
'beforeExit'
'disconnect'
'exit'
'message'
'warning'
'rejectionHandled'
'SIGINT' // Signal Event
process.stdin.readline();
process.stdin.prependListener(process.stdout);
process.stdin.setEncoding('utf8');
process.stdout.write();
process.chdir(directory) //改变当前进程工作目录
process.cwd() // 返回进程当前目录
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