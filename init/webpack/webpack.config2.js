var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {
	context: __dirname,
	entry: {
		app: './src/app.js',
	},
	output: {
		path: path.resolve( __dirname, './dist'),
		filename: 'js/[name].boudle.js'
	},
	// resolveLoader: {
 //    	moduleExtensions: ['-loader']
 // 	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, './node_modules/'),
				include: path.resolve(__dirname, './src/'),
				query: {
					// 转换es15 - es17
					presets: ['latest']
				}
			},
			{
				test: /\.html$/,
				// 不添加html-loader默认解析ejs
				// 要添加ejs-loader解析html里的ejs代码···尚未解决？
				loader: 'html-loader'
			},
			{
				test: /\.tpl/,
				loader: 'ejs-loader'
			},
			{
				test: /\.css$/,
				// 从右到左执行 或 loaders: [...],
				loader: 'style-loader!css-loader!postcss-loader'
				// 在css-loader前用1个loader(postcss-loader)处理导入的文件
				// loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
			},
			{
				test: '/\.less$/',
				// less文件处理不用添加？importLoaders=1
				loader: 'style!css!postcss!less'
			},

			{
				test: /\.(png|jpg|svg|png)$/i,
				loaders: [
					'url-loader?limit=10000&name=assets/[name]-[hash:5].[ext]',
					'image-webpack-loader'
				]
				// loader: 'url-loader',
				// query: {
				// 	limit: 10000,
				// 	// 设置打包文件名字的同时配置保存路径assets目录下
				// 	name: 'assets/[name] - [hash:5].ext'
				// }
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index1.html',
			template: 'index1.html',
			inject: false
		})
	],
}