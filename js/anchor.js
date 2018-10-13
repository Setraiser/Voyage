
var timer, scrolled;

var anchor = document.getElementById('anchor').onclick = function(){
	scrolled = window.pageYOffset;
	scrollToTop();
}

function scrollToTop(){
	if (scrolled > 0){
		window.scrollTo(0, scrolled);
		scrolled -= 70;
		timer = setTimeout(scrollToTop, 100);
	} else {
		clearTimeout(timer);
		window.scrollTo(0, 0);
	}
}