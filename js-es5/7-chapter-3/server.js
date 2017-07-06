const url = require("url"),
    path = require("path"),
    fs = require("fs"),
    http = require("http");

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

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
});

server.listen(81, function() {
    console.log("server is listening on 81 port!");
})