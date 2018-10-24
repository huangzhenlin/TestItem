## Node.js+Bootstraps实现的简单用户管理系统

> 为了操作方便，直接使用了json文件存储数据，实际开发中，会将数据存储在数据库里，比如MySQL和MongoDB，这些数据库都可以使用node.js进行数据操作，实现功能

- 启动方法
  - 第一步：下载项目到本地
  - 第二步：下载node.js，并配置全局变量
  - 第三步：命令行切换到项目目录，运行文件`node app.js` 
  - 第四步：打开浏览器，输入`http://127.0.0.1:3000/users` 访问
  - 注意：如果出现错误，请重新下载所有的依赖包，命令行运行`npm install` 

- 总结
  - 使用nodejs+bootstrap开发
  - 使用了`express`开发框架，配合`express-art-template`、`body-parser` 使用
  - 对文件进行合理的模块化
  - 实现基本的增删改查功能

- 思路：

  - 使用`db.json` 存储开始需要展示的数据
  - 把相关静态资源放在`views` 文件夹内，主要有`index.html`、 `new.html `、`edit.html` 
  - 处理模块`app.js`，创建服务，配置相关插件、挂载路由等
  - 路由设计，提取路由模块`router.js`
  - 单独的`user.js`用于封装一些方法：查找用户数据，保存用户数据，更新用户数据，删除用户数据
