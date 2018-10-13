(function() 
{
	const carouselInit = function(carousel) 
	{
		var options = carousel.options,
			carousel = carousel.element,
			wrapper = carousel.children[0],
			items = wrapper.children;

		var itemStyle = getComputedStyle(items[0]),
			ofWidth = (items[0].offsetWidth + (parseInt(itemStyle.marginRight) + parseInt(itemStyle.marginLeft)));
	
		if (typeof options.width !== 'number' ||
			typeof options.cols !== 'number' ||
			options.width <= 0 ||
			options.cols <= 0 ||
			items.length <= 0) return false;

		carouselWidth = document.getElementById('carousel');
		
		console.log('carousel width: ' + carouselWidth.offsetWidth);

		wrapper.style.width = (carouselWidth.offsetWidth * (items.length + 2)) + 'px';
	
		var addEvents = function() 
		{
			if (options.controls.next === undefined ||
				options.controls.prev === undefined ||
				options.controls.next.length == 0 ||
				options.controls.prev.length == 0) return false;

			if(carousel.querySelectorAll('.' + options.controls.next + ', .' + options.controls.prev).length != 2) return false;

			var nextControl = carousel.querySelector('.' + options.controls.next),
				prevControl = carousel.querySelector('.' + options.controls.prev);

			wrapper.addEventListener('webkitTransitionEnd', function(event) 
			{
				if (wrapper.classList.contains('animated')) wrapper.classList.remove('animated');
			});

			wrapper.addEventListener('transitionend', function(event) 
			{
				if (wrapper.classList.contains('animated')) wrapper.classList.remove('animated');
			});

			nextControl.addEventListener('click', function(event) 
			{
				event.preventDefault();
				event.stopPropagation();

				if (wrapper.classList.contains('animated')) return false;
				if (nextSlide()) wrapper.classList.add('animated');
			});

			prevControl.addEventListener('click', function(event) 
			{
				event.preventDefault();
				event.stopPropagation();

				if (wrapper.classList.contains('animated')) return false;
				if (prevSlide()) wrapper.classList.add('animated');
			});
		},

					
					
		nextSlide = function() 
		{
			var wrapperStyle = getComputedStyle(wrapper),
				itemStyle = getComputedStyle(items[0]);


			wrapper.style.left = (parseInt(wrapperStyle.left) - ofWidth) + 'px';

			if (screen.width > 1250)
			{
				if (parseInt(wrapper.style.left) == -(ofWidth * (items.length - 3))) wrapper.style.left = 0;
			} 
			else if (screen.width <= 1249 && screen.width >= 1111)
			{
				if (parseInt(wrapper.style.left) == -(ofWidth * (items.length - 2))) wrapper.style.left = 0;		
			} 
			else if (screen.width <= 1110 && screen.width >= 601)
			{
				if (parseInt(wrapper.style.left) == -(ofWidth * (items.length - 1))) wrapper.style.left = 0;		
			} else if (screen.width <= 600 && screen.width >= 320)
			{
				if (parseInt(wrapper.style.left) == -(ofWidth * items.length)) wrapper.style.left = 0;
			}
				
				return true;
		},

		prevSlide = function() 
		{
			var wrapperStyle = getComputedStyle(wrapper),
				itemStyle = getComputedStyle(items[0]);

			wrapper.style.left = (parseInt(wrapperStyle.left) + parseInt(itemStyle.width)) + 'px';
			if (parseInt(wrapper.style.left) > 0) wrapper.style.left = '-' + (parseInt(itemStyle.width) * (items.length-options.cols)) + 'px';

			return true;
		},

		autoplaySlides = function() 
		{
			var autoplay = function() 
			{ 
				return setInterval(function() 
				{
					if (wrapper.classList.contains('animated')) return false;
					if (nextSlide()) wrapper.classList.add('animated');
				}, options.autoplay); 
			},
			sIId = autoplay();

			wrapper.addEventListener('mouseover', function() {
				clearInterval(sIId);
			});

			wrapper.addEventListener('mouseout', function() {
				sIId = autoplay();
			});
		};

			if (typeof options.controls === 'object') addEvents();
			if (typeof options.autoplay === 'number' && options.autoplay >= 1000) autoplaySlides();

			return true;
	};

	this.carousel = function(id, options) 
	{
		if (id === undefined || typeof options !== 'object') return false;

		var elements = document.querySelectorAll('#' + id, '.' + id);
		if (elements.length != 1) return false;
		elements[0].classList.toggle(id);

		return carouselInit({
			element: elements[0],
			options: options
		});
	};

	carousel('carousel', 
	{
		width: 1200,
		cols: 4,
		controls: {
			next: 'nextO',
			prev: 'prevO'
		} 
			
	});



	if (screen.width > 320) 
	{
		carousel('carousel', 
		{
			width: 1200,
			cols: 4,
			controls: 
			{
				next: 'nextO',
				prev: 'prevO'
			}, autoplay: 2000
			
		});
	};
	
}());
