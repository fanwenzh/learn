## 优化关键渲染路径
### 1. 浏览器渲染过程
简图:
     js
dom -> cssom -> renderTree -> layout -> paint
dom: charactors(字符) -> tokens(便签) -> node -> dom // Timeline 禁用缓存
```js
// perfromance录制时需注意
// 1. 禁用缓存，以便测试首次浏览器性能 
// 2. 关闭chrome扩展或使用隐身模式 // 无痕模式 shift + command + n  
// 3. 模拟真实网络情况
// 4. Chrome canary (Chrome 测试版)

// FPS frame persecond
// TTFB: application center test // 获取在接收到响应的手字节花费的毫秒数

// 渲染流程对应chrome流程
// 构建dom: parse HTML（增量过程: 从上往下边加载边渲染）
// 构建cssom: parse stylesheet（增量构建，非增量渲染）
// 等待dom和cssom完成后再构建renderTree
// 构建renderTree: Recalculate Style
// layout: layout cpu主要影响性能，所以动画用transform硬件加速, GPU完成
// paint： 填充细节
```
cssom: css Object model
```js
// css匹配性能, 从后往前匹配, 通常不是开发瓶颈(chrome查看)
// 选择器越复杂，匹配用的事件越多
```
render Tree  
1. 包含了渲染网页所需的所有结点  
2. 无需渲染的节点不会被添加到renderTree中, 如<head>, display: none的节点  

### 2. 资源对渲染的影响 (资源: css, js, font, img)
css资源
```js
// <style> /* */ </style>
// <link rel="stylesheet" href="index.css">
通过以上两种方式定义的css均会阻塞初测渲染
浏览器会在解析完css后再进行渲染，放置样式突变带来的抖动
不管css出现在文档中的哪个位置， 都会阻塞整个文档的初次渲染
通过Link标签引入的css阻塞事件可能更长，因为加载它需要网络传输来回时间
```
防止非关键资源（初次渲染的资源）阻塞渲染
```js
  1. 根据不同媒体拆分css文件， 并为link标签添加媒体查询。
  // <link rel="stylesheet" href="index_print.css" media="print"> // 根据需求屏幕，【会阻塞】
  2. 动态添加css
  // 1、通过document.write添加link: chrome查看仍【会阻塞】
  // <script>document.write('<link rel="stylesheet" href="index_print.css">')</script>
  // 2、通过dom API 添加link: chrome出现强烈抖动，【不会阻塞】初次渲染
  var style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = 'index.css'
  document.head.appendChild(style);
  // 3、preload. ie11，【不会阻塞】初次渲染
  // <link rel="preload" href="index_print.css" as="style" onload="this.rel='stylesheet'">
  // rel不是stylesheet,因此不会阻塞渲染。preload是resoure hint规范中定义的一个功能，resource hint 通过告知浏览器提前简历连接或加载资源，以提高资源加载的速度，浏览器遇到标记为preload的Link时，会开始加载它。当onload时间发生时，将rel改为stylesheet，即可应用此样式
  // 4、loadcss.js 不会阻塞】初次渲染
  // css replad polyfill。原理: dom api 插入样式
```
js资源
<!-- inline js -->
<script> /* app logics here */ </script>
<!-- external js -->
<script src="somescript.js"></script>
  1. 通过以上两种方式引入Js均会阻塞Html parse, 因而辉阻塞出现在脚本后面的Hmlt标签的渲染
  2. 外部script阻塞的事件一般更长，可能包含了一个网络来回的时间
  3. javascript可以通过document.write修改html文档流，因此在执行js时，浏览器会暂停解析dom的工作
  4. 通过以上方式引入的js均会被css阻塞，因为js可能会读取或修改cssom，因此需要等待cssom构造完成后才执行js
  preload:当hmtl parser 被脚本阻塞时，parser虽然会停止构建dom, 但仍会识别该脚本后面的资源，并提前加载，所有script的src会同时加载（浏览器优化）
避免js阻塞
```js
// 1. 将资源放到Body底部，延迟加载
// 2. js使用defer延迟脚本加载(推迟至整个hmtl文档解析完成后，按script便签[顺序]执行)
// 使用defer可以提早脚本资源的加载，由于html parser 是增量解析Hmtl文档的，因此脚本放在head中，可以提早浏览器对脚本资源的加载
// 3.使用async异步加载脚本(如果操纵dom要监听dom的ready事件保证dom已渲染完成)
  使用async属性时，该脚本不会再阻塞Hmtl parser, 且不会被css阻塞
  脚本只要加载完成，便可开始执行
  被async的脚本，在执行时[不会]严格按照在hmtl文档中出现的顺序执行
  async适用于无依赖的独立脚本
```
字体资源
浏览器为了避免FOUT(Flash Of Unstyled Text), 会尽量等待字体加载完成后，再显示应用该字体的内容
只有当字体加载超过一定时间仍未加载成功时，浏览器才会降级使用系统字体。每个浏览器都规定了自己的超时时间
所以在渲染页面时，会出现内容无法尽快被显示导致空白FOIT（Flash Of Invisible Text）
```css
<!-- Google 自定义字体 -->
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">  
<style type="text/css" media="screen, print>
  @font-face {
    font-family: "Bitstream vera serif bold";
    src: url("http://1.ttf");
  }
  body { font-family: "Bitstream vera serif bold", self }
</style> 
```
避免方法：异步加载css文件
```js
1. preload
在渲染新加载的css字体时仍会出现短暂的白屏
2. fontfaceobserver
动态的js加载，加载完成后再替换字体
```
图片资源, [不会阻塞] 首次渲染

## 优化关键渲染路径
优化目标
  关键资源数 - 延迟或异步加载资源，从而减少关键资源数量
  关键资源体积 - 减少资源大小
  关键资源网络来回数 - 针对关键资源减少网络请求时间
  
绘制关键资源路径

1. 启用http2, 无需内联资源（使用http2，服务器会主动推送主页所依赖的资源，保存在客户端浏览器中，避免多次http请求）
```js
<!-- 内联index.css -->
<style> /* styles */ </style>
<link rel="prefetch" href="index.css">
```
2. 结合内联和缓存
  当用户首次访问时，返回内联资源，并通过prefetch, 请求并缓存资源
  在用户首次访问时，通过cookie标识用户已加载缓存
  当下次访问时，若cookie标识已缓存过，则只返回外部资源标记（标签）
  缓存策略可灵活选择

## 资源及网络优化
减少内容大小
  避免返回无用内容
  针对特定语言的源码压缩
  通用文本压缩
  图片压缩
减少请求来回时间
  服务器优化
    chunked encoding
    尽早返回数据
    服务端渲染
  合理利用缓存
    CacheControl
    ETag
    localStorage
    Service worker
  优化网络
    HTTP 2.0
    CDN
    域名分割 // 同一域名并行下载数一定，如360为8
    减少重定向
    resource-hint

http://t.75team.com/video/play?id=65_260_2017032010370819aadb47-c79c-4d63-afd4-df0b42eaee48