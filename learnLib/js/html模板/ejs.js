const ejs = require('ejs')

ejs.renderFile('./ejs/1.html', {
  a:12,
  b:5,
  str1: 'asd',
  str2: '<li></li>',
  arr: [1,2,3,4]
}).then(data=>{
  console.log(data)
}, err=>{
  console.log(err)
})