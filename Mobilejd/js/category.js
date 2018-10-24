window.onload=function(){
    /**
     * 区域滚动效果 
     * 条件:html结构一个容器装着一个容器
     * 步骤:找到大容器(子容器大于父容器),然后初始化
     */
    new IScroll(document.querySelector('.jd_cateleft'),{
        // scrollX:false,//设置x轴滚动
        // scrollY:true,//
        hscrollbar:false,
        vscrollbar:false,
        hscroll:false,
        vscroll:true,
        momentum:false,
        snap:true,
        preventDefault:false,
        checkDOMChanges:true,
        mouseWheel:true,//侦听鼠标滚轮事件,如果没设置的话会出现滚动卡顿不流畅
    });
}