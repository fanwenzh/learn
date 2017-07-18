consot path = require('path');
path.basename(path[, ext]) //获取文件名
path.join(__dirname, './../chajian')
path.delimiter // 获取操作系统分隔符
process.env.PATH.split(path.delimiter);
path.dirname() // 获取目录名
path.extname(path) //获取扩展名，包含.
path.parse('/home/user/dir/file.txt'); // 路径解析为对象
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
path.format() // path.parse的反操作
path.isAbsolute() // 判断是否绝对路径
path.normalize() // 根据当前系统，常规化路径 
path.relative(from, to) // to相对于from的相对路径
path.resolve(__dirname, '/user/', '../../fwz') // 若成员为父路径， 跳转再拼接， 否则拼接
path.join(); // url拼接

path.sep
    // path.win32
    // 允许在任意操作系统上使用windows的方式操作路径
    // path.posix
    // 允许在任意操作系统上使用Linux的方式操作路径