// {% load staticfiles %}
// function $(ele){
// 	return document.querySelectorAll(ele);
// }

// 卷轴 ----------------------------------------------------------------------
var scrollLeft = document.getElementsByClassName("scroll-wrapper-left")[0];
var scrollRight = document.getElementsByClassName("scroll-wrapper-right")[0];
var globalTip = document.getElementsByClassName("global-tip")[0]
var scrollWrapper = document.getElementsByClassName("scroll-wrapper");
var timerScroll = null;
var timerGlobalTip = null;

function init(){
	timerScroll = setInterval(move,5);
}
// 卷轴动画
function move(){
	var left = parseInt(getComputedStyle(scrollLeft,false)["left"]);
	var right = parseInt(getComputedStyle(scrollRight,false)["right"]);
	// 设置两级速度
		// 开始慢  后面快些
		// todo: css3实现 || 提取成函数
	if(left>-250){
		scrollLeft.style.left = left - 1 + "px";
		scrollRight.style.right = right - 1 +"px";
	}else{
		scrollLeft.style.left = left - 2 + "px";
		scrollRight.style.right = right - 2 +"px";
	}



	if(left < -window.innerWidth/2){
		clearInterval(timerScroll);
		$(".scrolls").style.display = "none";
		// 简历展开的动画
		timerResume = setInterval(moveResume,10);
	}
}
init();
//卷轴两边绑定提示和关闭事件
for(var i=0;i<scrollWrapper.length;i++){
	scrollWrapper[i].addEventListener("mouseover",function(){
		globalTip.innerHTML="<em>点击两侧,关闭动画</em>";
		globalTip.style.opacity=1;
		//防止多次触发提示
		if(!timerGlobalTip){
			timerGlobalTip = setTimeout(function(){
				globalTip.style.opacity=0;
				timerGlobalTip = null;
			},1500);
		}
	});

	//关闭滚轴
	scrollWrapper[i].addEventListener("click",function(){
		scrollRight.style.right = -window.innerWidth/2 + "px";
		scrollLeft.style.left = -window.innerWidth/2 + "px";
	});
}

// 鱼 --------------------------------------------------------------------------
var ctx = null;
var myImage = null;
var timer = null;
var mouseX,
	mouseY;
var count = 0;
var x = window.innerWidth,
	y = window.innerHeight;
//给鱼的初始速度, 后面会随机给 10~25(参考,具体范围看后面)
var random = 20;
// 可以让鱼的两次摆尾速度一致
var judge = true;

//鱼的角度
var angle = new Array(10);
for(var i=0;i<angle.length;i++){
	angle[i] = parseInt(Math.random()*359,10)
}
// console.log("start");

//创建画布
window.onload = function(){

	// console.log("onload start");

	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	ctx.fillStyle="#E3DCD3";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	myImage = document.createElement("img");
	myImage.src = "../static/images/fish.png";
	myImage.onload = loaded();
	console.log
}

//给鼠标绑定事件
function loaded(){
		//鱼开始运动
	if(!timer){
			update();
		}

	//窗口变化后  鱼不会被拉伸
    window.addEventListener("resize",function(){
    	// console.log("resize");
    	canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		ctx.fillStyle="#E3DCD3";
		ctx.fillRect(0, 0, window.innerWidth,window.innerHeight );
		if(timer){
			clearTimeout(timer);
		}
		update();
		 },false);
}

//定时器
function update(){
	redraw();
	if(count++>15){
		count = 3;
		//可以保证接下来的两次运动(来回甩尾)速度一样
		judge=judge?false:true
	}
	// console.log(count);
	if(timer){
		clearTimeout(timer);
	}

	if(count >15&&judge ){
		//给鱼随机速度 10~25
		random = parseInt(Math.random()*10+15,10)
	}

	//鱼的摆尾速度
	timer = setTimeout(update,1000/random);
}

