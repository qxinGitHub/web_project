// {% load staticfiles %}
// js很乱,卷轴,背景,简历,弹窗都是单独写完后再拼接在一起

var timerScroll = null,
    //提示信息
    timerGlobalTip = null,
	//点击波纹
    timerRipple = null;
// 发送广告信息
    //需要在多个地方引用,从函数内部拿到外面
var ad=adMain();
// 卷轴 ----------------------------------------------------------------------
init();
function init(){
	//动画从此处开始
	var bgimg=new Image();
		bgimg.src='../static/resume/images/背景1000像素.png';
		bgimg.onload=function(){
			$(".background").style.background="url(../static/resume/images/背景1000像素.png) no-repeat";
			$(".background").style.backgroundSize="100% 100%";
			// $(".loading").style.display="none";
			// $(".loading").className="loadingover";
			$(".loading").style.cssText="opacity:0;"
			setTimeout(function(){
				$(".loading").style.display="none";
			},900)
			setTimeout(scrollMove,1000);
		};
}
// 卷轴动画
function scrollMove(){
	var scrollLeft = document.getElementsByClassName("scroll-wrapper-left")[0];
	var scrollRight = document.getElementsByClassName("scroll-wrapper-right")[0];
	var scrollWrapper = document.getElementsByClassName("scroll-wrapper");
	var left = parseInt(getComputedStyle(scrollLeft,false)["left"]);
	var right = parseInt(getComputedStyle(scrollRight,false)["right"]);

	scrollLeft.style.webkitTransform = "translate("+(-window.innerWidth/2)+"px,0)";
	scrollLeft.style.mozTransform = "translate("+(-window.innerWidth/2)+"px,0)";
	scrollLeft.style.msTransform = "translate("+(-window.innerWidth/2)+"px,0)";
	scrollLeft.style.transform = "translate("+(-window.innerWidth/2)+"px,0)";
	scrollLeft.style.webkitTransition = "5s ease-in-out";
	scrollLeft.style.mozTransition = "5s ease-in-out";
   // IE9 及以下不支持 transition
	//scrollLeft.style.msTransition = "5s ease-in-out";
	scrollLeft.style.transition = "5s ease-in-out";
	//scrollLeft.style.cssText = "transform:translate("+(-window.innerWidth/2)+"px,0;transition:5s ease-in-out";
	scrollRight.style.transform = "translate("+window.innerWidth/2+"px,0)";
	scrollRight.style.transition = "5s ease-in-out";

	setTimeout(function(){
		// 判断动画是否提前结束
		if(!timerResume){
			$(".scrolls").style.display = "none";
			timerResume = setInterval(moveResume,10);
		}
	},5000)

	//卷轴两边绑定提示和关闭事件
	for(var i=0;i<scrollWrapper.length;i++){
		scrollWrapper[i].addEventListener("mouseover",function(e){
			showTip("点击两侧,跳过动画");
		});
		//关闭滚轴
		scrollWrapper[i].addEventListener("click",function(e){
			scrollRight.style.transition = "0s";
			scrollLeft.style.transition = "0s";
			scrollRight.style.right = -window.innerWidth/2 + "px";
			scrollLeft.style.left = -window.innerWidth/2 + "px";
			$(".scrolls").style.display = "none";
            // 广告
            ad(e);
			// 开始下一个动画
			timerResume = setInterval(moveResume,10);
		});
	}
}
//骚扰信息
// 素质点,骚扰的方式素质点
    //两次点击间隔小于 5s 则不进行复制
function adMain(){
    console.log("ad start");
    var oldTime= 0,
        textData = ''
        + '\n\t前端求职\n\n'
        + '姓名: 王庆欣\n'
        + '邮箱: qxguge@gmail.com\n'
        + '主页: iqingxin.cn\n'
        + '关于:\n'
        + '     ▄︻┻═┳一    Orz\n'
        + '  此信息的出现是因为\n'
        + '  点击了背景(或许其他)。\n'
        + '  干扰了剪贴板,深感抱歉\n\n'
        + '\twww.iqingxin.cn\n\n';

    function b(e){
        //console.log("闭包 b"+ e.timeStamp);
        if(e.timeStamp > oldTime+5000 || e.timeStamp<5000){
            clipboard(textData,false);
        }
        oldTime = e.timeStamp;
    }
    return b;
}
// 广告
var main = $(".container");
addEvent(main,"click",function(e){
    ad(e);
});


