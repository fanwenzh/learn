const router = require('koa-router')
let r1 = new router()

r1.get('', async ctx=>{
  await ctx.render('list', {
    testVal: 1
  })
})
module.exports = r1