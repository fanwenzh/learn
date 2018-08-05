const router = require('koa-router')
let r1 = new router()

r1.get('a', async ctx=>{
  // ctx.response.body = '123'
  let d = await ctx.db.execute(`
    SELECT A.ID, A.content AS content FROM
    answer AS A
  `)
  // LEFT JOIN answer_table AS ANSWER ON Q.best_answer_ID = ANSWER.ID
  // LEFT JOIN author_table AS AUTHOR ON ANSWER.author_ID = AUTHOR.ID
  // LIMIT ${ (page - 1) * page_size }, ${ page_size }
  // d = JSON.parse(JSON.stringify(d[0]))
  await ctx.render('index', {arr: [1,2,3], b:d[0]}) // 返回查询结果[数组]
})

r1.post('upload', async ctx => {
  // ctx.request.body
  // let file = ctx.request.files[0]
  // let fileSaveName = file.path.slice(file.path.lastIndexOf('/') + 1)
  ctx.redirect('/a')
})


module.exports = r1.routes()