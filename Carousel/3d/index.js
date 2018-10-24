$(function(){
    //点击切换图片(定义一个索引)
    var index=0;
    // 开关
    var flag=true;
    // 点击左边的按钮,上一张
    $(".left").on("click",function(){
        if(!flag) return false;
        flag=false;
        index--;
        var angle=-index*90;
        $("li").css("transform","rotateX("+ angle +"deg)").each(function(i,item){
            // 设置不同的延时
            $(this).css("transition-delay",i*0.25+"s");
        });
    });
    //点击右边的按钮,下一张
    $(".right").on("click",function(){
        if(!flag) return false;
        flag=false;
        index++;
        var angle=-index*90;
        $("li").css("transform","rotateX("+ angle +"deg)").each(function(i,item){
            // 设置不同的延时
            $(this).css("transition-delay",i*0.25+"s");
        });
    });
    //优化:重复点击的时候动画会层叠----使用节流阀flag
    $("li:last").on("transitionend",function(){
        // 最后一部分图片加载完毕
        flag=true;
    });
    
});