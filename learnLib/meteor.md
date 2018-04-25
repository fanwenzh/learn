## meteor安装
curl https://install.meteor.com | sh

## 创建meteor应用
meteor create microscope

## 启动meteor
meteor

## 添加其他类库
meteor add twbs:bootstrap
meteor add underscore
meteor add iron:router // meteor路由包

## 插入模版
<template name="templateName"></template>
{{> templateName }}

## 模板控制流（模版语言：Spacebars）
{{#each}}{{/each}}
{{#if}}{{/if}}
{{with}}{{/with}}

## 模版钩子函数.js
```js
// 成员变量初始化：静态
var postsData = [
	{
		title: 'hi',
		url: 'hi'
	}
]
// 成员变量初始化(动态)
Template.templateName.onCreated(function templateNameOnCreated(){
	this.paramName = new ReactiveVar(0);
})
// 向模版返回参数counter的值
Template.templateName.helpers({
	counter() {return Template.instance().paramName.get();}
})

// <butten></butten>
Template.templateName.events({
	'click butten'(event, instance){
		// 实现递增
		instance.paramName.set(instance.paramName.get() + 1);
	}
})

```

## meteor在终端集成mongo
meteor mongo // 进入mongo
db.posts.insert({title: "A new post"}) // 进行数据库操作
db.posts.find();
meteor mongo myApp // 进入应用的mongo shell
meteor logs myApp // 输出应用日志

## 停止Meteor服务，清空Mongo数据库
meteor reset

## DOM变动
<div class="post"></div>

## 连接集合
// autopublish: 简单地直接把服务器上的全部数据镜像到客户端
meteor remove autopublish // 客户端连接服务端的镜像，实现动态转换

## _publishCursor()操作
.added() // 发送到客户端
.observe()  // 监控游标
.changed() // 监听服务端改变
.removed() // 删除

## 服务端sesstion 应用
Tracker.autorun() // 自动跟踪