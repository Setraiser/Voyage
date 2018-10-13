(function() {
	const sliderInit = function(slider) {
		var options = slider.options,
			slider = slider.element,
			wrapper = slider.children[0],
			items = wrapper.children;

		if (items === null || items === undefined || items === false || items.length <= 0) return false;

		var addEventsControls = function() {
				if (options.controls.next === undefined ||
					options.controls.prev === undefined ||
					options.controls.next.length == 0 ||
					options.controls.prev.length == 0) return false;

				if(slider.querySelectorAll('.' + options.controls.next + ', .' + options.controls.prev).length != 2) return false;

				var nextControl = slider.querySelector('.' + options.controls.next),
					prevControl = slider.querySelector('.' + options.controls.prev);

				nextControl.addEventListener('click', function(event) {
					event.preventDefault();
					event.stopPropagation();

					nextSlide();
				});

				prevControl.addEventListener('click', function(event) {
					event.preventDefault();
					event.stopPropagation();

					prevSlide();
				});
			},
			getCurrentSlide = function() {
				if (wrapper.querySelectorAll('.current').length > 1) return -1;

				var currentSlide = wrapper.querySelector('.current');

				if (currentSlide === null) {
					items[0].classList.add('current');
					return 0;
				}

				return Array.prototype.slice.call(items).indexOf(currentSlide);
			},
			nextSlide = function() {
				var currentSlide = getCurrentSlide();
				if (currentSlide == -1) return false;

				var	slide = currentSlide + 1;
				if (slide > items.length-1) slide = 0;

				items[currentSlide].classList.toggle('current');
				items[slide].classList.toggle('current');

				items[currentSlide].style.display = 'none';
				items[slide].style.display = 'block';

				return true;
			},
			prevSlide = function() {
				var currentSlide = getCurrentSlide();
				if (currentSlide == -1) return false;

				var	slide = currentSlide - 1;
				if (slide < 0) slide = items.length-1;

				items[currentSlide].classList.toggle('current');
				items[slide].classList.toggle('current');

				items[currentSlide].style.display = 'none';
				items[slide].style.display = 'block';

				return true;
			},
			autoplaySlides = function() {
				var autoplay = function() { return setInterval(nextSlide, options.autoplay); },
					sIId = autoplay();


				wrapper.addEventListener('mouseover', function() {
					clearInterval(sIId);
				});

				wrapper.addEventListener('mouseout', function() {
					sIId = autoplay();
				});
			};

		getCurrentSlide();

		if (typeof options.controls === 'object') { addEventsControls(); }
		if (typeof options.autoplay === 'number' && options.autoplay >= 1000) autoplaySlides();

		return true;
	};

	this.slider = function(id, options) {
		if (id === undefined || typeof options !== 'object') return false;

		var elements = document.querySelectorAll('#' + id, '.' + id);
		if (elements.length != 1) return false;
		elements[0].classList.toggle(id);

		return sliderInit({
			element: elements[0],
			options: options
		});
	};

	slider('slider', {
		controls: {
			next: 'next',
			prev: 'prev'
		}
	});

	if (screen.width > 900) {
		slider('slider', {
			autoplay: 3000
		})
	};
		
	

	
}());

