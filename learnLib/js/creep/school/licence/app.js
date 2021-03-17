var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');
var eventproxy = require('eventproxy');
var async = require('async');

var app = express();
var nodeUrl = 'https://cnodejs.org/';

app.get('/', function(req, res, next){
	superagent.get(nodeUrl)
	.end(function(err, sres){
		if(err) return next(err);
		var $ = cheerio.load(sres.text);
		var urls = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            var html = url.resolve(nodeUrl, $element.attr('href'));
            console.log(html);
            urls.push(html);
		});

		var ep = new eventproxy();
		ep.after('topic_html', urls.length, function(topics){
			topics = topics.map(function(topicPair){
				var topicUrl = topicPair[0];
				var topicHtml = topicPair[1];
				var $ = cheerio.load(topicHtml);
				return ({
							title: $('.topic_full_title').text().trim(),
							href: topicUrl,
							comment1: $('.markdown-text').eq(0).children('p').text().trim(),
							score: $('.big').text().substring(3),
							author: $('.user_name').children('a').text()
				});
			});
			console.log('final: ');
			console.log(topics);
            res.writeHead(200,{'Content-Type':'text/html'});
			res.end(dump_obj(topics));
		});

		var currencyCount = 0;
        var getInfo = function(url, callback){
        	// var data = {};
            superagent.get(url)
                .end(function(err, src){
                    if(err) console.log('error2');
                    ep.emit('topic_html', [url, src.text]);
                });

            var delay = parseInt(Math.random()*1000);
            currencyCount++;
            console.log("现在并发数是"+ currencyCount +"正在抓取URL：" + url + "耗时" + delay + "毫秒");
            setTimeout(function(){
                currencyCount--;
                //callback(null（成功）, data（失败）)
				//http://www.jianshu.com/p/db81300c2015
            	callback(null);
            }, delay);
        };

		//async控制并发
		async.mapLimit(urls, 5, function(url,callback){
				getInfo(url, callback);
			}, function(err, result){
			//result为callback(null, data)中data累积
			console.log('finish');
		});

		// urls.forEach(function(topicUrl){
		// 	superagent.get(topicUrl)
		// 	.end(function(err, res){
		// 		if(err) console.log("error2");
		// 		console.log('get: ' + topicUrl);
		// 		ep.emit('topic_html', [topicUrl, res.text])
		// 	});
		// });

	});

});

function dump_obj(myObjects) {
  var s = "";
  for (var myObject in myObjects) {
  	var obj = myObjects[myObject];
  	for (var property in obj) {
        s = s + "\n " + property + ": " + obj[property];
    }
  }
  return s;
};

app.listen(3000);
console.log('creeping server is listening at port 3000');