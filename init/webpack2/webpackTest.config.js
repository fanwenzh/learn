const path = require('path')
const Webpack=require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    js: './src/index',
    myname: './src/1'
  },
  output: {
    path: path.resolve('dest'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babael-loader',
          options: {
            preset: ['env']
          }
        }},
      { test: /\.css$/, use: 'css-loader'}
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    require('autoprefixer')
  ],
  devServer: {
    contentBase:          pathlib.resolve('static'),
    port:                 8090,
    hot:                  true,
    historyApiFallback:   true // 所有访问定位到index
  }
}