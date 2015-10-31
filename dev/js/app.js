/*
	  _____ _                       _      __  __       _    _     _             _ 
	 / ____(_)                     | |    |  \/  |     | |  | |   | |           (_)
	| (___  _  __ _ _ __ ___   __ _| | __ | \  / | ___ | | _| |__ | |_ __ _ _ __ _ 
	 \___ \| |/ _` | '_ ` _ \ / _` | |/ / | |\/| |/ _ \| |/ / '_ \| __/ _` | '__| |
	 ____) | | (_| | | | | | | (_| |   <  | |  | | (_) |   <| | | | || (_| | |  | |
	|_____/|_|\__,_|_| |_| |_|\__,_|_|\_\ |_|  |_|\___/|_|\_\_| |_|\__\__,_|_|  |_|
	Siamak Mokhtari <www.siamak.us> at Web Standards School <www.wsschool.org>.

*/

$(document).ready(function(){
	
	/**
	* Navigation
	*/
	if( $('.dot-navigation').length > 0 ){
		var nav   	  = $('.dot-navigation'),
			list      = $('.dot-list'),
			links     = nav.find('.dot-navigation a'),
			navtop    = nav.offset().top,
			navheight = nav.height(),
			items     = $('.section'),
			offset    = {},
			last;


		if( items.length > 0 ){
			items.each(function(){
				offset[this.id] = $(this).offset().top
			});
		}

		$(window).on('scroll', function(){
			var fromTop = $(this).scrollTop();

			if( items.length > 1 ){
				var current = items.map(function(){

					if($(window).width() < 752){
						navheight = list.height(); // Fixed offset in mobile
						fromTop += navheight;
					}
					else{
						fromTop += list.height() / 6;
					}

					if( offset[this.id] < fromTop){
						return this;
					}
				});

				current = current[current.length-1];

				if( current && last !== current.id ){
					last = current.id;
					nav.find('a').removeClass('is-active');
					nav.find('a[href*="'+last+'"]').addClass('is-active');
				}

			}
		});
	}



	/**
	* Scroller
	*/
	$('a[href^="#"]').click(function(){
		var element = $(this).attr('href'),
			offset  = $(element).offset().top;

		$('html, body').animate({scrollTop: offset}, 1000, 'swing');
		return false;
	});



	/**
	* Open-Menu "Responsive"
	*/
	$('.dot-open-menu').bind('click', function(){
		if($(this).hasClass('is-active')){
			$(this).removeClass('is-active');
			$('.dot-list').removeClass('is-open');
		}
		else{
			$(this).addClass('is-active');
			$('.dot-list').addClass('is-open');
		}
	});



	/**
	* Overlay
	*/
	$('html').click(function() {
		$('.table-row-more_overlay').removeClass('is-run');
	});

	$('.table-row-more').bind('click', function(event){
		event.stopPropagation();

		var modal = $(this).children('.table-row-more_overlay');
			
			$('.table-row-more_overlay').removeClass('is-run');
			modal.addClass('is-run');
	});



	/**
	* Position Navigation
	*/
	function navigation_pos(mode){
		var sidebar 	= $('.sidebar').eq(0),
			navigation  = $('.dot-navigation'),
			offset      = sidebar.offset().left,
			left 		= (offset - navigation.width()) + (navigation.find('.dot').width() / 2);
		
		if( mode == true){
			navigation.css(
				'left', left
			).show();
		}

		else{
			navigation.css(
				'left', 'inherit'
			);
		}

	}
	navigation_pos(true);

	setTimeout(function(){ navigation_pos(true); }, 5000);
	var flip = setInterval(function(){ navigation_pos(true); }, 10000);

	function rebuild(){
		if($(window).width() > 752){
			navigation_pos(true);
			flip;
		}
		else{
			navigation_pos(false);
			clearInterval(flip);	
		}
	}
	rebuild();

	$(window).resize(function(){
		rebuild();
	});



	/**
	* Google Map Settings
	*/
	var map, myIcon;
	function initialize() {
		var mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng(35.734392, 51.445806),
			disableDefaultUI: true,
			scrollwheel: false,
			scaleControl: true,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.TOP_LEFT
			},
			styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"administrative","elementType":"labels","stylers":[{"saturation":"-100"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"gamma":"0.75"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"-37"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f9f9f9"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"saturation":"-100"},{"lightness":"40"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"saturation":"-100"},{"lightness":"-37"}]},{"featureType":"landscape.natural","elementType":"labels.text.stroke","stylers":[{"saturation":"-100"},{"lightness":"100"},{"weight":"2"}]},{"featureType":"landscape.natural","elementType":"labels.icon","stylers":[{"saturation":"-100"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":"-100"},{"lightness":"80"}]},{"featureType":"poi","elementType":"labels","stylers":[{"saturation":"-100"},{"lightness":"0"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"lightness":"-4"},{"saturation":"-100"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"},{"visibility":"on"},{"saturation":"-95"},{"lightness":"62"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road","elementType":"labels","stylers":[{"saturation":"-100"},{"gamma":"1.00"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"gamma":"0.50"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"saturation":"-100"},{"gamma":"0.50"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"},{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":"-13"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"lightness":"0"},{"gamma":"1.09"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"},{"saturation":"-100"},{"lightness":"47"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"lightness":"-12"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"saturation":"-100"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"},{"lightness":"77"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"-5"},{"saturation":"-100"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"saturation":"-100"},{"lightness":"-15"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"lightness":"47"},{"saturation":"-100"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"water","elementType":"geometry","stylers":[{"saturation":"53"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-42"},{"saturation":"17"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":"61"}]}],
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		myIcon = new google.maps.MarkerImage("dist/img/map-marker.png", null, null, null, new google.maps.Size(40, 52));
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(35.734392, 51.445806),
			map: map,
			icon: myIcon,
			optimized: false
		});

	}
	google.maps.event.addDomListener(window, 'load', initialize);



	/**
	* IE Version Checker
	*/
	var IEversion = detectIE();
	if (IEversion !== false) {
		$('html').addClass('ie-shit');
	}

	function detectIE() {
		var $userAgent = window.navigator.userAgent;

		var msie = $userAgent.indexOf('MSIE ');
		if (msie > 0) {
			return parseInt($userAgent.substring(msie + 5, $userAgent.indexOf('.', msie)), 10);
		}
		return false;
	}



	/**
	* Gallery
	*/
	$.getJSON("http://conf.wsschool.org/fowd/register/instagram", function(result){
		$.each(result, function(i, data){
			if(i <= 18){
				var el = document.createElement('div');
				$(el).addClass('column--xsmall-6 column--small-4 column--medium-2')
					.html('<figure class="gallery--photos-item" id='+i+'><img src='+ data.pic +'><figcaption class="gallery--photos-item_like"><div class="step"><b>'+ _englishNumber(data.like.toString()) +'</b><i class="fa fa-heart fa-mr"></i></div></figcaption><i class="ripple"></i></figure>')
					.mousedown(function(e) {
						var ripple = $(this).find(".ripple");
						ripple.removeClass("animate");
						var x = parseInt(e.pageX - $(this).offset().left) - (ripple.width() / 2);
						var y = parseInt(e.pageY - $(this).offset().top) - (ripple.height() / 2);
						ripple.css({
						top: y,
						left: x
						}).addClass("animate");
					})
					.appendTo($(".gallery--photos"));
			}
		});
	});

});