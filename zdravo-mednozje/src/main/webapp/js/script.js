$(document).ready(function () {
	$('#accordion').collapse({
  		collapsible: true,
  		active: false,
	});

	$('#accordion2').collapse({
  		collapsible: true,
  		active: false,
	});

	$('#accordion3').collapse({
  		collapsible: true,
  		active: false,
	});

	$("#vprasalnik").click(function(){
	        window.location = $(this).find("a:first").attr("href");	
	        return false;
	});

	$("#opis").click(function(){
	        window.location = $(this).find("a:first").attr("href");
	        return false;
	});

	$("#pregled").click(function(){
	        window.location = $(this).find("a:first").attr("href");
	        return false;
	});

	$("#simptomi").click(function(){
	        window.location = $(this).find("a:first").attr("href");
	        return false;
	});

	$("#zascita").click(function(){
	        window.location = $(this).find("a:first").attr("href");
	        return false;
	});

	$("#opisProjekta").click(function(){
	        window.location = $(this).find("a:first").attr("href");
	        return false;
	});

	$('.carousel').carousel({
		interval: 3000
	});
/*
	var btnRadius = $('.cd-modal-bg').width()/2,
	left = $('.cd-modal-bg').offset().left + btnRadius,
	top = $('.cd-modal-bg').offset().top + btnRadius - $(window).scrollTop(),
	scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());
 
	function scaleValue( topValue, leftValue, radiusValue, windowW, windowH) {
		var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
			maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
		return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
	}*/

});