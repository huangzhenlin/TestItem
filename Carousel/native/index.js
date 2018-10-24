/* 相关封装函数 */
/*getStyle函数:获取任意一个元素的任意一个样式属性的值
 *@param element:元素
 *@param attr:元素的某个属性
*/
function getStyle(element,attr){
    return window.getComputedStyle?window.getComputedStyle(element)[attr]:element.currentStyle[attr];
}
/*animate:动画函数
 *@param element:元素对象
 *@param json:属性集合，例如{"width":200,"top":100,"opacity":1,"zIndex":-1}
 *@param fn:回调函数
*/
function animate(element,json,fn){
	clearInterval(element.timeId);
	element.timeId=setInterval(function(){
		for(var attr in json){
         	if(attr=="opacity"){
         	var current=getStyle(element,attr)*100
         	var target=json[attr]*100
         	var step=(target-current)/10;
		    step=step>0?Math.ceil(step):Math.floor(step);
            current+=step;
            element.style[attr]=current/100;
            }else if(attr=="zIndex"){
                element.style[attr]=json[attr];
            }else{
                var current=parseInt(getStyle(element,attr));
                var target=json[attr];
                var step=(target-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current+"px";
			}
            if(current==target){
                clearInterval(element.timeId);
                if(fn){
                    fn()
                }
         	}
		}
	},20)
}
/* ------carousel----- */
//获取相关元素
var box=document.getElementById('carousel');
var screenObj=box.children[0];//获取相框
var imgWidth=box.offsetWidth;//获取相框宽度
var list=screenObj.children;//获取图片对象集合
var olObj=box.children[1];//获取ol,用于存放小方块
var arrObj=document.getElementById('arr');
var leftarr=arrObj.children[0];
var rightarr=arrObj.children[1];

//功能1:创建圆点,移动图片 
var pic=0;
for (var i = 0; i < list.length; i++) {
    //创建li标签,加入到ol中
    var liObj = document.createElement("li");
    olObj.appendChild(liObj);
    liObj.innerHTML = (i + 1);
    liObj.setAttribute("index", i);//在每个ol中的li标签上添加一个自定义属性,存储索引值
    //注册鼠标进入事件
    liObj.onmouseover = function () {
        for (var j = 0; j < olObj.children.length; j++) {
            olObj.children[j].removeAttribute("class");//先清除所有的ol中的li的背景颜色
        }
        this.className = "current";//设置当前鼠标进来的li的背景颜色
        pic = this.getAttribute("index");//获取鼠标进入的li的当前索引值
        animate(screenObj, {"left":-pic * imgWidth});//轮播图片
    };
}
olObj.children[0].className = "current";//设置ol中第一个li有背景颜色

// 功能2:图片自动轮播,鼠标进入停止,鼠标离开继续
screenObj.appendChild(screenObj.children[0].cloneNode(true));//克隆一个ul中第一个li,加入到ul中的最后
var timeId = setInterval(clickHandle, 1000);//自动播放
box.onmouseover = function () {
    //鼠标进入显示左右焦点
    arr.style.display = "block";
    //鼠标进入清除之前的定时器
    clearInterval(timeId);
};
box.onmouseout = function () {
    //鼠标离开隐藏左右焦点的div
    arr.style.display = "none";
    //鼠标离开自动播放
    timeId = setInterval(clickHandle, 1000);
};

function clickHandle() {
    //如果pic的值是4,图片个数-1的值,此时页面显示第5个图片,而用户会认为这是第1个图,
    if (pic == list.length - 1) {
        pic = 0;//先设置pic=0,从第5个图,跳转到第1个图
        screenObj.style.left = 0 + "px";//把位置还原成开始的默认位置
    }
    pic++;//立刻设置pic加1,那么此时用户就会看到第2个图片了
    animate(screenObj, {"left":-pic * imgWidth});
    //如果pic==4说明,此时显示第5个图(内容是第1张图片),第一个小按钮有颜色,
    if (pic == list.length - 1) {
        olObj.children[olObj.children.length - 1].className = "";//第五个按钮颜色干掉
        olObj.children[0].className = "current";//第一个按钮颜色设置上
    } else {
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");//清除所有的小按钮的背景颜色
        }
        olObj.children[pic].className = "current";//设置当前的背景颜色
    }

}
// 功能3:点击左右焦点轮播
rightarr.onclick=clickHandle;//点击右边按钮
leftarr.onclick=function(){
    if (pic == 0) {
        pic = list.length-1;
        screenObj.style.left = -pic * imgWidth + "px";
    }
    pic--;
    animate(screenObj, { "left": -pic * imgWidth });
    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].removeAttribute("class");//所有的小按钮清除颜色
    }
    olObj.children[pic].className = "current";//当前的pic索引对应的按钮设置颜色
}

