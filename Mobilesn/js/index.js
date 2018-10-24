$(function(){
    /* 轮播图 */
    var $banner=$('.sn_banner');
    var width=$banner.width();

    var $imageBox=$banner.find('ul:first-child');
    var $pointBox=$banner.find('ul:last-child');
    var $points=$pointBox.find('li');

    var animationFuc=function(){
        $imageBox.animate({transform:'translateX('+(-index*width)+'px)'},200,function(){
            if(index>=9){
                index=1;
                $imageBox.css({transform:'translateX('+(-index*width)+')px'});
            }else if(index<=0){
                index=8;
                $imageBox.css({transform:'translateX('+(-index*width)+')px'});
            }
            $points.removeClass('now').eq(index-1).addClass('now');
        });
    }
    // 1.功能:自动轮播 无缝
    // 2.功能:点容器随着变化
    var index=1;
    var timer=setInterval(function(){
        index++;
        animationFuc();
    },3000);
    // 3.功能:完成手势切换
    $banner.on('swipeLeft',function(){
        index++;
        animationFuc();
    });
    $banner.on('swipeRight',function(){
        index--;
        animationFuc();
    });
});