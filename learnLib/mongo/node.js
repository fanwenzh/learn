const MongoClient=require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:512', (err, client)=>{
  if(err) console.log('连接失败', err)
  else {
    let db = client.db('hi') // 集合名称
    let res = db.collection('user').find() // user 集合名称

    res.toErray((err, datas) => {
      if (err) {
        console.log('查询错误', err)
      } eles {
        console.log(datas)
      }
    })

    db.collection('user').insertMany([
      {name: 1, age: 1},
      {name: 2, age: 2}
    ], (err, result)=> {
      if(err) console.log('插入错误',err)
      else 
        console.log(result)
    })
  }
})