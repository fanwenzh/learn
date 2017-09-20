### 基本:
a#i.c(href="baidu.com") 百度 => <a id="i" class="c" href="baidu.com">百度</a>

### js: - + 缩进的js代码
- var authenticated = true
body(class=authenticated ? 'authed' : 'anon' checked) => <body class="authed" checked></body>

### boolean: 要进行&&判断映射'checked'值
input(type='checkbox' checked=true && 'checked') => <input type="checkbox" checked="checked">

### 样式属性
a(style={color: 'red', background: 'green'}) => <a style="color:red;background:green;"></a>

### 类属性
- var classes = ['foo', 'bar', 'baz']
a(class=classes) => <a class="foo bar baz"></a>
a.bang(class=classes class=['bing']) => <a class="bang foo bar baz bing"></a> // 类名相加
映射形式：
- var currentUrl = '/about'
a(class={active: currentUrl === '/about'} href='/about') About => <a class="active" href="/about">About</a>

### &attributes 
- var attributes = {};
- attributes.class = 'baz';
div#foo(data-bar="foo")&attributes(attributes) => <div class="baz" id="foo" data-bar="foo"></div>

## 分支条件
- var friends = 10
case friends
  when 0
    - break
  when 1: p 您有一个朋友
  default
    p 您有 #{friends} 个朋友   => <p>您有 10 个朋友</p>

## 条件
- var user = { description: 'foo bar baz' }
.user
  if user.description
    h2.green 描述
  else if
  else

## 输出转义代码
p
  = '这个代码被 <转义> 了！'  => <p>这个代码被 &lt;转义&gt; 了！</p>
## 输出不转义代码(有xss跨站脚本攻击危险)
p!= '这段文字' + ' <strong>没有</strong> 被转义！=> <p>这段文字 <strong>没有</strong> 被转义！</p>

## 注释
// 输出注释
//- 不输出注释
//
  块注释
## 条件注释(同html)
<!--[if IE 8]>
<html lang="en" class="lt-ie9">
<![endif]-->

## 包含include
doctype html
html
  include includes/head.pug
  style
    include style.css
  sctipt
    include script.js

## 模板继承
// 父layout.pug 用block
html
  head
    title 我的站点 - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p 一些页脚的内容
// 子page-a.pug 用extends
extends layout.pug
block content
  .sidebar
    block sidebar
      p 什么都没有
  .primary
    block primary
      p 什么都没有
// 块添加
append

## 字符串嵌入、转义 #{}
- var msg = "not my inside voice";
- var theGreat = "<span>转义!</span>";
p 这是安全的：#{theGreat} => <p>这是安全的：&lt;span&gt;转义!&lt;/span&gt;</p> // 转义, js输出
p This is #{msg.toUpperCase()}  => <p>This is NOT MY INSIDE VOICE</p>
p 不要转义 #{'}'}！=> <p>不要转义 }！</p>
## 字符串嵌入不转义 !{}
- var riskyBusiness = "<em>我希望通过外籍教师 Peter 找一位英语笔友。</em>";
.quote
  p 李华：!{riskyBusiness}  => <p>李华：<em>我希望通过外籍教师 Peter 找一位英语笔友。</em></p>
## 嵌入标签 #[span content]
p 一个 #[strong 充满力量感的单词]，这确实让人难以 #[em 忽视] => <p>一个 <strong>充满力量感的单词</strong>，这确实让人难以 <em>忽视</em>。</p>
## 嵌入content
<p>如果用了嵌入，在 <strong>strong</strong> 和 <em>em</em> 旁的空格就会让我舒服多了。</p> =>
<p>如果我不用嵌入功能来书写，一些标签比如<strong>strong</strong>和<em>em</em>可能会产生意外的结果。</p>

## 迭代 each val, index in arr, while n < 5
each val, index in ['〇', '一', '二']
  li= index + ': ' + val 
=>
<li>0: 〇</li>
<li>1: 一</li>
<li>2: 二</li>

## 混入mixin
//- 定义
mixin list(arguments)
  ul
    li foo #{arguments[0]}
    li bar
    li baz
//- 使用
+list
+list

## 纯文本 |, .
script.
  if (usingPug)
    console.log('这是明智的选择。')
  else
    console.log('请用 Pug。')
=> 
<script>
  if (usingPug)
    console.log('这是明智的选择。')
  else
    console.log('请用 Pug。')
</script>

