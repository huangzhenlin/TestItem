$(function(){
    // 初始化fullpage组件
    $(".container").fullpage({
        //1.设置每一个屏幕的背景颜色
        sectionsColor:["#FE5D41","#84a2d4","#ef674d","#ffeedd","#d04759","#84d9ed","#ef4759","#7bd1ed"],
        //2.设置屏幕内容的对齐方式,默认是垂直居中的
        verticalCentered:false,
        //3.设置导航 设置指示器 点容器
        navigation: true,
        //4.监听进入某一屏的时候,回调函数(加载完所要做的事)
        afterLoad:function(link,index){
            // index序号1开始,表示当前屏的序号
            $(".section").eq(index-1).addClass("now");
        },
        //5.离开某一屏的时候出发触发
        onLeave:function(index,nextIndex,dirction){
            if(index==2 && nextIndex==3){
                //当前是从第二页到第三页
                $('.section').eq(index-1).addClass('leaved');
            }else if(index==3 && nextIndex==4){
                //当前是从第三页到第四页
                $(".section").eq(index-1).addClass("leaved");
            }else if(index==5 && nextIndex==6){
                //当前是从第五页到第六页
                $(".section").eq(index-1).addClass("leaved");
                $(".screen06 .box").addClass('show');
            }else if(index==6 && nextIndex==7){
                //当前是从第6页到第7页
                $(".screen07 .star").addClass("show");
                $(".screen07 .text").addClass("show");
            }
        },
        //6. 在组件初始完毕或者内容渲染完毕的时候,执行该事件
        afterRender:function(){
            //jquery本身没有的方法通过$.fn的方式追加
            //点击更多切换下一页
            $(".more").on("click",function(){
                $.fn.fullpage.moveSectionDown();
            });
            // 当第四屏的购物车动画结束之后执行收货地址的动画,jquery的动画函数的回调函数可以监听
            //css3中,过渡transitionend 动画animationed也可以监听
            $(".screen04 .cart").on("transitionend",function(){
                $(".screen04 .address").show().find("img:last").fadeIn(1000);
                $(".screen04 .text").addClass("show");
            });
            //第八屏功能
            //1.手跟着鼠标移动
            $(".screen08").on("mousemove",function(e){
                $(this).find(".hand").css({
                    left:e.clientX-450,
                    top:e.clientY-300
                });
            }).find(".again").on("click",function(){
                //2.点击再拉一次重置动画回到第一页
                //上述做动画用了:now类,leaved类,show类,加css属性(加了style属性),
                $(".now,.leaved,.show").removeClass("now").removeClass("leaved").removeClass("show");
                //用jquery的show()和fadein()(也增加了一个style属性)
                $(".content [style]").removeAttr("style");
                //调回第一页
                $.fn.fullpage.moveTo(1);
            });
        },
        //页面切换的时间,默认是700
        scrollingSpeed:1000,
    });
});