// 鼠标点击波纹
//(function(){
    var ripple = document.getElementsByClassName("bg")[0];
    console.log(ripple);
    ripple.addEventListener("click",function(e){
        var left = e.clientX,
            top = e.clientY;
        rippleMain(left,top);
        //广告 闭包
		ad(e);
    })
    //波纹的实现
    function rippleMain(left,top){
        //console.log("鼠标点击: "+left,top);
        var node = document.createElement("div");
        node.className = "ripple "+"ripple"+top;
        node.style.cssText = " top:" + top + "px;left:" + left + "px";
        var node2 = node.cloneNode(true),
            node3 = node.cloneNode(true);
        ripple.appendChild(node);
        setTimeout(function(){ripple.appendChild(node2);},100);
        setTimeout(function(){ripple.appendChild(node3);},300);
        setTimeout(function(){
            var rNode = document.getElementsByClassName("ripple"+top),
                rNode_length = rNode.length-1;
            for(var i = rNode_length;i>=0;i--){
                ripple.removeChild(rNode[i]);
            }
            if(!timerRipple){
                timerRipple = setTimeout(function(){
                    var x = parseInt(Math.random()*window.innerWidth);
                    var y = parseInt(Math.random()*window.innerHeight);
                    var time = parseInt(Math.random()*9000+500);
                    console.log(x,y,time);
                    //console.log(time);
                    rippleMain(x,y);
                    setTimeout(arguments.callee,time);
                },10000)
            }
        },5000);
		if(timerRipple){
			clearTimeout(timerRipple);
		}
    }

    // ripple auto
	timerRipple = setTimeout(function(){
        var x = parseInt(Math.random()*window.innerWidth);
        var y = parseInt(Math.random()*window.innerHeight);
        var time = parseInt(Math.random()*9000+500);
        //console.log(x,y,time);
        //console.log(time);
        rippleMain(x,y);
        setTimeout(arguments.callee,time);
    },10000)

//})()
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

fish();
//创建画布
function fish(){

	// console.log("onload start");

	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	ctx.fillStyle="#E3DCD3";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	myImage = document.createElement("img");
	myImage.src = "../static/resume/images/fish.png";
	myImage.onload = loaded();
	console.log
}

//鱼开始运动
function loaded(){
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
		//可以保证接下来的两次运动(来回甩尾)速度一样,防止甩尾的速度变化过快
		judge=judge?false:true;
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
	if(x<1.35*-window.innerWidth || y<1.35*-window.innerHeight){
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
		//两条从左上往右下的鱼;
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

		// 随机出现10(以实际设置为准)只鱼,多了可能会有9只,少了可能会进入贤者时间。
        for(var i=0;i<6;i++){
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
//元素距屏幕距离
function getPos(ele){

  var pos={x:null,y:null}
  var offsetParent=ele.offsetParent;
  while(offsetParent){
    pos.x+=ele.offsetLeft;
    pos.y+=ele.offsetTop;
    ele=ele.offsetParent;
    offsetParent=ele.offsetParent;
    //if(offsetParent==document.body)
    //return pos;
    //只有body没有offsetParent，body已经是顶级元素了
  }
  return pos;
}

// 主体 ----------------------------------------------------
var skill = document.getElementsByClassName("skill");
var tip = document.getElementsByClassName("tip")[0];
var tipContent = tip.querySelector("em");

var timerResume = null;
var main = document.querySelectorAll(".main")[0];
// 先获取最大高度,然后设置为0,方便后面动画动态还原高度
var maxHeight = main.offsetHeight;
main.style.height = 0;

function moveResume(){
	var height =  parseInt(main.style.height);
	main.style.height = height + 6 +"px";
	if(height>maxHeight){
		clearInterval(timerResume);
        // IE 下 svg 没有动画效果, 直接去掉
		if(window.ActiveXObject || "ActiveXObject" in window){
            var sign = $(".sign");
            sign.style.transition="1s";
            sign.style.opacity="0";
            setTimeout(function(){
                sign.parentNode.removeChild(sign);
            },1000);

		}else{
			setTimeout(sign,500);
		}

	}
}
//签名
function sign(){
    $(".main").style.overflow="visible"

    //签名动画
	var svg = document.querySelector('.full-sketch-container svg');
  	svg.parentNode.style.display = 'block';
  	svg.style.visibility = 'hidden';
	function toArray(arr) {
    	return Array.prototype.slice.call(arr);
  	}
	svg.style.visibility = '';
	  var paths = toArray(svg.querySelectorAll('path:not(.shade)'));
	  console.log(paths.length);
	  // paths.push(svg.querySelector('.shade'));
	  var begin = 0;

	  // console.log(paths.length);
	  console.log(durations);
	  var durations = paths.map(function(path) {
	    var length = path.getTotalLength();
	    console.log(length);
	    var className = path.getAttribute('class') || '';

	    path.style.strokeDasharray = length + ' ' + length;
	    path.style.strokeDashoffset = length;

	    // no classList on svg elements in Safari :(
	    if (className.indexOf('shade') != -1) {
	      return 5;
	    }
	    else if (className.indexOf('letter') != -1) {
	      return Math.pow(length, 0.5) * 0.02;
	    }
	    else {
	      return Math.pow(length, 0.5) * 0.05;
	    }
	  });

	  // triggering a reflow so styles are calculated in their
	  // start position, so they animate from here
	  paths[0].getBoundingClientRect();

	  paths.forEach(function(path, i) {
	    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset ' + durations[i] + 's ' + begin + 's ease-in-out';
	    path.style.strokeDashoffset = '0';
	    begin += durations[i] + 0.1;
          console.log(begin);
	  });
    console.log("begin: " +begin);
    svg.parentNode.style.transition="all 1s";
    //印章出现
    setTimeout(function(){
        $(".seal").style.opacity="1";
    },begin*1000); // 一个坑,begin为毫秒,需要乘1000
    //挪动到右侧
    setTimeout(function(){
        var svgParentStyle = svg.parentNode.style;
        svgParentStyle.webkitTransform="scale(0.5)";
        svgParentStyle.left = "83%";
        svgParentStyle.top = "-5%";
        svgParentStyle.background="transparent";
    },begin*1000+2000);
}

// 技能上的弹窗
for(var i=0;i<skill.length;i++){
// console.log("技能弹窗 动画");
// 鼠标划入
    skill[i].index = i;
	skill[i].addEventListener("mouseover",function(){
		// console.log(this.offsetLeft);
		tipContent.innerHTML = isIE()?skill[this.index].getAttribute("data-content"):skill[this.index].dataset.content;
		tip.style.transition="none";

        // 移动距离
        var dis = (tip.offsetWidth - this.offsetWidth)/2;
        tip.style.left = this.offsetLeft - dis + "px";
        // 此处及上面的 transition 可以保证每次划过都会有下滑的动画,
        tip.style.transition="opacity .4s,top .4s";
		tip.style.opacity=1;
		tip.style.top = "10px";
	})
 // 鼠标划出
	skill[i].addEventListener("mouseout",function(){
		tip.style.opacity=0;
		tip.style.top="-10px";
	})
}





//  -------------    求职遮罩
	//此段代码为 百度前端学院ife 任务37:UI组件之浮出层

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
		//遮盖层 阴影
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
		this.maskEle.className="cover-wrap";

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
		this.maskEle.onclick=function(e){
			layer.hide();
            ad(e);
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
			removeEvent(document,'mousemove',move);
			})
		})
	}
}


