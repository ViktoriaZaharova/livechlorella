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

// swiper slider
