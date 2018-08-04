const http=require('http');
const common=require('./libs/common');
const fs=require('fs');
const uuid=require('uuid/v4');

// 上传文件格式
/*
------WebKitFormBoundaryDqs4grRjEIPy5ZmY
Content-Disposition: form-data; name="user"

blue
------WebKitFormBoundaryDqs4grRjEIPy5ZmY
Content-Disposition: form-data; name="pass"

asdfasdf
------WebKitFormBoundaryDqs4grRjEIPy5ZmY
Content-Disposition: form-data; name="f1"; filename="a.txt"
Content-Type: text/plain

aaa
bbb
ccccccc
------WebKitFormBoundaryDqs4grRjEIPy5ZmY--
*/

/* 简化 */
/*
<分隔符>\r\n
Content-Disposition: form-data; name="user"\r\n
\r\n
blue\r\n
<分隔符>\r\n
Content-Disposition: form-data; name="pass"\r\n
\r\n
asdfasdf\r\n
<分隔符>\r\n
Content-Disposition: form-data; name="f1"; filename="a.txt"\r\n
Content-Type: text/plain\r\n
\r\n
<文件内容>\r\n 
<分隔符>-- 最后两个横杠为数据结束标志, 每行结束的/r/n 为http协议规定
*/

let server=http.createServer((req, res)=>{
  // multipart/form-data为二进制，str无法解析
  let arr=[];

  req.on('data', data=>{
    arr.push(data);
  });
  // 缺点：所有数据到达后开始处理
  req.on('end', ()=>{
    let data=Buffer.concat(arr);
    //data
    //解析二进制文件上传数据
    let post={};
    let files={};
    if(req.headers['content-type']){
      let str=req.headers['content-type'].split('; ')[1];
      if(str){
        let boundary='--'+str.split('=')[1];

        //1.用"分隔符切分整个数据"
        let arr=data.split(boundary);

        //2.丢弃头尾两个数据
        arr.shift();
        arr.pop();

        //3.丢弃掉每个数据头尾的"\r\n"
        arr=arr.map(buffer=>buffer.slice(2,buffer.length-2));

        //4.每个数据在第一个"\r\n\r\n"处切成两半
        arr.forEach(buffer=>{
          let n=buffer.indexOf('\r\n\r\n');

          let disposition=buffer.slice(0, n);
          let content=buffer.slice(n+4);

          disposition=disposition.toString();

          if(disposition.indexOf('\r\n')==-1){
            //普通数据
            //Content-Disposition: form-data; name="user"
            content=content.toString();

            let name=disposition.split('; ')[1].split('=')[1];
            name=name.substring(1, name.length-1);

            post[name]=content;
          }else{
            //文件数据
            /*Content-Disposition: form-data; name="f1"; filename="a.txt"\r\n
            Content-Type: text/plain*/
            let [line1, line2]=disposition.split('\r\n');
            let [,name,filename]=line1.split('; ');
            let type=line2.split(': ')[1];

            name=name.split('=')[1];
            name=name.substring(1,name.length-1);

            filename=filename.split('=')[1];
            filename=filename.substring(1,filename.length-1);

            let path=`upload/${uuid().replace(/\-/g, '')}`;

            fs.writeFile(path, content, err=>{
              if(err){
                console.log('文件写入失败', err);
              }else{
                files[name]={filename, path, type};
                console.log(files);
              }
            });
          }
        });
        //5.完成
        console.log(post);
      }
    }
    res.end();
  });
});
server.listen(8080);
