var cheerio = require('cheerio');
var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
var agent = superagent.agent();
var querystring = require('querystring');
var Q = require('q');

var mainUrl = 'http://ecampus.sysu.edu.cn/zsuyy/application/main.jsp';
var loginUrl = 'https://cas.sysu.edu.cn/cas/login?service=http://ecampus.sysu.edu.cn/zsuyy/login.jsp';
var stdInfoUrl = 'http://ecampus.sysu.edu.cn/zsuyy/yanyuan/xj/studentmng.do?method=getUpdateStudentView&primeid=2016082516214244';
var scoreUrl = 'http://ecampus.sysu.edu.cn/zsuyy/yanyuan/py/pychengji.do?method=enterChaxun';
var lessonUrl = 'http://ecampus.sysu.edu.cn/zsuyy/yanyuan/py/pyjxjh.do?method=enter';
var selectLessonUrl = 'http://ecampus.sysu.edu.cn/zsuyy/yanyuan/py/pyjxjh.do?method=stdInitEnterElectivePage&type=pyfa';
var postLessonInfo = 'http://ecampus.sysu.edu.cn/zsuyy/yanyuan/py/pyjxjh.do?method=initXuanKeFrame';
var pyfaLessonUrl = 'http://ecampus.sysu.edu.cn/zsuyy/yanyuan/py/pyjxjh.do?method=initXuanKe&type=pyfa';

var index = function(req, res, error) {
    console.log('index: ' + req.sessionID);
    res.render('signin',{error:error});
};

var signin = function(req, res, next){
    console.log('signin: '+ req.sessionID);
    let form = req.body;
    getForm(form)
        .then(loginSuccess)
        .then(function(){
            //成功登陆
            getStdInfo(req, res).then(function(data) {
                    console.log('stdInfo： ' + req.sessionID);
                    res.render('stdInfo', data);
                });
        },function(){
            //登陆失败
            res.render('signin', {error:true});
        });
};

var getForm = function(form){
    var defer = Q.defer();
    agent.get(loginUrl)
        .end(function(err, src) {
            let $ = cheerio.load(src.text);
            var hidden = $('#fm1').children('section').eq(2).children('input');
            var stdInfoform = {
                username: form.username,
                password: form.password,
                lt: hidden.eq(0).val(),
                execution: hidden.eq(1).val(),
                _eventId: hidden.eq(2).val(),
                submit: '登录'
            };
            defer.resolve(stdInfoform);
        });
    return defer.promise;
};

var loginSuccess = function(form){
    let defer = Q.defer();
    agent.post(loginUrl)
        .send(querystring.stringify(form))
        .end(function (err, res){
           if(res.request.url === mainUrl){
               defer.resolve(true);
           }
           else {
               defer.reject(false);
           }
        });
    return defer.promise;
};

var getStdInfo = function(req, res) {
    let defer = Q.defer();
    agent.get(stdInfoUrl)
        .charset('gbk')
        .end(function (err, getRes) {
            let $ = cheerio.load(getRes.text);
            var trs = $('.tab_5');
            var table = {
                username:delTab(trs.eq(1).children('td').eq(3).text()),
                usernamePY:delTab(trs.eq(2).children('td').eq(1).text()),
                sid:delTab(trs.eq(0).children('td').eq(1).text()),
                sex:delTab(trs.eq(3).children('td').eq(3).text())
            };
            defer.resolve(table);
        });
    return defer.promise;
};

function delTab(str){
    str = str.replace(/\s/g, '');
    return str;
}


var getLessonInfo =function(req, res) {
    console.log('lesson： ' + req.sessionID);
    agent.get(lessonUrl)
        .charset('gbk')
        .end(function (err, getRes) {
            res.setHeader('Content-Type', 'text/html; charset=utf8');
            res.end(getRes.text);
        });
};

var getStdScore = function (req, res) {
    console.log('score： ' + req.sessionID);
    agent.get(scoreUrl)
        .charset('gbk')
        .end(function (err, getRes) {
            res.setHeader('Content-Type', 'text/html; charset=utf8');
            res.end(getRes.text);
        });
};

var selectLesson = function(req, res){
    console.log('selectLesson： ' + req.sessionID);
    agent.get(pyfaLessonUrl)
        .charset('gbk')
        .end(function(err, getRes2) {
            let text = getRes2.text.replace('text/html; charset=GBK', 'text/html; charset=utf8')
            res.end(text);
        });
    // agent.get(selectLessonUrl)
    //     .charset('gbk')
    //     .end(function(err, getRes){
    //         // let form ={
    //         //     type : 'pyfa',
    //         //     departmentIdQuery:"",
    //         //     kcdmQuery:"",
    //         //     kcmcQuery:""
    //         // }
    //         // agent.post(postLessonInfo)
    //         //     .send(querystring.stringify(form))
    //         //     .end(function(err, getRes1){
    //         //         agent.get(t)
    //         //             .charset('gbk')
    //         //             .end(function(err, getRes2) {
    //         //                 console.log(getRes2.text);
    //         //                 res.setHeader('Content-Type', 'text/html; charset=GBK');
    //         //                 res.end(getRes2.text);
    //         //             });
    //         //     });
    //         agent.get(t)
    //             .charset('gbk')
    //             .end(function(err, getRes2) {
    //                 console.log(getRes2.text);
    //                 res.setHeader('Content-Type', 'text/html; charset=GBK');
    //                 res.end(getRes2.text);
    //             });
    //     });
};

var signout = function(req, res){

}

module.exports = {
    index:index,
    signin:signin,
    signout:signout,
    getLessonInfo:getLessonInfo,
    getStdInfo:getStdInfo,
    getStdScore:getStdScore,
    selectLesson:selectLesson
};

