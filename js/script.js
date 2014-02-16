$(document).ready(function() {

	width = $(window).width();
	height = $(window).height();

	var cvs = document.getElementById("surface");
	var ctx = cvs.getContext("2d");
	cvs.width = width;
	cvs.height = height;

	var maxsize;
	var skip;
	var maxpencil = 12;
	var maxeraser = 36;

	var count = 0;

	var points = new Array();

	ctx.lineWidth = 4;

	$(".pencil a").css("font-weight","bold");
	var brush = "pencil";

	ctx.fillStyle = "#FFF";
	ctx.fillRect(0, 0, width, height);
	//draw_grid(width, height);

	var isDown = false;

	$("#surface").mousedown(function(e) {

		isDown = true;
		xprev = e.pageX;
		yprev = e.pageY;

	});

	$("#surface").mouseup(function() {

		isDown = false;
		ctx.closePath();
		//save_state();

	});

	$("#surface").mousemove(function(e) {

		if(isDown == true) {

			x = e.pageX;
			y = e.pageY;

			draw_path(xprev, yprev, x, y);

			xprev = x;
			yprev = y;

		}

	});

	$(".clear a").click(function() {

		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = "#FFF";
		ctx.fillRect(0, 0, width, height);
		return false;

	});

	$(".colour a").click(function() {

		return false;

	});

	$(".getimage a").click(function() {

		var img = cvs.toDataURL("image/png");
		var newWindow = window.open();
		newWindow.document.write('<img src="' + img + '" alt="" />');
		newWindow.document.close();
		return false;

	});

	$(".smaller a").click(function() {

		if(brush == "eraser") {
			maxsize = maxeraser;
			skip = 3;
		} else {
			maxsize = maxpencil;
			skip = 1;
		}

		ctx.lineWidth -= skip;
		if(ctx.lineWidth < 1) { 
			ctx.lineWidth = 1; 
		}

		return false;

	});

	$(".larger a").click(function() {

		if(brush == "eraser") {
			maxsize = maxeraser;
			skip = 3;
		} else {
			maxsize = maxpencil;
			skip = 1;
		}

		ctx.lineWidth += skip; 
		if(ctx.lineWidth > maxsize) { 
			ctx.lineWidth = maxsize; 
		}

		return false;

	});

	$(".pencil a").click(function() {

		$(".pencil a").css("font-weight","bold");
		$(".eraser a").css("font-weight","normal");
		ctx.lineWidth = ctx.lineWidth / 3;
		brush = "pencil";
		return false;

	});

	$(".eraser a").click(function() {

		$(".eraser a").css("font-weight","bold");
		$(".pencil a").css("font-weight","normal");
		ctx.lineWidth = ctx.lineWidth * 3;
		brush = "eraser";
		return false;

	});

	$(window).keyup(function(e) {

		if(brush == "eraser") {
			maxsize = maxeraser;
			skip = 3;
		} else {
			maxsize = maxpencil;
			skip = 1;
		}

		if(e.keyCode == '107' || e.keyCode == '61') {
			ctx.lineWidth += skip; 
			if(ctx.lineWidth > maxsize) { 
				ctx.lineWidth = maxsize; 
			}
		}

		if(e.keyCode == '109') {
			ctx.lineWidth -= skip;
			if(ctx.lineWidth < 1) { 
				ctx.lineWidth = 1; 
			}
		}

		$(".brushsize a").html("Size: " + ctx.lineWidth);

	});
	

	function draw_grid(width, height) {

		ctx.strokeStyle = "#DDD";

		for(var x = 0.5; x < width; x+= 10) {

			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);	

		}

		for(var y = 0.5; y < height; y+= 10) {

			ctx.moveTo(0, y);
			ctx.lineTo(width, y);	

		}

		ctx.stroke();
	}

	function draw_path(xprev, yprev, x, y) {

		ctx.beginPath();
		if(brush == "eraser") {
			ctx.strokeStyle = "#FFF";
		} else {
			ctx.strokeStyle = "#333";
		}
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		ctx.moveTo(xprev, yprev);
		ctx.lineTo(x, y);

		ctx.stroke();

	}

	function draw_arc(xprev, yprev, x, y) {

		ctx.beginPath();
		radius = 5;
		
		diffx = x - xprev;
		diffy = y - yprev;

		ctx.arc(diffx, diffy, radius, 0, Math.PI * 2, false);

		ctx.strokeStyle = "#333";
		ctx.fillStyle = "#333";
		ctx.stroke();
		ctx.fill();

	}

	function save_state() {
		
		$.cookie('canvas_state', ctx, { expires: 7 });

	}

});
