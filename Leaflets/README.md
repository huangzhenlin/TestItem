# 购物车宣传页
> 本项目所用图片取自网络简单制作而成，较为粗糙

#### 思路

- 采用大量的CSS3动画制作

- 使用jQuery库

- 主要使用一个基于jQuery的插件fullPage.js实现全屏切换效果

  

#### 布局

- 主要分为八屏，先做好大概的全屏切换效果
- 每一屏的动画先布局，然后利用CSS3动画做出效果
- 制作屏与屏之间的切换效果，利用插件的一些方法和DOM操作增加类 ，比如now、leaved、show

#### fullpage.js插件简单介绍

- fullPage.js 是一个基于 jQuery 的插件 ，兼容 jQuery 1.7+，兼容IE8+ ，地址点击 [这里](http://www.dowebok.com/77.html)

- 原理

  ```javascript
  window.onmousewheel=function(){
      //代码
  }
  ```

- 使用

  - 引入文件

    ```html
    <link rel="stylesheet" href="css/jquery.fullPage.css">
    <script src="js/jquery.min.js"></script>
    
    <!-- jquery.easings.min.js 用于 easing 参数，也可以使用完整的 jQuery UI 代替，如果不需要设置 easing 参数，可去掉改文件 -->
    <script src="js/jquery.easings.min.js"></script>
    
    <!-- 如果 scrollOverflow 设置为 true，则需要引入 jquery.slimscroll.min.js，一般情况下不需要 -->
    <script src="js/jquery.slimscroll.min.js"></script>
    
    <script src="js/jquery.fullPage.js"></script>
    ```

  - 模板

    ```html
    <div id="dowebok">
        <div class="section">第一屏</div>
        <div class="section">第二屏</div>
        <div class="section">
            <div class="slide">第三屏的第一屏</div>
            <div class="slide">第三屏的第二屏</div>
            <div class="slide">第三屏的第三屏</div>
            <div class="slide">第三屏的第四屏</div>
        </div>
        <div class="section">第四屏</div>
    </div>
    ```

  - js初始化

    ```javascript
    $(function(){
        $(选择器).fullpage();
    });
    ```