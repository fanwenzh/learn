# socket.io_chatRoom
http://socket.io/get-started/chat/
------

### 环境配置
```
  "dependencies": {
    "express": "^4.14.0",
    "http": "0.0.0",
    "socket.io": "^1.7.2"
  }
```
-----

### socket.io api
#### 1. 服务端程序
```
    //ioServer监听http（express）server
    var app = require('express')();
    var server = require('http').Server(app);
    var ioServer = require('socket.io')(server);
    server.listen(3000);
```
server层事件
```
    //监听connection事件（访问），并返回该连接端口socket
    ioServer.on('connection', function(socket){});
    //向所有连接广播事件
    ioServer.emit('eventName', sendObject);
```
socket层事件（emit执行(发送)，on响应(接收)）
```
   //连接成功响应，
    socket.emit('open')
    //连接断开触发
    socket.on('disconnec', function(){})
    //(本连接)触发事件
    socket.emit('eventName', sendObject, [callback])
    //向除socket以外的连接广播事件
    socket.broadcast.emit('eventName', sendObject)
    
```
#### 2.客户端
```
    //html的head部分添加
    <script src="/socket.io/socket.io.js" type="text/javascript"></script>
    <script>
        var socket = io.connect();
        socket.on('eventName', function(receptData){});
        socket.emit('eventName', sendObject);
    </script>
```
-----
### Socket.io 实现
#### 连接
![](https://github.com/fanwenzh/socket.io_chatRoom/blob/master/img/link.png)
#### 通讯
![](https://github.com/fanwenzh/socket.io_chatRoom/blob/master/img/communication.png)
