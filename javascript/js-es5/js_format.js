// js 定义接口三种方式
// 1. 注释描述的方式
/**
 * interface Composite {
 *   function add(obj)
 *   function remove(obj)
 *   function update(obj)
 * }
 */
// CompositeClass implements Composite
var CompositeClass = function () {}
CompositeClass.prototype.add = function () {}
CompositeClass.prototype.remove = function () {}
CompositeClass.prototype.update = function () {}
var c1 = new CompositeClass()

// 2.属性检测的方式（区别注释描述方式）
/**
 * interface Composite {
 *   function add(obj)
 *   function remove(obj)
 *   function update(obj)
 * }
 */
// CompositeClass implements Composite
var CompositeClass = function () {
}
// 定义接口名字数组
CompositeClass.prototype.implementsInterfaces = ['Composite', 'FormItem']
// 检测compositeImp类的对象
function checkCompositeClass (instance) {
  // 判断当前对象是否实现了所有的接口
  if (!isImplements(instance)) {
    throw new Error(err)
  }
}
// 公用的具体检测方法, 返回boolean
function isImplements (object) {
  let inter = object.implementsInterfaces
  for (var i = 0; i < inter.length; i++) {
    // !obj[inter[i]] instanceof function
    if (obj[inter[i]] === null) {
      return false
    }
  }
  return true
}

// 3. 鸭式变形接口
// 面向对象并实现接口里的所有方法(检测方法)
// 创建接口类
var Interface = function (name, methods) {
  this.name = name;
  this.method = methods;
}
var Duck = new Interface('Duck', ['swim', 'cry', 'foots'])
// 定义接口检测方法
Interface.ensureImplements = function (obj, interface) {
  var canNotFoundMethods = [];    
  for(var i = 0, len = interface.method.length; i < len; i++) {
      //检测对象有没有接口中所有方法
      if(!interface.method[i] || typeof obj[interface.method[i]] !== 'function') {
          canNotFoundMethods.push(interface.method[i]);
      }
  }
  if(canNotFoundMethods.length){
       throw new Error(obj.name+'实例对象没有实现'+interface.name+'接口');
  }else{
      console.log(obj.name+'实例对象已经实现'+interface.name+'接口');
  }
}
// 创建实例
var duck = function (){ this.name = 'duck'; }
duck.prototype = {    
    'swim': function (){},
    'cry': function (){},
    'foots': function (){},
}
var _new_duck = new duck();
// 进行检测
Interface.ensureImplements(_new_duck, Duck); 

// 单例模式
// 1.简单单例模式
var single = {}
single.scope = {
  attr: "1"
}
// 2.闭包单例模式
single.scope = (function() {
  // 私有变量
  var fun1 = function(){}
  return {
    attr: "1",
    fun: function(){
      fun1()
    }
  }
})()
// 3.惰性单例模式
single.scope = (function(){
  // 私有变量控制返回的单体对象
  var uniqInstance;
  function init () {
    var a1 = 1
    return {
      attr1: a1
    }
  }
  return {
    getInstance: function () {
      // 如果不存在，创建单体实例
      if (!uniqInstance) {
        uniqInstance = init()
      }
      return uniqInstance
    }
  }
})
// 确保实例只存在一个(调用同一实例)
var instance = single.scope.getInstance()
console.log(instance.attr1)
// 4.分支单例 (判断程序的分支<浏览器差异的检测>)
var Ext = {}
var def = true
Ext.More = (function () {
  var objA = { // 火狐浏览器
    // 属性及方法
  }
  var objB = { // IE浏览器
    // 属性及方法
  }
  return (def) ? objA : objB;
})() 

// jq
(function (window) {
  function _$(argument){}
  _$.onReady = function(fn){
    // 实现链式编程方法
    Function.prototype.method = function(methodName, fn) {
      this.prototype[methodName] = fn
      return this
    }
    // 1. 在window上实例化注册对象
    window.$ = function () {
      return new _$(arguments)
    }
    // 2、 执行传入的代码
    fn ();
    // 3、 链式代码
  }
})(window);

// 复杂工厂模式
// 抽象类
function CarShop() {}
CarShop.prototype = {
  constructor: CarShop,
  sellCar: function (type) {
    this.abstractSellCar(type)
  },
  abstractSellCar: function() {
    throw new Error('this method is abstract...')
  }
}
// 子类
function BenzCarShop() {} // CarShop.call(this)
BenzCarShop.prototype = {
  constructor: BenzCarShop,
  // 重写sellCar的function
  sellCar: function(type) {
    var car = CarFactor.createCar(type)
    return car
  }
}
// car 工厂
var CarFactory = {
  createCar: function (type) {
    var car = eval('new ' + type + '()')
    Interface.ensureImplements(car, CarInterface)
    return car;
  }
}

// classic
// $(function(){
//   // 1、前台业务逻辑
//   var i = document.getElementById('input')
//   i.addEventListener('click', sendReq)
//   // 2、后台业务逻辑
//   function sendReq() {
//     // ajax请求
//   }
// })
// 桥接模式（暴露内部接口）: 主要作用把抽象和现实分离开，使他们完全独立
$(function() {
  // 1、前台业务逻辑
  var i = document.getElementById('input', bridgeHandler);
  // 桥模式分离: 降低耦合性
  function bridgeHandler() {
    var msg = this.value
    sendReq(msg)
  }
  //  2、后台逻辑
  function sendReq(msg) {
    console.log('发送后台数据' + msg)
  }
})

// 享元模式
// 划分私有(闭包or私有实现), 公有变量(prototype)
// 优化重复的代码

// 发布订阅者模式（观察者模式）
var Publish = function(name) {
  this.name = name
  // 记录所有的订阅者
  this.subscribers = []
}
// Publish类的实例对象发布消息
Publish.prototype.deliver = function (news) {
  var publish = this
  this.subscribers.forEach(function(fn) {
    fn(publish, news) // 把新消息发布给订阅者
  })
  return this // 链式编程
} 

// 订阅者属于方法类
// (具体订阅实例的)订阅者订阅的方法
Function.prototype.subscribe = function(publish) {
  var sub = this
  // for循环即可
  // some: 其中一个返回true， 整体返回true
  var alreadyExists = publish.subscribers.some(function(item) {
    return item === sub
  })
  if(!alreadyExists) {
    publish.subscribers.push(this)
  }
  return this
}
// (具体订阅实例的) 订阅者取消订阅的方法
Function.prototype.unsubscribe = function(publish) {
  var sub = this
  // 或splice(index, 1)
  pubslih.subscribers = pubslih.subscribers.filter(function(item){
    return item !== sub
  })
  return this
}

// 命令模式：封装方法调用的方式
// 用于消除调用操作的对象和实现操作的对象之间的耦合
// 用命令类中间层保存命令方法的封装，简化执行方法
function MakeStart(obj) {
  return function() {
    obj.start()
  }
}
function MakeStop(obj) {
  return function() {
    obj.stop()
  }
}
var startCommand = new MakeStart(obj)
startCommand()
var stopCommand = new MakeStop(obj)
stopCommand()