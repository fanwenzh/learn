## 第1章 Node简介
```javascript
// 1.4 Node的特点
// 每个调用之间无需等待I/O调用结束, 提高运行效率
// 单线程没有死锁，没有上下文交换带来的性能开销

// 1.5 Node的应用场景
// I/O密集型和CPU密集型

// 1.6 CommonJS规范
// 弥补Javascript没有模块标准的缺陷
// exports.add = function(){} 
```

#### 2.2 Node的模块实现
```javascript
// . 或 .. 相对路径, /绝对路径
// 模块读取过程中，需要调用fs模块同阻塞式地判断文件是否存在
// .node和.json文件在传递给require()的表示中带上扩展名，会加快加载速度；同步配合缓存，可缓解单线程阻塞式调用的缺陷
// 每一个编译成功的模块都会将其文件路径作为索引缓存在Module._cache对象上，以提高二次引用的性能
// Module._extensions会赋值给require()的extensions属性，所以通过在代码中访问require.extensions可以知道系统中已有的扩展加载方式
// 如果想对自定义的扩展名进行特殊的加载，可以通过require.extension['.ext']的方式实现

// 在编译过程中Node对获取的JavaScript文件内容进行了头尾包装： 在头部添加了"(function(exports, require, module, __filename, __dirname){\n", 在尾部添加了 "\n});"
// 包装之后的代码会通过vm原生模块的runInThisContext()方法执行：类似eval
// 在执行之后， 模块的exports属性被返回给了调用方。exports属性上的任何方法和属性都可以被外部调用到，但是模块中的奇鱼变量或属性则不可直接被调用
// exports对象时通过形参的方式传入的，直接赋值形参会改变形参的引用，但并不能改变作用域外的值： exports = function(){}
```

#### 2.3 核心模块
```javascript
// 在加载的过程中，Javascirpt核心模块经理标识符分析后直接定位到内存中，查找速度更快（内存中加载，通过C/C++编写）
// node_extensions.h文件将散列的内建模块房价了node_module_list的数组中
// Node在启动时，会生成一个全局变量process, 并提供Binding()方法来协助加载
// get_builtin_module()方法取出内建模块对象，通过执行register_func()填充exports对象，最后将exports对象按模块名缓存，并返回调用方完成导出
// node采用与Web Worker的思路解决单线程中计算量的问题：child_process
```

#### 2.4 C/C++扩展模块
```javascript
// Javascript中只有double型的数据类型，在进行位运算的过程中，需要将double型转换为int型，所以在Javascript层面做位运算的效率不高
// 扩平台编译工具: npm install -g node-gyp
// 对于扩展名为.node的文件，Node会调用process.dlopen()方法去加载文件
// 加载.node文件：第一步骤是调用uv_dlopen()方法打开动态链接库，第二步骤是调用uv_dlsym()方法找到动态链接库中同股oNODE_MODULE宏定义的方法地址

```

#### 2.6 包与NPM
```javascript
// package.json: 包描述文件
    // keywords: 关键词数组， NPM中主要用来做分类搜索
    // maintainers: {"name": , "email": , "web": }
// bin: 用于存放可执行二进制文件的目录
// lib: 用于存放Javascipt代码的目录
// doc: 用于存放文档的目录
// test: 用于存放单元测试用例的代码
```

#### 2.7 前后端共用模块
```javascript
// AMD规范是CommonJS模块规范的一个判断条件, 定义如下
// define(id?, dependencies>, factory);
```
---
#### 兼容多种模块的规范：
```javascript
  (function (name, definition) {
          // 检测上下文环境是否为AMD或CMD
          var hasDefine = typeof define === 'function',
            // 检查上下文环境是否为Node
            hasExports = typeof module ! == 'undefined' && module.exports;

          if (hasDefine) {
            // AMD环境或CMD环境
            define(definition);
          } else if (hasExports) {
            // 定义为普通Node模块
            module.exports = definition();
          } else {
            // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
            this[name] = definition();
          }
        })('hello', function () {
          var hello = function () {};
          return hello;
        });
```

