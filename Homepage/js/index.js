$(function(){
    /**
     * 1.引入
     * 2.结构data-stellar-background-ratio="0.3"，背景滚动速度为正常滚动速度的0.3倍
     * 3.样式bg 需要background-attachment: fixed;
     * 4.初始化插件
     */
    $.stellar({
       horizontalScrolling: false,//设置视觉差方向
       responsive: true,//设置load、resize时间刷新页面
    });
});