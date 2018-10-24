# 轮播图

[TOC]


## 一、原生JavaScript实现轮播图

> 备注：很多文件因为方便，书写比较随便，轮播图主要是三个功能：自动播放、点击左右焦点、点击小按钮

#### 1.html 

 主要是分为四块布局：

 - 大容器，用来装全部的布局容器
 - 照片容器，用来放图片，这里轮播几张图片就放几张
 - 点容器，用来放小圆点，小圆点后面通过js自动创建
 - 左右按钮容器，用来放两个左右按钮的

####  2.css

 五个部分：

 - 重置样式，一些基础样式的清除
 - 大容器，相对定位，其他容器绝对定位，宽高和图片一致或者等比缩放，并且把超出部分裁剪
 - 照片容器，宽度应该是大容器的（照片个数+1）的5倍，因为后面做轮播图需要通过js复制增加一张
 - 点容器，先设置好，点容器的样式，包括一个当前样式
 - 左右按钮容器，垂直居中，左右各一个

#### 3.js(重点)

 - 封装函数部分，一个获取任意样式属性值的`getStyle` 函数和一个自己封装的动画函数`animate `

 - 轮播图功能部分：
   - 获取需要使用的一些元素
   - 功能1：动态创建圆点，点击实现图片移动（技巧：创建自定义属性记录index）
   - 功能2：定时器实现图片自动轮播，鼠标进入停止，鼠标离开继续轮播（技巧：复制一张图片，实现无缝轮播，并且需要与复制图片联系的圆点按钮的变化，）
   - 功能3：左右按钮实现图片移动（技巧：右焦点和自动轮播可以使用同一个封装的函数，左焦点只需处理第一张图片和第五张图片的过渡即可）

## 二、3D切割轮播图

> 轮播图较为简单，主要是展示3D效果，启动请点击左右焦点按钮

#### 1.思路

- 主要使用CSS3的属性：`transform-style: preserve-3d; ` 可以实现3D呈现
- 把轮播图的图片作为背景图片，一张图片分为几个部分，每张图片放在不同的3D坐标系里
- 把每一张图片的不同部分使用`transition-delay ` 设置不同的动画延迟，可以出现3D效果
- 3D旋转技巧：顺着轴的正方向看，顺时针旋转是负角度，逆时针旋转是正角度 

#### 2.具体实现

- html部分：图片分五部分,所以有五个`li` ，有四张图片所以有四个`span`
- css部分：
  - 设置`li的`3d呈现
  - 把四张图片放在3D坐标系里，可以想象一个长方体，上下前后四个面每个面放一个图片，每个面就是一个`span` 
  - 图片分为五个部分，`li` 是浮动并排显示的，即有五个长方体并排在一起，形成一个宽度增加了的长方体，即每个面都会增加四个`span`  ,因为`span`的宽度是图片的五分之一，所以利用背景定位，每个`span`呈现出图片的1/5，2/5，3/5，4/5，5/5即可
- js部分：
  - 注册左右按钮的点击事件，`li`X轴旋转90度，每个面就会轮流滚动到正前面，
  - 再设置每个`li`的不同滚动延迟，就会出现不同视觉差效果，呈现3D切割的效果
  - 最后设置节流阀flag ，避免重复点击的时候动画会层叠

## 三、swiper插件实现的轮播图

> 使用swiper 3实现的轮播图，使用插件过程很简单，主要就是如何使用插件

#### 1.加载

```html
<link rel="stylesheet" href="path/to/swiper.min.css">
           ...
　　　　    ...
<script src="path/to/swiper.min.js"></script>
```

#### 2.html

```html
<div class="swiper-container">
　　<div class="swiper-wrapper">
　　　　<div class="swiper-slide">图片1</div>
　　　　<div class="swiper-slide">图片2</div>
　　　　<div class="swiper-slide">图片3</div>
　　</div>

　　<!-- 如果需要分页器 -->
　　<div class="swiper-pagination"></div>

　　<!-- 如果需要导航按钮 -->
　　<div class="swiper-button-prev"></div>
　　<div class="swiper-button-next"></div>

　　<!-- 如果需要滚动条 -->
　　<div class="swiper-scrollbar"></div>
</div>
```

#### 3.初始化

```javascript
//初始化Swiper：需要在页面加载完成后初始化
var mySwiper = new Swiper ('.swiper-container', {
direction: 'vertical',//方向
loop: true,//循环

// 如果需要分页器
pagination: '.swiper-pagination',

// 如果需要前进后退按钮
nextButton: '.swiper-button-next',
prevButton: '.swiper-button-prev',

// 如果需要滚动条
scrollbar: '.swiper-scrollbar',
}) 
```