## 第3章
#### 3.3 Node的异步I/O
```javascript
// 在进程启动时，Node便会创建一个类似于while(true)的循环，每执行一次循环体的过程我们称为Tick
```

#### 3.4 非I/O的异步API
```javascript
// 没有原生的sleep方法，暂停使用线程（CPU）
// setTimeout()、setInterval()、setImmediate()和process.nextTick()
// 其中process.nextTick()方法的操作相对较为轻量
// ，当第一个setImmediate()的回调函数执行后，并没有立即执行第二个，而是进入了下一轮循环，再次按process.nextTick()优先、setImmediate()次后的顺序执行。之所以这样设计，是为了保证每轮循环能够较快地执行结束，防止CPU占用过多而阻塞后续I/O调用的情况。
```

#### 4.3 异步编程解决方案
```javascript
// events: addListener/on()、once()、removeListener()、removeAllListeners()和emit()
// 如果对一个事件添加了超过10个侦听器，将会得到一条警告。这一处设计与Node自身单线程运行有关，设计者认为侦听器太多可能导致内存泄漏，所以存在这样一条警告
// 雪崩问题: 在高访问量、大并发量的情况下缓存失效的情景，此时大量的请求同时涌入数据库中，数据库无法同时承受如此大的查询请求，进而往前影响到网站整体的响应速
// Promise是高级接口，事件是低级接口

```

#### 5.1 V8的垃圾回收机制和内存限制
```javascript
// Node在启动时可以传递--max-old-space-size或--max-new-space-size来调整内存限制的大小
// 查看垃圾回收日志的方式主要是在启动时添加--trace_gc参数
// 通过在Node启动时使用--prof参数，可以得到V8执行时的性能分析数据，其中包含了垃圾回收执行时占用的时间
// V8提供了linux-tick-processor工具用于统计日志信息。该工具可以从Node源码的deps/v8/tools目录下找到，Windows下的对应命令文件为windows-tick-processor.bat。
```

---
#### 5.3 内存指标
```javascript
// process.memoryUsage()、os模块中的totalmem()和freemem()方法:返回系统的总内存和闲置内存，以字节为单位
// rss是resident set size的缩写，即进程的常驻内存部分
* // Buffer对象不同于其他对象，它不经过V8的内存分配机制，所以也不会有堆内存的大小限制。
```

---
#### 5.5 内存泄露排查
```javascript
// stats事件： 在进程中使用node-memwatch之后，每次进行全堆垃圾回收时，将会触发一次stats事件，这个事件将会传递内存的统计信
// 如果经过连续5次垃圾回收后，内存仍然没有被释放，这意味着有内存泄漏的产生，node-memwatch会出发一个leak事件
* // 大内存操作：改用fs.createReadStream()和fs.createWriteStream()方法通过流的方式实现对大文件的操作
```

## 第6章 Buffer
#### 6.1 Buffer对象
```javascript
// Buffer对象类似于数组，它的元素为16进制的两位数，即0到255的数值: 给元素的赋值如果小于0，就将该值逐次加256，直到得到一个0到255之间的整数。如果得到的数值大于255，就逐次减256，直到得到0~255区间内的数值。如果是小数，舍弃小数部分，只保留整数部分。
// slab分配机制：full：完全分配状态。partial：部分分配状态。empty：没有被分配状态。
// buffer转码: iconv-lite采用纯JavaScript实现，iconv则通过C++调用libiconv库完成。前者比后者更轻量，无须编译和处理环境依赖直接使用。在性能方面，由于转码都是耗用CPU，在V8的高性能下，少了C++到JavaScript的层次转换，纯JavaScript的性能比C++实现得更好。
// 另外，iconv和iconv-lite对无法转换的内容进行降级处理时的方案不尽相同。iconv-lite无法转换的内容如果是多字节，会输出[插图]；如果是单字节，则输出？。iconv则有三级降级策略，会尝试翻译无法转换的内容，或者忽略这些内容。如果不设置忽略，iconv对于无法转换的内容将会得到EILSEQ异常
```

