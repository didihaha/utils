
/**
 * 倒计时函数
 * @param {倒计时的结束时间，结构为"2017-06-15 00:00:00"} time
 * @param {倒计时的开始时间，比如活动开始时间为2017-06-11}} timeToStart
 * @param {放置倒计时的容器的id}} contentId
 */
function timeToEnd(time, contentId){
	contentId = document.getElementById(contentId);
	var alart_items = contentId.querySelectorAll("span");
	var item0 = alart_items[0], item1 = alart_items[1], item2 = alart_items[2], item3 = alart_items[3];
	var timer;
	var startTime = new Date().getTime();
	time          = time.replace(/-/g, "/");					//调整输入时间格式，适应移动端
	var endTime   = new Date(time).getTime();
	time 		  = endTime - startTime;
	var days, hours, minutes, seconds, leave;	
	timer = setInterval(function (){
		if (time < 1000){
			clearInterval(timer);
			return null;
		}
		time   	 -= 1000;
		days      = parseInt( time / (1000 * 60 *  60 * 24) );	//计算剩余的天数
		
		leave     = time - days * (1000 * 60 *  60 * 24);		//去除掉天数的时间
		hours     = parseInt( leave / (1000 * 60 * 60) );		//计算剩余的小时	
		
		leave     = leave - hours * (1000 * 60 * 60) ;
		minutes   = parseInt( leave / (1000 * 60) );				//计算剩余的分
		
		leave 	  = leave - minutes * 1000 * 60;
		seconds   = parseInt( leave / 1000 );				//计算剩余的秒
		
		//给小于10的数前面添加0
		days = days < 10 ? "0" + days : days ;
		item0.innerHTML = days;
		
		hours = hours < 10 ? "0" + hours : hours ;
		item1.innerHTML = hours;
		
		minutes = minutes < 10 ? "0" + minutes : minutes ;
		item2.innerHTML = minutes;
		
		seconds = seconds < 10 ? "0" + seconds : seconds ;
		item3.innerHTML = seconds;
		
	}, 1000)

}