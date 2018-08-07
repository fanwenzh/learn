var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// context: __dirname,  //默认
	// entry:[]合并打包
	entry: {
		hello: './src/script/hello.js',
		main: './src/script/main.js'
	},
	output: {
		// 另所有js文件保存在js文件夹内
		filename: 'js/[name].js',
		// webpack2 的path为绝对路径
		path: path.resolve(__dirname, './dist'),
		// 网页上线，所有src加入publicPath头
		// publicPath: 'http://www.baidu.com'
	},
	plugins: [
		new htmlWebpackPlugin({
			// 生成html文件
			filename: 'index.html',
			template: 'index.html',
			// 所有script嵌入到body标签里
			inject: false,
			// 向html传参，支持ejs语法<%= htmlWebpackPlugin.options.title %>, 如可传date
			// title: 'webpack is good'

			// npm 压缩数据
			// minify: {
			// 	// 删除注释与空格
			// 	removeComment: true,
			// 	collapseWhitespace: true
			// }
		}),
		// 生成同模版的不同页面,inline形式插入script
		new htmlWebpackPlugin({
			filename: 'a.html',
			template: 'index.html',
			inject: 'body',
			// 生成html时, chunks为读取entry的名字
			// chunks: ['main','hello'],
			//生成html时，排除某些chunks
			// excludeChunks:['']
		}),
		// 外链动态加入<script>
		new htmlWebpackPlugin({
			filename: 'b.html',
			template: 'index1.html',
			inject: false,
			// chunks: ['main','hello'],
		})
	]
};