var express = require('express');
var router = express.Router();
var api = require('./api');

var stdInfoform = {};

/* GET home page. */
router.get('/', api.index);

router.post('/signin', api.signin);

router.get('/signout', api.signout);

router.get('/LessonInfo', api.getLessonInfo);

router.get('/stdScore', api.getStdScore);

router.get('/selectLesson', api.selectLesson);

module.exports = router;
