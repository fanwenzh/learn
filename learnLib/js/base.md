## socket.io: js兼容的WWebSocket
```js
// node
const http = require('http')
const io = require('socket.io')

let server = http.createServer()
server.listen(8080)

// 创建WebSocket服务, 要监听http服务器
let wsServer = io.listen(httpServer)
let oSock = [] // wsocket集合
wsServer.on('connection', function(sock){
	aSock.push(sock)
	sock.on('myConName', function(num1, num2){

	})
	sock.on('disconnet', function(){
		oSock = aSock.filter(item => item != this) // 离线后脱离广播
	})
	sock.emit('conName2', data)
})
// 前端socket.io.js
let sock = io.connect('ws://localhost:8080')
sock.emit('myConName', 12, 5)

```

# node
http
```js
	allowHosts.indexOf(req.headers['orgin']) != -1
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.writeHeader(404)
	res.wite(body)
```
fs.readFile(path, (err,data)=>{})
fs.writeFile(path, content, err=>{})

url.parse(url, true)
os
```js
// mysql.createConnection({host: 'localhost', user:'who', password:'123456', database:'databaseName'})
let db = mysql.createPool({host: 'localhost', user:'who', password:'123456', database:'databaseName'})
db.query('sql语句', (err, data)=>{})
```