//绘制函数
function redraw(){
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	ctx.fillStyle="#E3DCD3";
	ctx.fillRect(0, 0, window.innerWidth,window.innerHeight );
	//计算图片的相关属性
	//offw,off 起源图像的起始坐标点
	//width,height 源图像的宽高
	//x y 源图像在canvas上的起始坐标点(鱼的位置)
	var height = myImage.naturalHeight/17;
	var width = myImage.naturalWidth;
	var offw = 0;
	var offh = count*height;

	//鱼的游动速度
	x = x-5;
	y = y-5;
	//此处的 1.2 是猜的,小了会出现鱼突然消失,大了会很长时间看不到鱼
	if(x<1.2*-window.innerWidth || y<1.2*-window.innerHeight){
		// clearTimeout(timer);
		// console.log(timer);
		x = window.innerWidth;
		y = window.innerHeight ;
		for(var i=0;i<angle.length;i++){
			angle[i] = parseInt(Math.random()*359,10);
		}
	}
	//三条 右下往左上的鱼
	ctx.drawImage(myImage,offw,offh,width,height,x,y,width,height);
	ctx.drawImage(myImage,offw,offh,width,height,(x-angle[1]*2),y+angle[2]*2,width,height);
	ctx.drawImage(myImage,offw,offh,width,height,x-angle[3]*3,y+angle[4]*3,width,height);

	//旋转点右上角
		//此处会出现两条从左上往右下跑的鱼;
	    ctx.save();//保存状态
        ctx.translate(window.innerWidth,0);
        ctx.rotate(180*Math.PI/180);
        ctx.drawImage(myImage, offw, offh, width, height,(x-angle[1]),y+angle[2]*2, width, height);//把图片绘制在旋转的中心点，
        ctx.drawImage(myImage, offw, offh, width, height,(x-angle[3]),y-angle[4]*2, width, height);//把图片绘制在旋转的中心点，
        ctx.restore();//恢复状态
	//旋转 90度
	    ctx.save();//保存状态
        ctx.translate(window.innerWidth/2,window.innerHeight/2);
        ctx.rotate(90*Math.PI/180);
        ctx.drawImage(myImage, offw, offh, width, height, x, y, width, height);//把图片绘制在旋转的中心点，
        ctx.restore();//恢复状态

		// 随机出现10只鱼,多了可能会有9只,少了可能会进入贤者时间。
        for(var i=0;i<10;i++){
        	ctx.save();
            ctx.translate(window.innerWidth/2,window.innerHeight)/2;
            ctx.rotate(angle[i]*Math.PI/180);
            ctx.drawImage(myImage, offw, offh, width, height, x, y, width, height);
            ctx.restore();
        }
}

