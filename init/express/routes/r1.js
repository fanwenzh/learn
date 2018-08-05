const express = require('express')
const router = express.Router()
const config = require('../config')

const multer = require('multer')
// 生成序列号文件名
const upload = multer({ dest: config.uploadDir })
// 通过 filename 属性定制文件名
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, config.uploadDir);    // 保存的路径，备注：需要自己创建
//   },
//   filename: function (req, file, cb) {
//     // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
//     cb(null, file.fieldname + '-' + Date.now());
//   }
// });
// const upload = multer({ storage: storage })

// https://npm.taobao.org/package/mysql
router.get(['', 'index'], function(req, res, next) {
  req.db.beginTransaction(function(err) {
    req.db.query(`
      SELECT A.ID, A.content AS content FROM
      answer AS A
    `, function(err, data, field){
        if(err) {
          console.log('error', e)
          res.send('查询错误')
        } else {
          res.render('index', { arr: [1, 2, 3], b:data[0] })
        }
    })
  })
})

// 区分多文件和单文件提交
router.post('/upload1', upload.single('file'), function (req, res, next) {
  let file = req.file
  console.log(file)
  // console.log(file.mimetype, file.originalname, file.path)
  res.redirect('/')
})
// upload.single('filename'), upload.array('filename', fileNumber)
router.post('/upload2', upload.array('file', 1), function(req, res, next){
  let file = req.files
  res.redirect('/')
})

module.exports = router