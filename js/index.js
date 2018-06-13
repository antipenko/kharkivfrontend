



'use strict';
(function() {
    var map
    	, pos = {
    		lat: 49.98925,
            lng: 36.222881
    	}

    function initMap() {
        map = new google.maps.Map(document.getElementById('map-container'), {
            center: { lat: pos.lat, lng: pos.lng },
            zoom: 14,
            styles: [{
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [{
                        // "visibility": "off"
                    }]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#bdbdbd"
                    }]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [{
                        // "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#eeeeee"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [{
                        // "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [{
                        // "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e5e5e5"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [{
                        // "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [{
                        //"visibility": "off"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#dadada"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e5e5e5"
                    }]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#eeeeee"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#c9c9c9"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                }
            ]
        });

	var marker = new google.maps.Marker({
        position: new google.maps.LatLng(pos.lat, pos.lng),
        icon: {
        	url: "/img/map-mark.svg",
        	//scaledSize: new google.maps.Size(80, 110), // scaled size
    	    origin: new google.maps.Point(0,0),
    	    anchor: new google.maps.Point(0, 0)
        },
        map: map
      });
    }
    initMap();
})();
'use strict';

(function() {

	let $body = $('body')
		, scrollClass = "is-scroll"
		, $menuButton = $('.toggle-menu-button')
		, menuShowClass = 'is-menu-show'
		, menuClass = '.toggle-menu-button';


	let scrollWatch = function() {

		if (window.pageYOffset > window.innerHeight / 6) {
			$body.addClass(scrollClass);
		}

		window.addEventListener('scroll', function() {
			let scrolled = window.pageYOffset || document.documentElement.scrollTop;
			if (scrolled > 30) {
				$body.addClass(scrollClass);
				return;
			}
			$body.removeClass(scrollClass);
		});

	};

	//init scrollWatch
	scrollWatch();


	//init scroll spy
	let section = document.querySelectorAll(".scroll-spy");
	let sections = {};
	let i = 0;

	Array.prototype.forEach.call(section, function(e) {
		sections[e.id] = e.offsetTop;
	});

	window.onscroll = function() {
		let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
		let $scrollSpyLinks = $('.scroll_spy_link');
		let currentSection;
		for (i in sections) {
			if (sections[i] <= scrollPosition + 160) {
				currentSection = i;
				$scrollSpyLinks.removeClass('active');
				$scrollSpyLinks.filter('[href="#' + currentSection + '"]').addClass('active');
			}
		}
	};


	//init scroll links
	let $scrollLinks = $('.scroll-link');

	$scrollLinks.on('click', function(event) {
		event.preventDefault();
		let $this = $(this)
			, idMark = $this.attr('href')
			, scrollVal = (idMark == "intro") ? 0 : $(idMark).offset().top;
		window.scroll({ top: scrollVal - 80, left: 0, behavior: 'smooth' });
	});

	//init menu open
	$menuButton.on('click', function() {
		$body.toggleClass(menuShowClass);
	});


	$(document).click( function(event){
		if( $(event.target).closest(menuClass).length )
			return;
		$body.removeClass(menuShowClass);
	});

})();
'use strict';
(function () {
	// var $preloader = $('.preloader');
    //
	// //fade-preloader
	// $(window).on("load", function () {
	// 	$preloader.delay(1500).fadeOut(1500, function(){
	// 		new WOW().init();
	// 	});
	// });

})();


'use strict';
(function () {
	$(function () {
		new WOW().init();
	});
})();