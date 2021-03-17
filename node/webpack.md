## webpack基础
```js
// webpack安装
// cnpm i webpack wepack-cli -D
// cnpm i webpack-dev-server -D

// webpack进行0配置
// 打包工具. 默认支持js模块化
 
 // 手动配置webpack.config.js // 默认
 // npm webpack --config webpack.config.my.js // 自定义 
 // npm webpack -- --config  webpack.config.my.js // 配置运行package.json中指令的参数文件

// js嵌入html
HtmlWebpackPlugin
// css嵌入html中成为style标签
style-loader, css-loader, 
// 单独抽离css
mini-css-extract-plugin
// 自动添加前缀
postcss-loader autoprefixer
// 压缩css
optimize-css-assets-webpack-plugin
mini-css-extract-plugin

// 处理js模块
// 转换es6
babel-loader @babel/core @babel/preset-env
// 运用提案语法
@babel/plugin-proposal-class-properties
// 运用装饰器
@babel/plugin-proposal-decorators
// 优化js（重命名）
uglifyjs-webpack-plugin

// 暴露全局loader（window.）
1)expose-loader
import $ from 'expose-loader?$!jquery'
// or webpack配置
// 2) webpack.providePlugin
// 3) html引入, webpack不打包: externals

// 打包图片
// 1) js中创建图片引入
import logo from './logo.png'
let img = new Image()
img.src = logo
document.body.appendChild(img)
// 2） 在css中引入background
import './a.css'
background: url('./logo.png')
// 3) <img src="">
html-withimg-loader
url-loader

// 源码映射
devtool: 'source-map' // 生成source-map文件, 显示出错行列
// eval-source-map // 不生成source-map 显示出错行列
// cheap-module-source-map // 不会产生行列, 单记录出错map
// cheap-module-eval-source-map // 不会产生文件、出错行列, 继承在打包后的文件中

// 实时打包
watch: true
watchOptions: {
      poll: 1000, // 每秒查询1000次
    aggreatement:500, // 防抖, 500毫秒输入间隔
    ignored: /node_modules/ // 不需要监控
}

// 插件
clean-webpack-plugin
copy-webpack-plugin
bannerPlugin // 内置

// 代理
devServer
// 服务端中间件
webpack-dev-middleware
// 扩展第三方包
resolve

// 定义环境变量
new webpack.DefinePlugin({DEV: JSON.stringify('dev')})
// 区分不同环境
webpack-merge
npm run build -- --config webpack.dev.js

// webpack优化
noParse: /jquery/
exclude: /node_modules/
include: path.resolve('./src')
// 优化第三方内置包
new webpack.IgnorePlugin(/\.\/locale/, /moment/)
// 手动引入所需要的包
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 抽取公用代码
 opttimization: {
   splitChunks: { // 分割代码块
     cacheGroups: {
       common: {
         chunks: 'initial',
         minSize: 0,   // 大于0k
         minChunks: 2, // 使用过2次以上
       }
     },
     verdor: {
       priority: 1, // 优先顺序
       test: /node_modules/, // 抽离第三方模块
       chunks: 'initial',
       minSize: 0,
       minChunks: 2
     }
   }
 }

// 语法动态导入(vue、react懒加载)
// @babel/plugin-syntax-dynamic-import
import('./source').then(data=>{
  console.log(data.default)
})

// 热更新
devServer: {hot: true}
webpack.NamedModulesPlugin() // 打印更新的模块名字
webpack.HotModuleReplacementPlugin()
```
## webpack实现
```javascript
// tapable

```