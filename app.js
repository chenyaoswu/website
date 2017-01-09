var debug = require('debug')('website');
var koa = require('koa');
let env = process.env;

//配置文件
var config = require('./config/config');

var app = koa();
app.use(function*(next) {
    //config 注入中间件，方便调用配置信息
    if (!this.config) {
        this.config = config;
    }
    yield next;
});

//wx login
// let sso = require('./middleware/sso');
app.use(function*(next) {
    console.log('enter sso');
    var url = encodeURIComponent('http://c.vo5studio.com');
    console.log(this.host);
    console.log(this.url);
    console.log(this.query);
    var url = 'c.vo5studio.com'
    if (this.url.indexOf('code') > -1 && this.url.indexOf('state') > -1) {
        console.log('授权成功，获得code');
    } else if (this.url.indexOf('code') > -1) {
        console.log('授权拒绝');
    } else {
        console.log('跳转授权');

        this.redirect('https://open.weixin.qq.com/connect/qrconnect?appid=&redirect_uri=' + url + '&response_type=code&scope=snsapi_login');
    }
    yield next;
});

//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

var onerror = require('koa-onerror');
onerror(app);

// //xtemplate对koa的适配
// var xtplApp = require('xtpl/lib/koa');
// //xtemplate模板渲染
// xtplApp(app,{
//     //配置模板目录
//     views: config.viewDir
// });
const render = require('koa-ejs');
//默认拓展元数据
let isProduction = ['prod', 'staging'].indexOf(env.NODE_ENV) != -1;

//默认拓展
render(app, {
    root: config.viewDir,
    layout: `public/master`,
    viewExt: 'html',
    cache: isProduction ? true : false,
    debug: isProduction ? false : true
});


var session = require('koa-session');
app.use(session(app));


//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
var validator = require('koa-validator');
app.use(validator());

//静态文件cache
var staticCache = require('koa-static-cache');
var staticDir = config.staticDir;
app.use(staticCache(staticDir + '/js'));
app.use(staticCache(staticDir + '/css'));

//路由
var router = require('koa-router');
app.use(router(app));



//应用路由
var appRouter = require('./router/index');
appRouter(app);

app.listen(config.port);
console.log('listening on port %s', config.port);

module.exports = app;