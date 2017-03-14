var WIDTH=document.documentElement.clientWidth ||document.body.clientWidth;
var HEIGHT=document.documentElement.clientHeight ||document.body.clientHeight;
//获取当前时间；
var lastTime=getCurrentTime();
	window.onload=function(){
// 获取tick音频；
		var audio=document.getElementsByTagName('audio')[0];
		audio.play();
		audio.loop="loop";
// 获取日期文本框；
		var d=document.getElementsByTagName('input')[0];
		d.value=""
		console.log(lastTime);
		var canvas=document.getElementById('clock');
		var context=canvas.getContext("2d");
		canvas.width=0.8*WIDTH; 	 //1092
		canvas.height=0.8*HEIGHT;  
		
// 实时画指针；
		var timer=setInterval(function(){
			update();
			render(context, lastTime, 0.4*WIDTH,0.4*HEIGHT,0.4*HEIGHT)

		},1000);

 }

 //function 定义一个render函数；
 	function render(cxt,time,x,y,R){
		cxt.globalCompositeOperation="destination-over";
 		cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);
 		cxt.beginPath();
		cxt.arc(0.4*WIDTH,0.4*HEIGHT,0.4*HEIGHT,0,2*Math.PI);
		cxt.fillStyle="rgba(158,232,212,0.1)";
		cxt.fill();
		cxt.stroke();
// 画上时钟的中心点；
		cxt.save();
		cxt.beginPath();
		cxt.arc(x,y,6,0,2*Math.PI);
		cxt.fillStyle="#F03082";
		cxt.fill();
		cxt.restore();
		cxt.save();
		drawTick(cxt, x,y,R)
 	drawSecondPointer(cxt, time, x, y, R);
		drawMinutePointer(cxt, time, x, y, R);
		drawHourPointer(cxt, time, x, y, R)
		cxt.restore();
 	}

// function 定义一个更新函数；
	function update(){
		var curTime=getCurrentTime();
		lastTime=curTime;
	}

 // function定义刻度线和数字的绘制；
	function drawTick(cxt,x,y,R){
		cxt.lineWidth=6;
		for (var i = 0; i < 4; i++) {
			cxt.beginPath();
			cxt.moveTo(R*Math.cos(90*i/180*Math.PI)+x,y-R*Math.sin(90*i/180*Math.PI));
			cxt.lineTo(0.95*R*Math.cos(90*i/180*Math.PI)+x,y-0.95*R*Math.sin(90*i/180*Math.PI));
			cxt.lineWidth=6;
			cxt.stroke();
			}
		for (var i = 0; i <12; i++) {
			if(i%3!=0){
			cxt.beginPath();
			cxt.moveTo(R*Math.cos(30*i/180*Math.PI)+x,y-R*Math.sin(30*i/180*Math.PI));
			cxt.lineTo(0.975*R*Math.cos(30*i/180*Math.PI)+x,y-0.975*R*Math.sin(30*i/180*Math.PI));
			cxt.lineWidth=4;
			cxt.stroke(); }
		}
		for (var i = 0; i <60; i++) {
			if(i%5!=0){
			cxt.beginPath();
			cxt.moveTo(R*Math.cos(6*i/180*Math.PI)+x,y-R*Math.sin(6*i/180*Math.PI));
			cxt.lineTo(0.985*R*Math.cos(6*i/180*Math.PI)+x,y-0.985*R*Math.sin(6*i/180*Math.PI));
			cxt.lineWidth=1;
			cxt.stroke(); }
		}

// 写上数字
		cxt.font="20px microsoft yahei";
		cxt.textAlign="center";
		cxt.textBaseline="middle";
		cxt.fillStyle="#EE8F16";
		for (var i = 0; i <12; i++) 
			cxt.fillText(i+1,0.85*R*Math.cos((60-30*i)/180*Math.PI)+x,y-0.85*R*Math.sin((60-30*i)/180*Math.PI))

	
}


	function drawSecondPointer(cxt,time,x,y,R){
		cxt.lineWidth=3;
		cxt.strokeStyle="red";
		cxt.beginPath();
		cxt.moveTo(0.90*R*Math.cos((90-6*time.second)/180*Math.PI)+x,y-0.90*R*Math.sin((90-6*time.second)/180*Math.PI));
		cxt.lineTo(-0.1*R*Math.cos((90-6*time.second)/180*Math.PI)+x,y+0.1*R*Math.sin((90-6*time.second)/180*Math.PI));
		// cxt.lineTo(x,y);
		cxt.save();
		// cxt.clip();
		cxt.stroke();
		cxt.restore();
	}

// function画上分针；
	function drawMinutePointer(cxt,time,x,y,R){
		cxt.lineWidth=6;
		cxt.strokeStyle="#BDDE1C";
		cxt.beginPath();
		cxt.moveTo(0.7*R*Math.cos((90-6*time.minute-0.1*time.second)/180*Math.PI)+x,y-0.7*R*Math.sin((90-6*time.minute-0.1*time.second)/180*Math.PI));
		cxt.lineTo(-0.2*R*Math.cos((90-6*time.minute-0.1*time.second)/180*Math.PI)+x,y+0.2*R*Math.sin((90-6*time.minute-0.1*time.second)/180*Math.PI));
		// cxt.lineTo(x,y);
		cxt.save();
		// cxt.clip();
		cxt.stroke();
		cxt.restore();
	}

// function画上时针；
	function drawHourPointer(cxt,time,x,y,R){
		if(time.ren>12){
			hour=hour-12;
		}
		cxt.lineWidth=8;
		cxt.strokeStyle="black";
		cxt.beginPath();
		cxt.moveTo(0.50*R*Math.cos((90-30*time.hour-0.5*time.minute-0.5/60*time.second)/180*Math.PI)+x,y-0.50*R*Math.sin((90-30*time.hour-0.5*time.minute-0.5/60*time.second)/180*Math.PI));
		cxt.lineTo(-0.15*R*Math.cos((90-30*time.hour-0.5*time.minute-0.5/60*time.second)/180*Math.PI)+x,y+0.15*R*Math.sin((90-30*time.hour-0.5*time.minute-0.5/60*time.second)/180*Math.PI));
		// cxt.lineTo(x,y);
		cxt.save();
		// cxt.clip();
		cxt.stroke();
		cxt.restore();
	}


//function定义一个获取当前时间的函数
	function getCurrentTime(){
		var today=new Date();
		var second=today.getSeconds();
		var minute=today.getMinutes();
		var hour=today.getHours();
		var month=today.getMonth();
		var year=today.getYear();
		var day=today.getDay();
		var time={
			second:second,
			minute:minute,
			hour:hour,
			month:month,
			year:year,
			day:day

		}
		return time;
	} 
