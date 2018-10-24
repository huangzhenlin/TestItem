/**
 * app.js入口模块:
 * 1.创建服务,
 * 2.服务相关配置:模板引擎,body-parser配置,静态服务资源,挂载路由
 * 3.监听端口启动服务
 */
// 加载express
var express = require('express');
var app = express();

// 加载路由模块
var router = require('./router');

// 加载body—parser
var bodyParser = require('body-parser');

// 公开node——moudle和public目录
app.use('/node_modules/',express.static('./node_modules/'));
app.use('/public/',express.static('./public/'));

// 加载art-template
app.engine('html',require('express-art-template'));

// 配置body-parser(挂载路由之前)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 挂载路由
app.use(router);

// 绑定端口
app.listen(3000,function(){
    console.log('server is running at http://127.0.0.1:3000/users')
})
