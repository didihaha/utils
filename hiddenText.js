//超过指定高度文本隐藏方法
function overflowHidden(contentId, rows, str){
	var text = document.getElementById(contentId);
	var textHeight = getProp(text, 'lineHeight');		//获取段落的行高
	var at = rows * parseInt(textHeight);				//计算段落内容的高度
	text.innerHTML = str;								//传入的文本先写入该对象
	var i = 0;
	if (text.offsetHeight <= at){						//如果段落内容总高度不大于该元素的高度，返回
		return null;
	} else {											//段落内容总高度大于元素高度，则进行判断后的切割
		var temp = "";
		text.innerHTML = temp;							//重置text部分的文本,用于判断其与设定行数的高度的关系
		while (text.offsetHeight <= at){
			temp += str.substring(i, i + 1);
			i++;
			text.innerHTML = temp;
		}
		var length = temp.length;
		temp = str.substring(0, length - 4);			//切割四个文字位置
		text.innerHTML = temp + "...";					//写入文本
	}
}
/**
 * 
 * @param {需要获取样式的对象} obj	
 * @param {需要获取的样式} prop	
 */
function getProp(obj, prop){
//	IE方法检测及其他浏览器方法检测
	if (obj.currentStyle){
		return obj.currentStyle[prop];
	} else if(window.getComputedStyle){
		return window.getComputedStyle(obj, null)[prop];
	}
	return null
}