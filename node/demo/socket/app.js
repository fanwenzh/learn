  //ioServer监听http（express）server
var app = require('express')();
var server = require('http').Server(app);
var ioServer = require('socket.io')(server);

var ids = 0;

server.listen(3000);
console.log('server lister on port 3000');

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

ioServer.on('connection', function (socket) {
	
	//没有回调函数
	socket.emit('open');
	var client = {
		socket:socket,
		username:false,
		id: getId()	
	};

	socket.on('message', function(msg){
		var obj = {
			time : getTime(),
		};
		if(!msg.username){
			console.log("msg.username isn't exist");
			return;
		}
		//client first login
		if(!client.username){
			client.username = msg.username;
			obj['username'] = 'system';
			obj['text'] = 'Welcome socketChat! ' + client.username;
		} else {
			obj['username'] = client.username;
			obj['text'] = msg.text;
		}
		ioServer.emit('system', obj);

	});

    socket.on('disconnect', function(){
        var obj ={
            username:'system',
			text:client.username + " disconnect!"
        };
        socket.broadcast.emit('system', obj);
    });
 }); 

var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
};

var getId = function(){
	return ids++;
};