var layer = new floatLayer($('#cover'));
layer.hide();
var callCover = $$(".callCover");
console.log(callCover);
for(var i=0;i<callCover.length;i++){
	// console.log(i);
	callCover.index=i;
	addEvent(callCover[i],'click',function(){
		console.log("hi");
		layer.show()
	});
}
//layer.show();
// 提示
addEvent($(".background-cover"),"mouseenter",function(){
	showTip("点击阴影,关闭弹窗");
});


function $(el){
	return document.querySelector(el);
}
function $$(el){
	return document.querySelectorAll(el);
}

//绑定 copy 事件
var copys = document.getElementsByClassName("copy");
for(var i=0;i<copys.length;i++){
	addEvent(copys[i],"click",(function(index) {
        return function(){
            if(isIE()){
                console.log(copys[index].getAttribute("data-contact"));
                var contact = copys[index].getAttribute("data-contact");
            }else{
                var contact = copys[index].dataset.contact;
            }

            clipboard(contact, "复制成功: " + contact);
        }
    }(i))
	)
}

//事件添加函数
function addEvent(ele,event,handle){
	if(event==='mouseenter'){
    	addEvent(ele,'mouseover',withoutChildFunction(handle));
	}else if(ele.addEventListener){
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
function withoutChildFunction(func){
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

// 函数:向剪贴板发送内容
	// text 是需要复制的文字, 传入字符串
	// tip 是否提示,可选,三种方式
		// 不传参,默认显示提示 "复制成功！"
		// 字符串, 提示传入的字符串
		// 传入false 关闭提示;(本意是只用false,实质上,传入数字0等也会不显示)
    //此方法堪称完美,8行代码,但搜索复制方法时,都是使用插件来完成,不解
    //已知:
    	//已被限制,safari无效果,且必须是用户触发才能响应,否则下面的if判断处返回 false;
    	//所以当用户关闭求职页面时,发送简历信息到剪贴板无果
function clipboard(text,tip){
    // 判断 IE
        // IE 会弹窗询问用户是否允许访问剪贴板, 所以在 IE 下是无法偷偷修改剪贴板
    if(tip===false && isIE()){
        //if(window.ActiveXobject || "ActiveXObject" in window){
            return;
        //}
    }
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
// 提示
	// 参数:提示内容 str, 持续时间 int(可选,默认1.5s)
	// -todo:用creat创建,add添加,显示完成后remove,能够更方便的移植(已在博客中实现)
function showTip(text,duration){
	duration = duration?duration:1500;
	globalTip = $(".global-tip");
	globalTip.innerHTML=text;
	globalTip.style.opacity=1;
	//防止持续时间内多次触发提示
	if(!timerGlobalTip){
		timerGlobalTip = setTimeout(function(){
			globalTip.style.opacity=0;
			timerGlobalTip = null;
		},duration);
	}
}

// 判断 IE
function isIE(){
    //if(window.ActiveXObject || "ActiveXObject" in window){
    //    return true;
    //}else{
    //    return false;
    //}
    return (window.ActiveXObject || "ActiveXObject" in window)?true:false;
}