// https://www.npmjs.com/package/progress
var ProgressBar = require('progress');
// total 数量
var bar = new ProgressBar(':bar', { total: 10 });
var timer = setInterval(function() {
    bar.tick(); // 进度+1
    if (bar.complete) {
        console.log('\ncomplete\n');
        clearInterval(timer);
    }
}, 100);