---
#### 6.3 Buffer拼接
```javascript
*// 正确的拼接方式是用一个数组来存储接收到的所有Buffer片段并记录下所有片段的总长度，然后调用Buffer.concat()方法生成一个合并的Buffer对象
    Buffer.concat = function(list, length) {
        if (! Array.isArray(list)) {
        throw new Error('Usage: Buffer.concat(list, [length])');
        }

        if (list.length === 0) {
            return new Buffer(0);
        } else if (list.length === 1) {
            return list[0];
        }

        if (typeof length ! == 'number') {
            length = 0;
        for (var i = 0; i < list.length; i++) {
            var buf = list[i];
            length += buf.length;
        }
        }

        var buffer = new Buffer(length);
        var pos = 0;
        for (var i = 0; i < list.length; i++) {
            var buf = list[i];
            buf.copy(buffer, pos);
            pos += buf.length;
        }
        return buffer;
    };
```

#### 6.4 Buffer与性能
```javascript
// 测试方法：ab -c 200 -t 100 http://127.0.0.1:8000
// 通过预先转换静态内容为Buffer对象，可以有效地减少CPU的重复使用，节省服务器资源
// pool是常驻内存的，只有当pool单元剩余数量小于128（kMinPoolSpace）字节时，才会重新分配一个新的Buffer对象
```

#### 7.1 构建TCP服务
```javascript
// 在Node中，由于TCP默认启用了Nagle算法，可以调用socket.setNoDelay(true)去掉Nagle算法，使得write()可以立即发送数据到网络中。
```

#### 7.2 构建UDP服务
```javascript
var dgram = require('dgram')
var socekt = dgram.createSocket('udp4') 
```

#### 7.3 构建HTTP服务
```javascript
// request事件：建立TCP连接后，http模块底层将在数据流中抽象出HTTP请求和HTTP响应，当请求数据发送到服务器端，在解析出HTTP请求头后，将会触发该事件；在res.end()后，TCP连接可能将用于下一次请求响应。
// 为了重用TCP连接，http模块包含一个默认的客户端代理对象http.globalAgent。它对每个服务器端（host+ port）创建的连接进行了管理，默认情况下，通过ClientRequest对象对同一个服务器端发起的HTTP请求最多可以创建5个连接(连接池)
```

#### 7.4 构建Web Socket服务
```javascript
// Web Socket以前：长轮询的原理是客户端向服务器端发起请求，服务器端只在超时或有数据响应时断开连接（res.end()）；客户端在收到数据或者超时后重新发起请求
// WebSocket协议与普通的HTTP请求协议略有区别的部分在于如下这些协议头：
//     Upgrade: websocket
//     Connection: upgrade
// 其中Sec-WebSocket-Key用于安全校验
```

#### 7.5 网络服务与安全
```javascript
// Node在网络安全上提供了3个模块，分别为crypto、tls、https
```

## 第8章 基础功能
```javascript
// cookie, session, 
// If-Modified-Since/Last-Modified : 通过fs.stat检验文件的mtime是否需要重新更新： stat.mtime.toUTCString()
    // 缺陷：文件的时间戳改动但内容并不一定改动。时间戳只能精确到秒级别，更新频繁的内容将无法生效。
// HTTP1.1中引入了ETag来解决这个问题。ETag的全称是Entity Tag, If-None-Match/ETag
// Expires的缺陷在于浏览器与服务器之间的时间可能不一致，这可能会带来一些问题，比如文件提前过期，或者到期后并没有被删除
// Cache-Control设置了max-age值，它比Expires优秀的地方在于，Cache-Control能够避免浏览器端与服务器端时间不同步带来的不一致性问题，只要进行类似倒计时的方式计算过期时间即可。除此之外，Cache-Control的值还能设置public、private、no-cache、no-store等能够更精细地控制缓存的选项。
```

