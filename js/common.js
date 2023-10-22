const scenes = document.querySelectorAll('.js-parallax');
scenes.forEach((item) => {
	// eslint-disable-next-line no-unused-vars
	const parallaxInstance = new Parallax(item);
});

/* animation home overlay */
const element = document.querySelector('.intro');

if (element) {
	const scroll = window.requestAnimationFrame ||
		// IE Fallback
		function ieCallback(rqfCallback) { window.setTimeout(rqfCallback, 1000 / 60); };

	function calculateCoefficient(item) {
		const elementBounding = item.getBoundingClientRect();
		if (elementBounding.top >= 0) {
			return 0;
		} else if (elementBounding.top < window.innerHeight &&
			elementBounding.bottom > 0) {
			return 1 - (elementBounding.bottom / elementBounding.height);
		}
		return 0.999999;
	}

	let myreq;

	let elementPreviousPosition = element.getBoundingClientRect().bottom;
	let elementCurrentPosition = element.getBoundingClientRect().bottom;
	function settingCoeff() {
		elementCurrentPosition = element.getBoundingClientRect().bottom;
		if (elementPreviousPosition !== elementCurrentPosition) {
			elementPreviousPosition = elementCurrentPosition;
			document.body.style.setProperty('--introShrinkCoeff', calculateCoefficient(element));
		}
		myreq = scroll(settingCoeff);
	}

	// intersection observer
	const observerCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio > 0) {
				settingCoeff();
			} else {
				window.cancelAnimationFrame(myreq);
			}
		});
	};

	const introObserver = new IntersectionObserver(observerCallback, {
		rootMargin: '0px',
	});

	const targets = document.querySelectorAll('.intro');
	targets.forEach((target) => {
		introObserver.observe(target);
	});
}


/* eslint-disable no-inner-declarations */
var mql = window.matchMedia('(min-width: 1200px)');

if (document.querySelector('.complex-item')) {
	var observerHandler = function observerHandler() {
		var targets = document.querySelectorAll('.complex-item');
		targets.forEach(function (target) {
			if (mql.matches) {
				observer.observe(target);
			} else {
				observer.unobserve(target);
			}
		});
	};

	// запускаем обвервер при загрузке страницы

	// intersection observer
	var callback = function callback(entries) {
		entries.forEach(function (entry) {
			if (entry.intersectionRatio > 0) {
				entry.target.classList.add('in-viewport');
			} else {
				entry.target.classList.remove('in-viewport');
			}
		});
	};

	var observer = new IntersectionObserver(callback);

	observerHandler();

	// проверка медиа-запроса при изменении вьюпорта
	mql.addEventListener('change', function () {
		observerHandler();
	});
}

// scroll slider	
$(document).ready(function () {
	if (document.querySelector('.js-scroll-slider')) {
		document.querySelectorAll('.js-scroll-slider').forEach((item) => {
			const scrollSwiper = new Swiper(item.querySelector('.js-scroll-slider__container'), {
				freeMode: true,
				slidesPerView: 'auto',
				spaceBetween: 16,
				scrollbar: {
					el: item.querySelector('.js-scroll-slider__scroll'),
					draggable: true,
					dragClass: 'scroll-slider__drag',
					snapOnRelease: false,
				},
				breakpoints: {
					1200: {
						spaceBetween: 48,
					},
				},
			});
		});
	}
});

Fancybox.bind("[data-fancybox]", {
	// Your custom options
});



// модальные окна (несколько)
$(function () {
	let overlay = $('.overlay'),
		open_modal = $('.open_modal'),
		close = $('.modal__close, .overlay'),
		modal = $('.modal__div');

	open_modal.on('click', function (event) {
		event.preventDefault();

		modal.removeClass('active');

		let div = $(this).attr('href');
		overlay.fadeIn(
			function () {
				$(div).addClass('active');
			});
	});

	close.on('click', function (e) {
		e.preventDefault();
		overlay.fadeOut(
			function () {
				modal.removeClass('active');
			});
		
	});
});
//end

// video iframe
var videoPoster = document.querySelector('.js-videoPoster');

if (videoPoster) {
	videoPoster.addEventListener('click', function (e) {
		e.preventDefault();

		var wrapper = videoPoster.closest('.js-videoWrapper');
		var iframe = document.querySelector('.js-videoIframe');
		var src = iframe.dataset.path;
		wrapper.classList.add('is-active');
		iframe.setAttribute('src', src);
	});
}

// swiper slider
const swiper = new Swiper('.swiper', {
	// Optional parameters
	direction: 'horizontal',
	loop: false,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

});


const swiper3 = new Swiper('.offer-swiper', {
	// autoHeight: true,
	spaceBetween: 50,
	threshold: 5,
	effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: false
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	}
});

// products
$(".js-tab-trigger").click(function () {
	var id = $(this).attr('data-tab'),
		content = $(this).parents('.tabs').find('.js-tab-content[data-tab="' + id + '"]');

	$(this).parents('.tabs').find('.js-tab-trigger.active').removeClass('active'); // 1
	$(this).addClass('active'); // 2

	$(this).parents('.tabs').find('.js-tab-content.active').removeClass('active'); // 3
	content.addClass('active'); // 4
});

// animate scroll
$('.go_to').click(function (e) {
	e.preventDefault();
	var scroll_el = $(this).attr('href');
	if ($(scroll_el).length !== 0) {
		$('html, body').animate({
			scrollTop: $(scroll_el).offset().top
		}, 500);
		$('.navbar-menu').removeClass('active');
		$('.btn-burger').removeClass('active');
		$('body').removeClass('menu-open');
	}
	
	return false;
});

// amount
$('.down').on("click", function () {
	let $input = $(this).parent().find('input');
	let count = parseInt($input.val()) - 1;
	count = count < 1 ? 1 : count;
	$input.val(count);
	$input.change();
	return false;
});
$('.up').on("click", function () {
	let $input = $(this).parent().find('input');
	$input.val(parseInt($input.val()) + 1);
	$input.change();
	return false;
});

// mobile menu
$('.btn-burger').on('click', function () {
	$('body').toggleClass('menu-open');
	$(this).toggleClass('active');
	$('.navbar-menu').toggleClass('active');
});