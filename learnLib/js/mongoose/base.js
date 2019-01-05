// 导入数据
// mongoimport -d mtWeb -c menu pois.dat
// http://www.runoob.com/mongodb/mongodb-databases-documents-collections.html
// sql         mongodb
// table       collection   表/集合
// row         document     行/文档
// column      field        列/域
// index       index        索引
// tableJoins  不支持        表连接
// primaryKey  _id          主键

//#########################################################

// mongod --dbpath ../data/ // 打开mongodb

// 连接本地数据库
var mongoose = require('mongoose');
//"mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]"
mongoose.connect('mongodb://host1');

// 监听连接是否正确
var db = mongoose.connection;
db.on('error', () => {
    console.log("connection error");
})
db.once('open', () => {})

// 创建模式
var testSchema = mongoose.Schema({
    name: String
})

// 编译模式到模型中
var TestModel = mongoose.model('Test', testSchema);

// 用模式(类)来创建文档（实例）
var test1 = new TestModel({ name: 'test1' });
console.log(test1.name);

// 在[模型编译]之前添加方法 
testSchema.methods.speak = function() {
    console.log(this.name)
}
var TestModel = mongoose.model('Test', testSchema);
var test2 = TestModel({ name: 'test2' });
test2.speak()

// ##############################################################

// 保存数据
test2.save(function(err, kitterns) {})
TestModel.create([
    { name: 'test3' },
    { name: 'test4' }
], function(err, docs) {})

// 查询内容  [condition]: 
// $lt <, $gt >, $lte <=, $gte >=, $ne !=, $in 包含[a,b]
// $or:[] 或者, $exists [true, false]
TestModel.find({ name: /test/ }, function(err, docs) {})
TestModel.findOne({ "name": { "$lt": 6 } }, function(err, doc) {})
TestModel.findById(_id, function(err, doc) {})

// 更新
var condition = { name: 'test4' };
var update = { $set: { age: 10 } }; //
TestModel.update(condition, update, { multi: true }, function(err) {}) // multi:删除多条, 默认删除1条
TestModel.findOneAndUpdate({ID: id}, {$set: {attr: value}}, function(err, doc){})

// 删除
TestModel.remove(conditions, funciton(err) {})

// ##############################################################

// 高级查找
// find(Conditions,fields,options,callback);
// limit 限制数量
Model.find({}, null, { limit: 20 }, function(err, docs) {});
// skip 掠过前几个
Model.find({}, null, { skip: 4 }, function(err, docs) {});
// sort 排序：1升序, -1降序
Model.find({}, null, { sort: { age: -1 } }, function(err, docs) {})
    // 分页查询
Model('User').find({}).sort({ createAt: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize).populate('user')
    .exec(function(err, docs) {
        console.log(docs);
    });

//poopulate, __v 版本锁
// http: //www.nodepeixun.com/a/nodeshujuku/20170106/113.html 