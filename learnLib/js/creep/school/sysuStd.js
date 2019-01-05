var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
var querystring = require('querystring');
var agent = new superagent.agent();
var iconv = require('iconv-lite');
var url = require('url');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');

var app = express();
var index = require('./routes/index');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new FileStore(),
    resave : false,
    saveUninitialized: false,
    secret: 'msy'
}));

app.use('/', index);

app.listen(3000);
console.log('server is listening at port 3000;');