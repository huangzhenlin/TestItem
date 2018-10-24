# 用户管理系统
> 使用vue、vue-router、webapck、axios、bootstrap等技术做的简单的用户管理系统，项目的初始化文件都是自己手动配置，配置较简单，过程实际开发中，使用`vue-cli`初始化项目更加方便，优化也更好

- 启动

  - 下载项目到本地，在项目文件夹命令行运行`npm install` 安装依赖包
  - 安装`json-server` 并在项目目录运行命令`json-server --watch db.json`启动一个接口服务器
  - 当前项目目录命令行运行`npm run dev` 会自动打包并在浏览器启动项目
  - 注意：运行`npm run build`，在dist目录，会得到index文件和bundle.js文件（已经打包好），项目上线就是需要这两个文件，在项目上线的时候，只需要把打包生成的文件和生产环境的依赖包通过npm命令`npm install --production`来安装即可，不需要安装开发环境的依赖包

- 具体思路

  - 准备：
    - 项目初始化配置，加载的第三方模块的配置`vue`、`bootstrap`、`vue-router`、`axios`
    - 这里使用db.json开启一个服务器API模拟后台
  - 项目开始：
    - `index.html`文件引入文件，设置文件管理入口`#app`
    - `main.js` 文件引入挂载入口，引入组件，引入路由等等
    - `router.js` 设计路由 ，引入相应的模块
    - `App.vue` 是文件的中模块，引入一个通用组件`appnav`，以及设置路由出口
    - 然后就是各子组件的设计了，包括对数据的查、增、改、查

- 使用`json-server` 模拟服务器API

  - 安装

    ```shell
    npm install --global json-server
    ```

  - 使用

    - 创建一个json数据文件

      ```json
      {
          "students": [
              {"id": 1,"name": "赵一","gender": 0,"age": 18,"hobbies": "足球"}, 
              {"id": 2,"name": "孙二","gender": 1,"age": 20,"hobbies": "篮球"},
              {"id": 3,"name": "张三","gender": 0,"age": 30,"hobbies": "彩票"}, 
              {"id": 4,"name": "李四","gender": 1,"age": 25,"hobbies": "代码"}, 
              {"id": 5,"name": "王五","gender": 0,"age": 10,"hobbies": "游戏"}
          ]
      }
      ```

    - 启动接口服务器

      ```shell
      #db.json是文件名
      json-server --watch db.json
      #可以得到一个url地址，访问即可拿到数据
      ```

  - 基本功能

    - 查询所有`localhost:3000/students`
    - 查询单个`localhost:3000/students/3`
    - 集合`postman` 更好的使用