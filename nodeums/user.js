/**
 * user.js模块:
 * 用于数据操作,只处理数据,不关心业务
 */
// 加载相应模块
var fs = require('fs');
var dbPath = './db.json';

// 获取所有的用户数据列表
exports.find = function(callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).users)
    });
};
// 根据id获取用户信息对象
exports.findById = function(id,callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var users = JSON.parse(data).users;
        var ret = users.find(function(item){
            return item.id === parseInt(id)
        });
        callback(null,ret);
    })
};
// 添加保存用户数据列表
exports.save=function(user,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var users=JSON.parse(data).users
        // 处理id唯一的,不重复
        user.id=users[users.length-1].id+1
        // 保存到数组
        users.push(user)
        // 转为字符串
        var fileDate=JSON.stringify({users:users})
        // 保存到文件
        fs.writeFile(dbPath,fileDate,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    });
};
// 更新用户数据列表
exports.updateById=function(user,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var users=JSON.parse(data).users;
        user.id=parseInt(user.id);
        // find 是ecmascript6的方法
        var stu=users.find(function(item){
            return item.id===user.id
        });
        // 遍历拷贝对象
        for(var key in user){
            stu[key]=user[key]
        }
        // 把对象数据转为字符串
        var fileDate=JSON.stringify({
            users:users
        });
        // 保存到文件
        fs.writeFile(dbPath,fileDate,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        });
    });
};
// 删除用户数据
exports.deleateById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var users=JSON.parse(data).users;
        var deleteId=users.findIndex(function(item){
            return item.id===parseInt(id)
        });
        users.splice(deleteId,1);
        var fileDate=JSON.stringify({users:users});
        fs.writeFile(dbPath,fileDate,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        });
    })
}