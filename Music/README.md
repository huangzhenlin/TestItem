##  PHP+Bootstraps实现的简单音乐播放列表 

#### 1.启动方法

- 第一步：下载项目到本地

- 第二步：下载运行环境(php,apache)并配置

- 第三步：在http协议下，运行`index.php` 文件

- 快捷方式：使用PHP的内置服务器快速启动项目

  ```shell
  #切换到PHP所在目录
  C:\Users\Administrator>cd C:\Program Files\PHP7.2
  #localhost:8080 是域名端口号，C:\Users\Administrator\Desktop\Music是php文件所在目录
  C:\Program Files\PHP7.2>php -S localhost:8080 -t C:\Users\Administrator\Desktop\demo
  
  #cmd窗口不要关闭，然后在浏览器中输入 http://localhost:8080/index.php 即可访问
  ```

#### 2.总结

- 技术：bootstrap+PHP+HTML
- 目的：练习对服务器渲染的简单操作，理解服务器渲染的整个过程

#### 3.具体思路

- 数据：这里为了方便直接使用json格式存储数据，如果数据过多，可以使用数据库存储
- 首页数据展示：
  - 读取数据`file_get_contents `
  - json反序列化`json_decode ` 
  - 数组遍历`foreach `
  - PHP与HTML混编 
- 新增数据：
  - 表单的使用（post提交数据）
  - 表单提交过来处理数据：接收并校验--->持久化--->响应（三部曲）
  - 技巧：使用函数和if-return的方式防止if-else嵌套过深的问题
  - 服务端表单校验并提示错误消息：empty判断一个成员是否没定义或者值为false（可以隐式转换为false） 
  - 输出文件：文件数量，文件种类，如果要考虑文件重名的情况，可以给上传的文件重新命名 
  - 单文件域多文件上传：name属性值可以[ ]结尾，服务端会接收到一个数据 
  - 文件写入，最后使用重定向跳转回首页
- 删除数据：（get方式）
  - 通过客户端在URL地址中的问号参数的不同来辨别要删除的数据 
  - 接收URL中的不同ID ，找到要删除的数据 
  - 从原数据中删除 ，保存删除指定数据过后的内容 ，跳转回到首页 

#### 4.其他

> 如果出现文件大小限制的问题：
>
> ```php
> //修改php.ini中的post_max_size配置,让服务端可以接受更大的请求体体积
> post_max_size = 8M;
> //修改php.ini中的upload_max_filesize配置,让服务端可以支持更大的单个上传文件
> post_max_filesize = 2M;
> ```