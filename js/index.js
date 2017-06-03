//At load
$(document).ready(function(){

	var min = 25;
	var sec = 60;
	var isClicked = false;
	var intervalID;
	var turn = "session";

	$("#timer").text(min);

	//Play alarm
	function soundAlarm(){ //This function doesn't work, couldn't find audio links
		 var clip = new Audio("http://res.cloudinary.com/tsw12/video/upload/v1495840249/381382__coltonmanz__alarm_qear75.wav");
		 clip.play();
	}
	//Countdown timer
	function countdown(m){
		if(sec < 1)
		{
			--min;
			sec = 60;
		}
		if(min < 0)
		{
			if(turn === "session")
			{
				min = +($("#lenOut").text());
				sec = 1;
				$("#state").text("BREAK");
				turn = "break";
			}
			else if(turn === "break")
			{
				min = +($("#sessOut").text());
				sec = 1;
				$("#state").text("SESSION");
				turn = "session";
			}
		}
		//Still counting down
		if(sec < 11)
		{
			$("#timer").text(min + " : 0" + (--sec));
		}
		else
			$("#timer").text(min + " : " + (--sec));
	}
	// Buttons
	$("#lenSub").on("click", function(){
		var num = +($("#lenOut").text());
		--num;

		if(num < 0)
			$("#lenOut").text(0);
		else
			$("#lenOut").text(num);
	});
	$("#lenAdd").on("click", function(){
		var num = +($("#lenOut").text());
		++num;

		if(num > 30)
			$("#lenOut").text(30);
		else
			$("#lenOut").text(num);
	});
	$("#sessSub").on("click", function(){
		var num = +($("#sessOut").text());
		turn = "session";
		$("#state").text("SESSION");
		--num;

		clearInterval(intervalID);
		isClicked = false;

		if(num < 0)
		{
			$("#sessOut").text(0);
			$("#timer").text(0);
			min = $("#timer").text();
		}
		else
		{
			$("#sessOut").text(num);
			$("#timer").text(num);
			min = $("#timer").text();
			sec = 60;
		}
	});
	$("#sessAdd").on("click", function(){
		var num = +($("#sessOut").text());
		turn = "session";
		$("#state").text("SESSION");
		++num;

		clearInterval(intervalID);
		isClicked = false;

		if(num > 60)
		{
			$("#sessOut").text(60);
			$("#timer").text(60);
			min = $("#timer").text();
		}
		else
		{
			$("#sessOut").text(num);
			$("#timer").text(num);
			min = +$("#timer").text();
			sec = 60;
		}
	});
	//Clock clicked
	$("#clock").on("click", function(){
		if(isClicked === false)
		{
			if (intervalID)
			{
			  clearInterval(intervalID);
			}
			intervalID = setInterval(countdown, 1000);
			if(sec == 60)
				countdown(--min);
			else
				countdown(min);
			isClicked = true;
		}
		else if(isClicked === true)
		{
			clearInterval(intervalID);
			isClicked = false;
		}
	});	
});
