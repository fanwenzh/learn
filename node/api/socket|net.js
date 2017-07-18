const net = require('net');
// 连接相关
socket.connect()：有3种不同的参数，用于不同的场景；
socket.setTimeout()：用来进行连接超时设置。
socket.setKeepAlive()：用来设置长连接。
socket.destroy(）、socket.destroyed：当错误发生时，用来销毁socket，确保这个socket上不会再有其他的IO操作;
// 数据读、写相关
socket.write()、socket.end()、socket.pause()、socket.resume()、socket.setEncoding()、socket.setNoDelay()

// 数据属性相关
socket.bufferSize、socket.bytesRead、socket.bytesWritten

// 事件循环相关
socket.ref()、socket.unref()

// 地址相关
socket.address()
socket.remoteAddress、socket.remoteFamily、socket.remotePort
socket.localAddress/socket.localPort
// 事件简介
data：当收到另一侧传来的数据时触发。
connect：当连接建立时触发。
close：连接断开时触发。如果是因为传输错误导致的连接断开，则参数为error。
end：当连接另一侧发送了 FIN 包的时候触发（读者可以回顾下HTTP如何断开连接的）。默认情况下（allowHalfOpen == false），socket会完成自我销毁操作。但你也可以把 allowHalfOpen 设置为 true，这样就可以继续往socket里写数据。当然，最后你需要手动调用 socket.end()
error：当有错误发生时，就会触发，参数为error。（官方文档基本一句话带过，不过考虑到出错的可能太多，也可以理解）
timeout：提示用户，socket 已经超时，需要手动关闭连接。
drain：当写缓存空了的时候触发。（不是很好描述，具体可以看下stream的介绍）
lookup：域名解析完成时触发。

http://www.cnblogs.com/chyingp/p/6072338.html