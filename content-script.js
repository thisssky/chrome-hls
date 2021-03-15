function notifyExtension(e) {
    var target = e.target;
    while ((target.tagName != "A" || !target.href) && target.parentNode) {
        target = target.parentNode;
    }
    if (target.tagName != "A")
        return;

    chrome.runtime.sendMessage({
        "createNotification": "createNotification",
        "url": target.href
    });
}
//window.addEventListener("click", notifyExtension);

//隐藏操作
function hideOpt(info){
	var datenow = new Date();
	var mm = datenow.getTime();
	var li=info.pageUrl.indexOf("://");
	var pre=info.pageUrl.substring(0,li+3);
	var suffix=info.pageUrl.substring(li+3);
	var li2=suffix.indexOf("/");
	var ws="";
	if(-1!=li2){
		ws+=pre;
		ws+=suffix.substring(0,li2);
	}
	
	// document.body.style.border="green 2px solid";

	var sobj={};
	// var dscripts=document.body.getElementsByTagName("script");
	// for(var i=0,len=dscripts.length;i<len;i++){
		// console.log(dscripts[i]);
		// sobj[scripts[i].src]=mm;
	// }
	
	var scripts=document.scripts;
	// console.log(scripts.length+"个<script>");
	//ad {ad:{ws:{js:mm}}}
	for(var i=0,len=scripts.length;i<len;i++){
		if(scripts[i].src!=""){
			//console.log(scripts[i]);
			if((scripts[i].src.indexOf("http://")!=-1)||(scripts[i].src.indexOf("https://")!=-1)){
				//console.log(scripts[i]);
				//console.log("================");
				sobj[scripts[i].src]=mm;
			}
		}
	}
	// console.log(sobj);
	
	chrome.storage.local.get("ad").then((result)=>{
		if(result.hasOwnProperty("ad")){
			//console.log(result.ad);
			if(result.ad.hasOwnProperty(ws)){
				//update
				//console.log(result.ad.hasOwnProperty(ws));
				for(k in sobj){
					result.ad[ws][k]=sobj[k];
				}
			}else{
				result.ad[ws]=sobj;
			}
			//console.log(result);
			chrome.storage.local.set(result);
		}else{
			var obj = {};
			obj[ws]=sobj;
			chrome.storage.local.set({"ad":obj});
		}
		//及时通知backgroun.js,使得blockjs做出改变
		chrome.runtime.sendMessage({"type":"change"});
	});
}

function getIframeDocument(ele) {
    return  ele.contentDocument || ele.contentWindow.document;
}

function addhlsws(){
	//console.log("contentscript===========addhlsws=========");
	var vs=document.getElementsByTagName("video");
	var len=vs.length;
	for(var i=0;i<len;i++){
		//console.log(vs[i]);
	}
	
	var fs=document.getElementsByTagName("iframe");
	var flen=fs.length;
	for(var i=0;i<flen;i++){
		//console.log(fs[i]);
		//console.log(getIframeDocument(fs[i]));
		console.log(fs[i].contentDocument);
		console.log(fs[i].contentWindow.document);
		var fobj=fs[i].contentWindow.document;
		fobj.body.style.border="1px red solid;";
		//var fvs=fs[i].contentWindow.document.getElementsByTagName("video");
		//console.log(fvs);

		// for(var j=0,fvlen=fvs.length;j<fvlen;j++){
			// console.log(fvs[j]);

		// }
	}
}

//接收从background.js发送的消息
function getMessage(info){
	//console.log(info);
	if(info.type=="hidden"){
		hideOpt(info);
	}
	if(info.type=="addhlsws"){
		addhlsws();
	}
}
chrome.runtime.onMessage.addListener(getMessage);


function getBySrc(src){
	var imgs=document.images;
	var parents=[];
	for(var i=0,len=imgs.length;i<len;i++){
		if(src==imgs[i].src){
			var pn=getParent(imgs[i]);
			pn.style.display="none";
			break;
		}
	}
}
function getByHref(href){
	var links=document.links;
	var parents=[];
	for(var i=0,len=links.length;i<len;i++){
		if(href==links[i].href){
			var pn=getParent(links[i]);
			pn.style.display="none";
			break;
		}
	}
}

function getParent(node){
	var bn=document.body;
	while(node.parentNode!=bn){
		node=node.parentNode;
	}
	return node;
}

function setHLSWSPosition(){
	var svideo=document.getElementById("video1");
	var p = GetElCoordinate(svideo);
	//console.log(p);
	document.getElementById("hlsws").style.position = "absolute";
	document.getElementById("hlsws").style.display = "inline";
	document.getElementById("hlsws").style.zIndex = 1;
	document.getElementById("hlsws").style.left = parseInt(p.left+p.width-34)+"px";
	document.getElementById("hlsws").style.top = parseInt(p.top)+"px";
}
	
function GetElCoordinate(e){
	var t = e.offsetTop;
	var l = e.offsetLeft;
	var w = e.offsetWidth;
	var h = e.offsetHeight;
	while (e = e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	return {
		top: t,
		left: l,
		width: w,
		height: h,
		bottom: t + h,
		right: l + w
	}
}