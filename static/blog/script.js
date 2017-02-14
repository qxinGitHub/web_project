// 导航当前页高亮
var obj=null;
var As=document.getElementsByClassName('top-nav')[0].getElementsByTagName('li');
obj = As[0];
for(i=1;i<As.length;i++){
    console.log(As[i].getElementsByTagName('a')[0].href);
    if(window.location.href.indexOf(As[i].getElementsByTagName('a')[0].href)>=0){
        obj=As[i];
        console.log(obj);
    }
}
console.log(obj);
obj.className = "top-nav-item top-nav-item-active";

//  底部备案 保持在最底部
var setFooter = function(){
	var screenH = window.innerHeight;
	var header = document.getElementsByTagName("header")[0].offsetHeight;
	// console.log(screenH,header);
	var footer = document.getElementsByTagName("article")[0];
	// 122 = 文章的margin（40+40） + 底部（footer（margin40+height40+border2））的高度
		//102 :文章的下margin和footer上margin重叠 需要在减去20
				//782 802
	// 底部一直位于底部,当高度不足600时,设置为600
	footer.style.minHeight=(screenH-header-102)<600?"600px":(screenH-header-102)+"px";
	// console.log("最小高度: "+footer.style.minHeight);
}
setFooter();




var aside = document.getElementsByTagName("aside")[0];
var navTop = aside.offsetTop;
console.log(navTop);

var left = 0,
    top =0;

// 固定右侧个人信息
function asideFixed(){
    left = aside.offsetLeft;
    top = aside.offsetTop;
    // console.log("left: "+aside.offsetLeft);
    // console.log("top: "+aside.offsetTop);
    if(document.body.scrollTop>navTop-20){
        // console.log(window.innerWidth);
        // var left = (window.innerWidth-1000)/2-7;
        aside.style.position="fixed";
        aside.style.top="20px";
        aside.style.left=left+"px";
    }else{
        aside.style.position="";
    }
}
window.addEventListener("scroll",function(){
    asideFixed()
});
window.addEventListener("resize",function(){
    asideFixed();
});

// 固定顶部 nav
var nav = $(".top-nav");
// document.onmousewheel = function(e){
//     e = e||window.event;
//     // console.log(e);
//     var wheelDelta = e.wheelDelta;
//     if(wheelDelta > 0){
//         // nav.style.position = "fixed";
//         nav.className = "top-nav";
//     }else{
//         nav.className = "top-nav top-nav-active"
//     }
// }
// document.addEventListener("mousewheel",function(e){
//     e = e||window.event;
//     // console.log(e);
//     var wheelDelta = e.wheelDelta;
//     if(wheelDelta > 0){
//         // nav.style.position = "fixed";
//         nav.className = "top-nav";
//     }else{
//         nav.className = "top-nav top-nav-active"
//     }
// })

//  顶部 nav 动画 下面的线条移动
(function(){

var list = document.getElementsByClassName("top-nav")[0];
var lis = list.getElementsByClassName("top-nav-item");
var lisActive = list.getElementsByClassName("top-nav-item-active");
var line = document.getElementById("top-nav-line");
var target = 0; //需要移动的距离
var current = lisActive[0].offsetLeft; //初始位置

//下划线
    //默认宽度为第一个元素的宽度加左右各15的padding
var width = parseInt(window.getComputedStyle(lisActive[0])["width"]);
// console.log()
line.style.width = width + 30 + "px";
leader = 0;  //目标位置
line.style.left=current+"px";
timer = null;
for(var i=0;i<lis.length;i++){
    lis[i].onmouseover = function(){
        target = this.offsetLeft;
        animate(window.getComputedStyle(this)["width"]);
    }
    lis[i].onmouseout = function(){
        target = current;
        animate(width);
    }
    lis[i].onclick = function(){
        current = this.offsetLeft;
        width = window.getComputedStyle(this)["width"];
        // list.getElementsByClassName("top-nav-item-active")[0].className="";
        // this.className="top-nav-item-active";
    }
}

function animate(width){
    clearInterval(timer);
    timer = setInterval(function(){
        var distance = (target-leader)/10;
        distance = distance>0?Math.ceil(distance):Math.floor(distance);
        leader = leader + distance;
        line.style.left=leader+"px";
        if(!distance){
            clearInterval(timer);
         }
    },5);
    setTimeout(function(){
    line.style.width=parseInt(width)+30+"px";
    },5);
}
}());

var timerGlobalTip = null;
// 函数
var copys = document.getElementsByClassName("copy");
for(var i=0;i<copys.length;i++){
	addEvent(copys[i],"click",(function(index) {
        return function(){
            var content = copys[index].dataset.content;
            clipboard(content, "复制成功: " + content);
        }
    }(i))
	)
}
function clipboard(text,tip){
	//用来控制提示持续的时间
	var duration = 2000;
    var node = document.createElement("textarea");
    node.value = text;
    document.body.appendChild(node);
    node.select();
    //判断是否支持copy
    	//手上的浏览器都是支持的(下至ie6,上至chrome52,无safari),但是某些情况下拒绝复制
    if(document.execCommand("Copy")){
	    tip = (tip==undefined)?"复制成功! ":tip;
    }else{
    	tip = "复制失败！内容: "+text;
    	duration = 6500;
    }
    console.log(tip);
    document.body.removeChild(node);
    //是否提示
    if(tip){
	    if(timerGlobalTip){
	    	clearTimeout(timerGlobalTip);
	    	timerGlobalTip=null;
	    }
	    showTip(tip,duration);
    }
}
function showTip(text,duration){
	duration = duration?duration:1500;
	//globalTip = $(".global-tip");
    globalTip = document.createElement("div");
    globalTip.style.cssText="opacity: 0;\
        height: 25px;\
        line-height: 25px;\
        letter-spacing: 1px;\
        font-size: .9em;\
        color: #fff;\
        padding: 5px 20px;\
        border-radius: 5px;\
        background-color: #666;\
        position: fixed;\
        z-index: 1001;\
        left: 50%;\
        bottom: 5%;\
        transform: translate(-50%);\
        transition: .4s;"
	globalTip.innerHTML=text;
	globalTip.style.opacity=1;
    document.body.appendChild(globalTip);
	//防止持续时间内多次触发提示
	if(!timerGlobalTip){
		timerGlobalTip = setTimeout(function(){
			globalTip.style.opacity=0;
			//timerGlobalTip = null;
            //document.body.removeChild(globalTip);
		},duration);
	}
}

// 事件添加函数
function addEvent(ele,event,handle){
    if(ele.addEventListener){
        ele.addEventListener(event,handle);
    }else if(ele.attachEvent){
        ele.attachEvent("on"+event,handle);
    }else{
        ele["on"+event] = handle;
    }
}

function $(obj){
    return document.querySelector(obj);
}
document.addEventListener("mousewheel",function(e){
    e = e||window.event;
    // console.log(e);
    var wheelDelta = e.wheelDelta;
    if(wheelDelta > 0){
        // nav.style.position = "fixed";
        nav.className = "top-nav";
    }else{
        nav.className = "top-nav top-nav-active"
    }
})