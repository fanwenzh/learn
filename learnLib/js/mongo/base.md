bin/
  mongod 服务端
  mongo  客户端

// --------------------------------------------------------------------------------

MongoDB——JS
  mongof -help
  服务器启动选项
    * --port            端口
  --bind_ip         IP地址
  --maxConns        最大连接数

  * --logpath         日志地址
  * --logappend       追加日志

  * --pidfilepath     pid文件地址(启动判定)
  * --noauth          不校验身份
  --httpinterface   http接口——让web页面直接操作数据库
  --rest            RESTful接口(必须先开http)

  --noscripting     关闭脚本支持
  --notablescan     提升性能

  注册成服务
  * --install         安装为服务
  --remove          卸载服务
  --reinstall       重装应用

  * --serviceName     服务名——给系统看
  * --serviceDisplayName  设置服务显示的名字
  --serviceDescription  描述

  分布式
  --master          主节点模式
  --slave           从节点模式
  --source          主节点地址   ip: port
  --keyFile         认证文件

  安全性
  --sslMode         加密模式
  --sslPEMKeyFile   PEM文件地址

  存储
    * --dbpath          数据位置
  --directoryperdb  每个库单独一个文件夹
  --noprealloc      禁止预分配
  --nssize          默认新数据库大小
  --quota           大小限制

  管理命令
  --upgrade
  --repair

// --------------------------------------------------------------------------------

  mongod
  #服务基础
  --port 5127

  #安装服务
  --install --serviceName mongo_5127--serviceDisplayName mongodb--serviceDescription "这是一个mongodb服务"

  #日志文件
  --logpath / Users / fwz / Downloads / mongo / log--logappend

  #单例启动
  --pidfilepath / Users / fwz / Downloads / mongo / pid

  #危险
  --noauth --httpinterface --rest

  #数据存储
  --dbpath / Users / fwz / Downloads / mongo / data / --directoryperdb

// --------------------------------------------------------------------------------

  mongod --port 5127 --install--serviceName mongo_5127--serviceDisplayName mongodb--serviceDescription "这是一个mongodb服务" --logpath /Users/fwz/Downloads/mongo/ log--logappend--pidfilepath /Users/fwz/Downloads/mongo/pid --noauth --httpinterface --rest --dbpath /Users/fwz/Downloads/mongo/data/ --directoryperdb

// --------------------------------------------------------------------------------

客户端：
mongo localhost:port // 连接服务
use databaseName // 使用database
集合: 类数组

操作:
添加
db.集合.insert({xxx})
  .insertOne({xxx})
  .insertMany([{xxx}, {xxx}, ...])

  *直接存储数组、json
  *同一个集合之内的数据，结构可以不同

查找
db.集合.find()
  .find({条件})
  相等
    .find({name: xxx, age: 25})     与的关系
  大于
    .find({age: {$gt: 10, $lt: 200}})
  或者
    .find({$or: [{age: {$lt: 8}}, {age: {$gt: 80}}]})

修改
db.集合.updateOne
  db.集合.updateOne(条件, 新值)
  db.集合.updateMany(条件, 新值)
  db.集合.updateOne({name: fwz}, [$set: {age: 18}])

删除
  db.集合.deleteMany(条件)
  db.集合.deleteOne(条件)