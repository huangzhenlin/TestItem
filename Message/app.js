// 加载模块
var htpp = require('http');
var fs = require('fs');
var url = require('url');
var template =require('art-template');

// 模拟留言列表数据
var comments=[
    {name:"王五",message:"你用什么编辑器？",datetime:"2018-5-1"},
    {name:"李四",message:"今天天气真好",datetime:"2018-4-1"},
    {name:"张三",message:"飞流直下三千只",datetime:"2018-3-1"},
    {name:"孙二",message:"哈哈哈哈哈",datetime:"2018-2-1"},
    {name:"赵大",message:"赞赞赞",datetime:"2018-1-1"}
]

// 创建web服务
var server = htpp.createServer();
server.on('request',function(request,response){
    //request.url路径解析成一个对象
    var parseObj = url.parse(request.url,true);
    var pathname = parseObj.pathname;
    // 请求路径不同返回不同的数据
    if(pathname === '/'){
        // 请求路径是根目录，即请求留言首页
        fs.readFile('./view/index.html',function(err,data){
            if(err){
                return response.end('404 Not Found')
            }
            var htmlStr = template.render(data.toString(),{
                comments:comments
            });
            response.end(htmlStr);
        });
    }else if(pathname === '/add'){
        // 请求路径是 /add ，即跳转到添加留言页面
        fs.readFile('./view/add.html',function(err,data){
            if(err){
                return response.end('404 Not Found')
            }
            response.setHeader('Content-Type','text/html;charset=utf-8');//防止出现乱码
            response.end(data);
        });
    }else if(pathname === '/say'){
        // 请求路径是 /say ,即提交留言
        var comment = parseObj.query;
        var dt=new Date();
        comment.datetime = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
        comments.unshift(comment);
        // 重定向，跳回首页
        response.statusCode = 302;
        response.setHeader('Location','/');
        response.end();
    }else if(pathname.indexOf('/public/')===0 || pathname.indexOf('/node_modules')===0){
        // 请求路径是以 /public/或者 /node_modules，即请求静态资源文件
        // 这里就应该注意：把html文件加载静态资源的的路径都换成相对于网站根目录的路径
        fs.readFile('.'+pathname,function(err,data){
            if(err){
                return response.end('404 Not Found');
            }
            response.setHeader('Content-Type','text/css;charset=utf-8');//这里主要请求的css文件
            response.end(data);
        });
    }else{
        // 请求路径是其他的都设置为404
        fs.readFile('./views/404.html',function(err,data){
            if(err){
                return response.end('404 Not Found');
            }
            response.setHeader('Content-Type','text/html;charset=utf-8');//防止出现乱码
            response.end(data);
        });
    }
});

//创建监听对象
server.listen(3000,function(){
    console.log('Server is running at http://127.0.0.1:3000/')
}) 