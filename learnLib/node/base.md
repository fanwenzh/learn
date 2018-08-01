## koa
```js
app.use(rerquire('koa-static')('./public', {
	setHeaders: function(res, path, stats) {
		// 相比express需要自己添加文件大小头
		if (path.endsWith('.mp3')) {
			let size = stats.size
			res.setHeaders('Accept-Ranges', 'bytes')
			res.setHeaders('Content-Ranges', 'bytes 0-' + (size-1) + '/' + size)
		}
	}
}))