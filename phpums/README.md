## PHP+Bootstraps实现的简单用户管理系统

#### 1.启动方法

- 第一步：下载项目到本地

- 第二步：下载运行环境(php,apache,mysql)并配置

- 第三步：使用mysql建立数据库`test` ,创建用户表`users` ,可以导入项目sql文件`test.sql` 创建 

  > 如果想在首页看到数据，需要这些内置数据，可以根据需要灵活更改数据库名称、密码、表名等等

- 第四步：在http协议下，运行`index.php` 文件

- 快捷方式：使用PHP的内置服务器快速启动项目

  ```shell
  #切换到PHP所在目录
  C:\Users\Administrator>cd C:\Program Files\PHP7.2
  #localhost:8080 是域名端口号，C:\Users\Administrator\Desktop\phpums是php文件所在目录
  C:\Program Files\PHP7.2>php -S localhost:8080 -t C:\Users\Administrator\Desktop\phpums
  
  #cmd窗口不要关闭，然后在浏览器中输入 http://localhost:8080/index.php 即可访问
  ```

- tips：

  - 创建数据库时，如果需要设置中文，最好配置：

    ```ini
    #在mysql配置文件设置
    character-set-server=utf8
    ```

  - 连接数据库之前配置：

    ```ini
    #在php.ini文件的配置：
    #开启扩展(windows)
    extension_dir = "ext"
    
    #面向对象的函数库
    extension=php_mysqli.dll 
    ```

#### 2.总结

- 技术：MySQL+bootstrap+PHP+HTML 
- 目的：熟悉服务器的整个渲染过程，熟悉mysql数据库和PHP的配合使用

#### 3.具体实现思路

- 创建数据库，创建表，添加原始数据
- 首页数据展示（查）
  - 连接数据库，查询数据
  - PHP和html混编，渲染页面
- 增加数据（增）
  - 表单提交`POST`请求
  - 接收数据，开始处理
  - 验证，连接数据库保存数据、返回首页
- 编辑数据（改）
  - 通过get`?`参数传递`ID`值，连接数据库，查询这个`ID`的数据，渲染页面
  - 通过表单再次提交`POST`请求，接收数据处理
  - 验证，连接数据库保存数据、返回首页
- 删除数据（查）
  - 接收通过get`?` 参数传递的`ID`值
  - 连接数据库，查询
  - 判断是否删除成功
  - 返回首页

