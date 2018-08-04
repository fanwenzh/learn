module.exports = server=> {
  server.use(handler)
}

async function handler(ctx, next) {
  try {
    next()
  } catch (e) {
    console.log('全局catch Error')
    ctx.body='服务器正在维护中，请稍后访问'
  }
}