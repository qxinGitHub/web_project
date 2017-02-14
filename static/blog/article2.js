var header = $(".top-nav");
console.log(document.referrer);
var node = document.createElement("a");
node.setAttribute("href",document.referrer);
// node.setAttribute("onclick","");
// node.innerHTML = ">";
node.setAttribute("title","返回");
node.className = "back";
node.style.float = "left";
node.style.cssText ="float:left; \
margin-left: 30px; \
width: 50px; \
height: 50px; \
transition: .5s; \
display:inline-block; \
background-image:url(../static/blog/images/arrow.png); \
background-repeat:no-repeat; \
background-size: 30px; \
background-position: center; \
transform:rotate(-90deg); \
";
var span = header.getElementsByTagName("span")[0];
header.insertBefore(node,span);

var back = $(".back");
window.addEventListener("scroll",function(e){
	if(document.body.scrollTop ==0){
		console.log("yes");
		back.style.transform = "rotate(-90deg)";
		back.setAttribute("title","返回");
		back.setAttribute("href",document.referrer);
		// back.setAttribute("onclick","document.referrer;");
	}else{	
		back.style.transform = "rotate(0deg)";
		back.setAttribute("title","顶部");
		back.setAttribute("href","#");
		// back.removeAttribute("onclick");
	}
})