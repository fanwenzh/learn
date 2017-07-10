// ifconfig

// 1云服务器
// 2域名
// 3域名解析
// www.baidu.com  220.123.23.23(外网ip地址) 80(服务器端口号)

// 服务器端口号(0~64435)
// 一般80(http)/443（https）端口发布服务项目
// FTP 21端口

// URI = URL + URN 统一资源标识符
// URL:同一资源定位符
// http://v.qq.com:80/index.html?name=fanwenzh&age=18#bbs
// http传输协议
// v.qq.com域名
// 80：端口号
// index.html：请求资源文件名
// search:?name=fanwenzh&age=18:url的传参
// #bbs:url的hash值

// URN:同一资源名称

//Ajax: async javascript and xml 异步js和XML
// 创建AJAX对象
var xhr = new XMLHttpRequest;
// get: 只能url?num=123，在url中传递，IE2kb
// post: 在请求主体中上传数据
// xhr.open("post", url, false); xhr.send('{"name":"fwz"}');
// get缓存问题：不一定304
// 项目中一般不让get请求出现缓存:在url的末尾追加成一个随机数
// xhr.open("get", "/getList?num=12&_=" + Math.random());


// put: 向服务器上传资源文件（如图片）
// delete, head:只获取响应头信息
// 服务器设置是否需要用户名密码限制
xhr.open("get", "url", false, [username], [userpass]);
xhr.setRequestHeader("hi", "tony");
xhr.timeout = "1000"; // 设置AJAX请求超时时间
xhr.onreadystatechange = function() {
        // xhr.readyState
        // 0: UNSENT 当前的请求还没发送
        // 1: OPENED  url地址已经打开（发送前参数设置完成）
        // 2: HEADERS_RECEIVED 响应头信息已经接受 // xhr.readyState == 2 获取服务器响应头时间 xhr.getResponseHeader("Date")
        // 3: LOADING 服务器长在处理返回的内容
        // 4: DONE 响应主体已经成功返回客户端
        // xhr.status:HTTP网络状态码
        // 200 or ^2\d{2} 响应主体成功返回
        // 301 永久重定向/永久转移, www.360buy.com
        // 302 临时重定向/临时转移  服务器的负载均衡
        // 304 本次获取的内容是读取缓存内存中的数据
        // 400 客户端传递给服务器的参数出现未知错误
        // 401 无权限访问
        // 404 客户端访问的地址不存在
        // 500 未知的服务器错误
        // 503 服务器已经超负荷

        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            var data = xhr.responseText;
        }
    }
    // 参数是请求主体中传递给服务器的内容；
xhr.send();
// XMLHttpRequest -> XMLHttpRequestEventTarget -> EventTarget -> Object
xhr.addEventListener("readystatechange", function() {}) // DOM2

//js惰性思想：私有作用域储存标识 （如IE6~8）

// window.location.href = ""

// XML(Extensible Markup Language) 可扩展标记语言
// 利用自己扩展的规则标记来存储相关的数据