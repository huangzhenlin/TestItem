# QQ首页
> 使用H5和jQuery插件stellar(产生视觉差滚动效果)仿写的QQ首页

#### 思路

- 使用HTML5标签布局
- 为了兼容IE8以下的浏览器，引入`html5shiv.js`
- 使用jQuery插件stellar，给网站添加视觉差滚动的效果

#### 具体实现

- 页面基础结构，使用`nav` `section` `footer` 布局，引入各种js文件
- 导航部分和展示部分
- 语音部分、文件部分、兴趣部分，布局大体相同，背景框和内容框
- 底部，为了快捷制作，使用了图片
- 配置插件stellar 

#### [stellar](https://github.com/markdalgleish/stellar.js)插件简单介绍

- 原理：

  - background-attachment属性设置背景图像是否固定或者随着页面的其余部分滚动。scroll默认值。背景图像会随着页面其余部分的滚动而移动。fixed当页面的其余部分滚动时，背景图像不会移动。 
  - 前景和背景以不同速度移动，从而创造出3D效果。利用background-attachment属性实现 

- 使用

  - 引入js包

    ```html
    <script src="path/to/jquery/jquery.min.js"></script>
    <script src="path/to/jquery.stellar.min.js"></script>
    ```

  - HTML

    ```html
    <div data-stellar-background-ratio="0.5">
    ```

  - js初始化

    ```javascript
    $.stellar({
        horizontalScrolling: false,
        responsive: true
    });
    ```

    