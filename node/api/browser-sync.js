const browserSync = require("browser-sync");

// 通过browsersync创建一个文件服务器
browserSync({
    notify: false,
    server: path.dirname(target), // 网站根目录
    index: indexpath // 默认文档：（如果浏览器访问一个目录的话，默认返回那个文件）
});

// 监视文件变化
fs.watchFile(target, { interval: 200 }, (curr, prev) => {
    // 一旦文件变化，触发该函数

    // 判断文件到底有没有变化， 减少不必要的转换
    if (curr.mtime === prev.mtime) {
        return false;
    }
})