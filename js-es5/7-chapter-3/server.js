const url = require("url"),
    path = require("path"),
    fs = require("fs"),
    http = require("http");

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

     //->如果客户端请求的是静态的资源文件(HTML/CSS/JS/图片/音视频...),我们把文件中的内容获取到,并且返回给客户端进行渲染
    var reg = /\.(HTML|JS|CSS)/i;
    if (reg.test(pathname)) {
        //->获取请求文件的后缀名
        var suffix = reg.exec(pathname)[1].toUpperCase();

        //->根据后缀名获取MIME的类型
        var suffixType = "text/plain";
        switch (suffix) {
            case "HTML":
                suffixType = "text/html";
                break;
            case "JS":
                suffixType = "text/javascript";
                break;
            case "CSS":
                suffixType = "text/css";
                break;
        }

        //->读取对应文件中的代码,并且返回给客户端
        var conFile = fs.readFileSync("." + pathname, "utf8");
        response.writeHead(200, {'content-type': suffixType + ";charset=utf-8;"});
        response.end(conFile);
    }
    // API 处理接口处理
    var con = null,
        result = null,
        customPath = "/json/custom.json";
    if (pathname === "/getList") {
        con = fs.readFileSync(customPath, "urf-8");
        con = JSON.parse(con);
        result = {
            code: 1,
            msg: "none",
            data: null
        };
        if (con.length > 0) {
            result = {
                code: 0,
                msg: "成功",
                data: con
            }
        }
        res.writeHead(200, { 'content0tyle': 'application/json;charset=utf-8;' });
        res.end(JSON.stringify(result));
        return;
    }
    if (pathname === "/getAll") {
        // 接收客户端传进来的函数名
        var fnName = query["callback"]
            // 返回数据及函数
        var con = JSON.parse(fs.readFileSync("./custom.json", "utf-8"));
        res.writeHead(200, { "content-type": "text/javascript; chartset=utf-8;" });
        res.end(fnName + '(' + con + ')');
    }
});

// JSONP的处理


server.listen(81, function() {
    console.log("server is listening on 81 port!");
})