//获取鼠标的位置
function mouseCoords(ev)
{
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return{
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}


// 主体 ----------------------------------------------------
var skill = document.getElementsByClassName("skill");
var tip = document.getElementsByClassName("tip")[0];
var tipContent = tip.querySelector("em");

var timerResume = null;
var main = document.querySelectorAll(".main")[0];
// 先获取最大高度,然后设置为0,方便后面动画动态还原高度
var maxHeight = main.offsetHeight;
console.log(maxHeight);
main.style.height = 0;

function moveResume(){
	var height =  parseInt(main.style.height);
	main.style.height = height + 6 +"px";
	if(height>maxHeight){
		clearInterval(timerResume);
		var body = document.querySelectorAll("body")[0];
		body.style.minHeight = maxHeight + "px";
	}
}

// 技能上的弹窗
for(var i=0;i<skill.length;i++){
	skill[i].index = i;
	console.log("技能弹窗 动画");
	// 鼠标划入
	skill[i].addEventListener("mouseover",function(){
		// console.log(this.offsetLeft);
		tipContent.innerHTML = skill[this.index].dataset.content;

		// 移动距离
		// var that = this;
		var dis = (tip.offsetWidth - this.offsetWidth)/2;
		tip.style.left = this.offsetLeft - dis + "px";
		tip.style.opacity=1;
		tip.style.top = "10px";
	})


	// 鼠标划出
	skill[i].addEventListener("mouseout",function(){
		tip.style.opacity=0;
		tip.style.top="-10px";
		// tipContent.innerHTML = "这里有一串神奇的文字";
	})
}












//  -------------    求职遮罩
function $(el){
	return document.querySelector(el);
}
function $$(el){
	return document.querySelectorAll(el);
}
//事件添加函数
function addEvent(ele,event,handle){
	if(event==='mouseenter')
    	addEvent(ele,'mouseover',this.withoutChildFunction(handle));
	if(ele.addEventListener){
		ele.addEventListener(event,handle,false);
	}else if(ele.attachEvent){
		ele.attachEvent('on'+event,handle);
	}else{
		ele['on'+event]=handle;
	}
}
function removeEvent(ele,event,handle){
	if(ele.removeEventListener){
		ele.removeEventListener(event,handle);
	}else if(ele.detachEvent){
		ele.detachEvent('on'+event,handle);
	}else{
		ele['on'+event]=null;
	}
}
// 供 mouseenter 方法使用
var withoutChildFunction=function(func){
    return function(e){
        var parent=e.relatedTarget;//上一响应mouseover/mouseout事件的元素
        while(parent!=this&&parent){//假如存在这个元素并且这个元素不等于目标元素（被赋予mouseenter事件的元素）
            try{
                parent=parent.parentNode;}//上一响应的元素开始往上寻找目标元素
            catch(e){
                break;
            }
        }
        if(parent!=this)//以mouseenter为例，假如找不到，表明当前事件触发点不在目标元素内
        func(e);//运行目标方法，否则不运行
    }
}

var floatLayer=function(element){
	this.ele=element;
	this.visible=false;
	this.maskEle=null;

	this.init();
}
floatLayer.prototype={
	show: function(){
		this.maskEle.style.opacity='1';
		this.maskEle.style.visibility='visible';
		//将弹窗复位
		this.ele.style.left='50%';
		this.ele.style.top='50%';
	},
	hide: function(){
		this.maskEle.style.opacity='0';
		this.maskEle.style.visibility='hidden';
	},
	init:function(){
		//遮盖层
		this.maskEle=document.createElement('div');
		this.maskEle.style.backgroundColor='rgba(0,0,0,.8)';
		this.maskEle.style.position='fixed';
		this.maskEle.style.zIndex=1000;
		this.maskEle.style.width=window.screen.width+'px';
		this.maskEle.style.height=window.screen.height+'px';
		this.maskEle.style.top='50%';
		this.maskEle.style.left='50%';
		this.maskEle.style.transform='translate(-50%, -50%)';
		//this.maskEle.style.opacity=0;
		this.maskEle.style.transition='600ms all';

		//弹出窗
		this.ele.style.position='absolute';
		this.ele.style.top='50%';
		this.ele.style.left='50%';
		this.ele.style.width=this.ele.clientWidth+'px';
		this.ele.style.transform='translate(-50%,-100%)';

		//添加至 html
		this.ele.parentNode.removeChild(this.ele);
		this.maskEle.appendChild(this.ele);
		document.body.appendChild(this.maskEle);

		//给 this.maskEle 添加退出事件
		this.maskEle.onclick=function(){
			layer.hide();
		}
		//阻止退出事件的冒泡冒泡
		this.ele.onclick=function(e){
			e.stopPropagation();
		}
		this.setdrag(this.ele.children[0]);

	},
	setdrag: function(node){
		var x,y;
		var that=this;
		addEvent(node,'mousedown',function(event){
			x=event.clientX - that.ele.offsetLeft;
			y=event.clientY - that.ele.offsetTop;

			function move(event){
				that.ele.style.left=event.clientX - x+'px';
				that.ele.style.top=event.clientY - y+'px';
			}
			addEvent(document,'mousemove',move);
			addEvent(document,'mouseup',function(){
				// document.removeEventListener('mousemove',move,false);
				removeEvent(document,'mousemove',move);
			})
		})
	}
}


var layer = new floatLayer($('#cover'));
layer.hide();
//绑定事件
// $('#login').onclick=function(){
	// layer.show();
// }
var callCover = $$(".callCover");
console.log(callCover);
for(var i=0;i<callCover.length;i++){
	console.log(i);
	callCover.index=i;
	addEvent(callCover[i],'click',function(){
		console.log("hi");
		layer.show()
	});
}
// $('#enter').onclick=function(){
// 	layer.hide();
// }
// $('#cancel').onclick=function(){
// 	layer.hide();
// }
// 提示
timerGlobalTip = null;
console.log($(".background-cover"));
addEvent($(".background-cover"),"mouseenter",function(){
	globalTip = $(".global-tip");
	globalTip.innerHTML="<em>点击阴影,关闭弹窗</em>";
	globalTip.style.opacity=1;
	//防止多次触发提示
	if(!timerGlobalTip){
		timerGlobalTip = setTimeout(function(){
			globalTip.style.opacity=0;
			timerGlobalTip = null;
		},1500);
	}
});

//绑定 copy 事件
var copys = document.getElementsByClassName("copy");
for(var i=0;i<copys.length;i++){
	copys[i].index=i;
	addEvent(copys[i],"click",function(){
		// var text = $('#copyBridge');
		// text.value=copys[this.index].dataset.contact;
		// text.select();
		// document.execCommand("Copy");
		// // p.focus();
		// text.blur();
		clipboard(copys[this.index].dataset.contact,"复制成功: "+copys[this.index].dataset.contact);

	})
}
// 函数:向剪贴板发送内容
	// text 是需要复制的文字, 传入字符串
	// tip 是否提示,可选,三种方式
		// 不传参,默认显示提示 "复制成功！"
		// 字符串, 提示中显示传入的字符串
		// 传入false 为关闭提示
function clipboard(text,tip){
	console.log(text,tip);
	//用来控制提示持续的时间
	var duration = 2000;
    var node = document.createElement("textarea");
    node.value = text;
    document.body.appendChild(node);
    node.select();
    //判断是否支持copy
    	//由于手上的浏览器都是支持的(下至ie6,上至chrome52,无safari),所以else没遇到过。不过据说有些不支持,所以就加上喽
    	//此方法堪称完美,但搜索复制方法时,都是使用插件来完成,不解
    if(document.execCommand("Copy")){
	    tip = (tip==undefined)?"复制成功! ":tip;
    }else{
    	tip = "复制失败！内容: "+text;
    	duration = 3500;
    }
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
// 函数:提示
	// 参数:提示内容, 持续时间(可选,默认1.5s)
	// todo:用creat创建,add添加,显示完成后remove,能够更方便的移植
function showTip(text,duration){
	var duration = duration?duration:1500;
	globalTip = $(".global-tip");
	globalTip.innerHTML=/*"<em>"+*/text/*+"</em>"*/;
	globalTip.style.opacity=1;
	//防止持续时间内多次触发提示
	if(!timerGlobalTip){
		timerGlobalTip = setTimeout(function(){
			globalTip.style.opacity=0;
			timerGlobalTip = null;
		},duration);
	}
}
// });