axios
```js
// 取消请求
let CancelToken = axios.CancelToken
let source = CancelToken.source() // 生成id
axios.post(url, data, {
	cancelToken: source.token，
	onUploadProgress：(progressEvent)=>{
		this.loaded = progressEvent.loaded // 保存上传进度（记录点并不准确）
		console.log(progressEvent.total)
	}
}) 
source.cancel() // 取消请求
let fileData = this.file.slice(this.loaded+1, this.file.size) // 剪裁文件
axios.post(url, fileData, {}) // 重传

// config定义数据处理
transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

```

UMD兼容 CMD和AMD模式
```js
(function(root, factory) {
	if (type exports === object) {
		module.exports = factory() // UMD
	} else if (typeof define === 'function') {
		define(factory) // define(function(){return 'a'}) // AMD
	} else {
		window.eventUtil = factory()
	}
})(this, function(){
	return {
		// 具体模块
		addEvent: function(el, type, handle) {

		},
		removeEvent: function(el, type, hanmdle) {

		}
	}
})
```
webpack.config.js
// webpack --config ./webpack.dev.config.js
// open 打开浏览器, hot热加载, inline热加载
// webpack-dev-server --open --hot --inline --config ./webpack.dev.config.js
// babel-core, babel-loader, babel-preset-env, babel-plugin-transform-runtime
```js
const path = require('path')
module.exports = {
	entry: {
		'main':'./main.js'
	},
	output: {
		path:path.resolve('./dist') // 相对路径转绝对路径
		filename:'./build.js'
	},
	module: {
		loaders:[ // 3.0版本后为roles
			{ test: /\.css$/, loader: 'style-loader!css-loader'}, // 顺序用!
			{ test:/\.(jpg|png|gif)$/, loader:'url-loader?limit=9275'} // 参数用?，小于limit字节生成base64（约1.3倍）打包在build.js中，但是减少1次请求
			{ test:/\.js$/, loader:'babel-loader',
				exclude: /node_modules/, // 排除node_modules文件夹内文件的处理
				options: { // 对babel-loader配置方法2
				preset:['env'], // 预设环境
				plugins:['transform-runtime'] // ES6,7处理函数
			},
			{ test:/\.vue$/, loader:'vue-loader'}
		]
	},
	watch: true,
	// 插件执行顺序
	plugins: [
		new HtmlWebpackPlugin()
	]
}

```