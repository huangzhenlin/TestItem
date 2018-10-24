/**
 * router.js路由模块:
 * 处理路由,根据不同的请求方法或者请求路径设置具体的返回数据
 */
// 加载相应模块
var fs = require('fs');
var express = require('express');
var User = require('./user');

// 创建路由容器
var router = express.Router();
/** 路由设计:
 * 请求方法 ==== 请求路径 ==== 参数  =====备注 
 * GET ==== /users ==== 参数无 ====渲染首页
 * GET ==== /users/new ===== 参数无 ======渲染添加用户页面
 * POST ==== /users/new ===== 参数name,age,gender,hobbies ======添加用户页面提交表单
 * GET ==== /users/edit ===== 参数id ======渲染编辑页面
 * POST ==== /users/edit ===== 参数id,name,age,gender,hobbies ======编辑用户页面表单提交
 * GET ==== /users/delete ===== 参数id ======处理删除请求
 */
// 处理路由:把路由都挂载到路由容器
router.get('/users',function(req,res){
    User.find(function(err,users){
        if(err){
            return res.status(500).send('server error');
        }
        res.render('index.html',{
            users:users
        })
    });
});
router.get('/users/new',function(req,res){
    res.render('new.html')
});
router.post('/users/new',function(req,res){
    // 获取表单数据-->处理(保存到db.json)-->发送响应
    User.save(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/users')
    })
});
router.get('/users/edit',function(req,res){
    User.findById(parseInt(req.query.id),function(err,user){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('edit.html',{
            user:user
        });
    });
});
router.post('/users/edit',function(req,res){
    User.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/users')
    })
});
router.get('/users/delete',function(req,res){
    User.deleateById(req.query.id,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/users')
    });
});

// 把路由导出
module.exports = router;
