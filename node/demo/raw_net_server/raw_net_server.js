const http=require('http');
const net=require('net');         //TCP:传输层     原生Socket
const crypto=require('crypto');

/*
let server=http.createServer((req, res)=>{
  console.log('连接');
});
server.listen(8080);
*/

let server=net.createServer(sock=>{
  console.log('连接');
  /* 握手的http头：
    GET / HTTP/1.1
    Host: localhost:8080
    Connection: Upgrade
    Pragma: no-cache
    Cache-Control: no-cache
    Upgrade: websocket
    Origin: file://
    Sec-WebSocket-Version: 13
    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like
    Gecko) Chrome/65.0.3315.4 Safari/537.36
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,es;q=0.6,fr;q=0.5,pt;q=0.4
    Sec-WebSocket-Key: +0jgXtYyVeG28Gn1CLUKIg==
    Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
  */
  //数据过来——握手只有一次, 用once
  sock.once('data', data=>{
    console.log('hand shake start...');

    let str=data.toString();
    let lines=str.split('\r\n');

    //舍弃第一行和最后两行
    lines=lines.slice(1, lines.length-2);

    //切开
    let headers={};
    lines.forEach(line=>{
      let [key, val]=line.split(': ');

      headers[key.toLowerCase()]=val;
    });

    //console.log(headers);

    if(headers['upgrade']!='websocket'){
      console.log('其他协议', headers['upgrade']);

      sock.end();
    }else if(headers['sec-websocket-version']!=13){
      console.log('版本不对', headers['sec-websocket-version']);

      sock.end();
    }else{
      let key=headers['sec-websocket-key'];
      // 作者规定13版本的标志串
      let mask='258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
      // 规定的返回编码头
      let hash=crypto.createHash('sha1');
      hash.update(key+mask);
      let key2=hash.digest('base64');
      // 100Continue, 101切换协议
      sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${key2}\r\n\r\n`);
      
      console.log('hand shake end');

      //真正的数据on
      sock.on('data', data=>{
        console.log('有数据');
        // 传输层传来的是帧
        let FIN=data[0]&0x001;
        let opcode=data[0]&0x0F0;
        let mask=data[1]&0x001;
        let payload=data[1]&0x0FE;

        console.log(FIN, opcode);
        console.log(mask, payload);
      });
    }
  });

  //断开了
  sock.on('end', ()=>{
    console.log('客户端已断开');
  });
});
server.listen(8080);
