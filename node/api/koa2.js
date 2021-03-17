const Koa = require('koa'); // 类
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async(ctx, next) => {
    // ctx.response, .request, next为下一个异步函数
    // bodyParser()中间件将参数绑定在ctx.request.body 
    await next();
    // Content-Type
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
})
app.listen(3000);
console.log('app started at port 3000');

// middle处理链
app.use(async(ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async(ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async(ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// koa2 将 router 封装
const router = require('koa-router')(); // 注意是函数
// add url-route:
router.get('/hello/:name', async(ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async(ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});
// add router middleware:
app.use(router.routes());