const pug = require('pug');

console.log(pug.renderFile('./pug/1.pug', {
  pretty: true, // 美化
  name: 'blue', // 传递属性
  a: 12, b: 5,
  arr: [1, 2, 3, 4, 5]
}));