#### 8.2 数据上传
```javascript
// 请求头中的Content-Type字段默认值：application/x-www-form-urlencoded
// multipart/form-data

// 在解析表单、JSON和XML部分，我们采取的策略是先保存用户提交的所有数据，然后再解析处理，最后才传递给业务逻辑。这种策略存在潜在的问题是，它仅仅适合数据量小的提交请求，一旦数据量过大，将发生内存被占光的情况
// 解决方案：限制上传内容的大小，一旦超过限制，停止接收数据，并响应400状态码; 通过流式解析，将数据流导向到磁盘中，Node只保留文件路径等小数据。
```
---
#### 8.3 路由解析
```javascript
    var pathRegexp = function(path) {
        path = path
        .concat(strict ? '' : '/? ')
        .replace(/\/\(/g, '(? :/')
        .replace(/(\/)? (\.)? :(\w+)(? :(\(.*? \)))? (\? )? (\*)? /g, function(_, slash, format, key, capture,
    optional, star){
            slash = slash || '';
            return ''
            + (optional ? '' : slash)
            + '(? :'
            + (optional ? slash : '')
            + (format || '') + (capture || (format &amp;&amp; '([^/.]+? )' || '([^/]+? )')) + ')'
            + (optional || '')
            + (star ? '(/*)? ' : '');
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
        return new RegExp('^' + path + '$');
    }

* // 实现效果如下：
// /profile/:username =&gt; /profile/jacksontian, /profile/hoover
// /user.:ext =&gt; /user.xml, /user.json

* // 静态文件路径匹配，提高命中率：
app.use('/public', staticFile);
```

#### 8.5 页面渲染
```javascript
// 模板技术

// 骨架：预览屏
```

## 第9章 玩转进程
```javascript
// I/O线程由底层libuv处理，这部分线程对于JavaScript开发者而言是透明的，只在C++扩展开发时才会关注到。JavaScript代码永远运行在V8上，是单线程的
// Node提供了child_process模块，并且也提供了child_process.fork()函数供我们实现进程的复制: 一核一进程
// 进程间通信技术:命名管道、匿名管道、socket、信号量、共享内存、消息队列、Domain Socket等。
    // Node中实现IPC通道的是管道（pipe）技术
```

#### 9.4 cluster模块

## 第10章 测试
```javascript
// 单元测试与性能测试
```

## 第11章 产品化
```javascript
// 工程化、架构、容灾备份、部署和运维
```

#### 11.1 项目工程化
```javascript
// 在项目工程化过程中，最基本的几步是目录结构、构建工具、编码规范和代码审查等
// 在Web应用中，通常也会在Makefile文件中编写一些构建任务(shell 脚本)来帮助项目提升效率，比如静态文件的合并编译、应用打包、运行测试、清理目录、扫描代码等
// 现在：webpack
```

#### 11.2 部署流程
```javascript
// 预发布环境与普通的测试环境的差别在于它的数据较为接近线上真实的数据。我们将普通测试环境称为stage环境，预发布环境称为pre-release环境，实际的生产环境称为product环境
```

```bash
# 为了能让进程持续执行，我们可能会用到nohup和&以不挂断进程的方式执行
    #! /bin/sh
    DIR=`pwd`
    NODE=`which node`
    # get action
    ACTION=$1

    # help
    usage() {
        echo "Usage: ./appctl.sh {start|stop|restart}"
        exit 1;
    }

    get_pid() {
        if [ -f ./run/app.pid ]; then
        echo `cat ./run/app.pid`
        fi
    }

    # start app
    start() {
        pid=`get_pid`

        if [ ! -z $pid ]; then
        echo 'server is already running'
        else
        $NODE $DIR/app.js 2&gt;&amp;1 &amp;
        echo 'server is running'
        fi
    }

    # stop app
    stop() {
        pid=`get_pid`
        if [ -z $pid ]; then
        echo 'server not running'
        else
        echo "server is stopping ..."
        kill -15 $pid
        echo "server stopped ! "
        fi
    }
    restart() {
        stop
        sleep 0.5
        echo =====
        start
    }

    case "$ACTION" in
        start)
        start
        ;;
        stop)
        stop
        ;;
        restart)
        restart
        ;;
        *)
        usage
        ;;
    esac
```

#### 11.3 性能

#### 11.4 日志

#### 11.5 监控报警

#### 11.6 稳定性