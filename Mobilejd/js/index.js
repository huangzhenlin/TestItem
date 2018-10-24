window.onload=function(){
    // 功能1.顶部搜索
    search();
    // 功能2.轮播图
    banner();
    // 功能3.倒计时
    downTime();
}
// 顶部搜索封装函数=======================================================
var search=function(){
    // 获取相关元素
    var searchBox=document.querySelector('.jd_search_box');
    var banner=document.querySelector('.jd_banner');
    var height=banner.offsetHeight;
    window.onscroll=function(){
        /* 获取页面y轴距离的三种方法：
         document.body.scrollTop
         document.documentElement.scrollTop
         window.pageYOffset*/
        var scrollTop=window.pageYOffset||document.documentElement.scrollTop||window.pageYOffset;
        // 默认的透明度
        var opacity=0;
        if(scrollTop<height){
            // 当页面滚动的时候：随着页面据卷曲的高度的变大透明度变大
            opacity=scrollTop/height*0.85;
        }else{
            // 当页面滚动的时候：超过某一个高度的时候透明度不变
            opacity=0.85;
        }
        //设置透明度
        searchBox.style.background='rgba(201,21,35,'+opacity+')';
    }
};
// 轮播图封装函数=============================================================
var banner=function(){
    /**
     * 五个功能:
     * 1.自动轮播图并且无缝----定时器,过渡
     * 2.点要随着图片的轮播改变----根据索引的切换
     * 3.滑动效果----利用touch事件完成
     * 4.滑动结束的时候:如果滑动的距离不超过屏幕的1/3,吸附回去----过渡
     * 5.滑动结束的时候,如果滑动的距离超过屏幕的1/3, 切换图片(上一张或者下一张)根据滑动的方向---过渡
     */
    //获取元素
    var banner=document.querySelector('.jd_banner');
    var width=banner.offsetWidth;//屏幕宽度
    var imageBox=banner.querySelector('ul:first-child');//图片容器
    var pointBox=banner.querySelector('ul:last-child');//点容器
    var points=pointBox.querySelectorAll('li');//所有的点
    // 封装增加过渡的函数,清除过渡的函数,设置位移的函数
    var addTransition=function(){
        imageBox.style.transition='all 0.2s';
        imageBox.style.webkitTransition='all 0.2s';
    }
    var removeTransition=function(){
        imageBox.style.transition='none';
        imageBox.style.webkitTransition='none';
    }
    var setTranslateX=function(translateX){
        imageBox.style.transform='translateX('+translateX+'px)';
        imageBox.style.webkitTransform='translateX('+translateX+'px)';
    }
    // 程序的核心 index,轮播效果(定时器)
    var index=1;
    var timer=setInterval(function(){
        index++;
        // 加过渡
        addTransition();
        // 做位移
        setTranslateX(-index*width);
    },1000);
    //自动无缝滚动(监听位移事件)
    imageBox.addEventListener('transitionend',function(){
        if(index>=9){
            // 等最后一张动画结束去判断,瞬间定位第一张
            index=1;
            // 清除过渡效果
            removeTransition();
            // 重新做位移
            setTranslateX(-index*width);
        }else if(index<=0){
            // 滑动的时候也需要无缝,瞬间定位到最后一张
            index=8;
            // 清除过渡效果
            removeTransition();
            // 重新做位移
            setTranslateX(-index*width);
        }
        // 根据索引设置点,此时index的取值范围是1-8,所以点的索引是idnex-1
        setPoint();
    });
    // 封装带你的方法 setPoint
    var setPoint=function(){
        // 清除样式
        for(var i=0;i<points.length;i++){
            var obj=points[i];
            obj.classList.remove('now');
        }
        // 给对应的加上样式
        points[index-1].classList.add('now');
    }
    // 滑动效果,绑定三个事件
    var startX=0;
    var distanceX=0;
    var isMove=false;
    imageBox.addEventListener('touchstart',function(e){
        // 清除定时器
        clearInterval(timer);
        // 记录起始位置的X坐标
        startX=e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        // 记录滑动过程中的X坐标
        var moveX=e.touches[0].clientX;
        // 计算位移(有正负方向)
        distanceX=moveX-startX;
        // 计算目标元素的位移 不用管正负(元素将要的定位=当前定位+手指移动的距离)
        var translateX=-index*width+distanceX;
        // 滑动--->元素随着手指的滑动做位置的改变
        removeTransition();
        setTranslateX(translateX);
        isMove=true;
    });
    imageBox.addEventListener('touchend',function(e){
        // 要使用移动的距离
        if(isMove){
            if(Math.abs(distanceX)<width/3){
                // 不超过屏幕的1/3,则吸附回去
                addTransition();
                setTranslateX(-index*width);
            }else{
                // 超过屏幕的1/3,则切换至上一张或者下一张
                if(distanceX>0){
                    // 右滑动,下一张
                    index--;
                }else{
                    // 左滑动,上一张
                    index++;
                }
                // 根据index去做动画的移动
                addTransition();
                setTranslateX(-index*width);
            }
        }
        // 做一次参数的重置
        startX=0;
        distanceX=0;
        isMove=false;
        // 清除以前的定时器,并重新加上定时器
        clearInterval(timer);
        timer=setInterval(function(){
            index++;
            // 加过渡
            addTransition();
            // 做位移
            setTranslateX(-index*width);
        },1000)
    });
};
// 倒计时封装函数===============================================
var downTime=function(){
    // 设置倒计时的时间
    var time=2*60*60;
    // 获取时间元素盒子
    var spans=document.querySelector('.sk .time').querySelectorAll('span');
    // 每一秒获取更新显示的时间
    var timer=setInterval(function(){
        time--;
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=time%60;
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
        // 倒计时结束,清理定时器
        if(time<=0){
            clearInterval(timer);
        }
    },1000)
}
