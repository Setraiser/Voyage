var mobMenu = document.querySelector('.nav-mobile'),
	menu = document.querySelector('.menu'),
	menuStatus = false;
var toggleMenu = function(){
	if (menuStatus === false) {
		menu.style.display = 'block';
		menu.style.width = '50%';
		menu.style.top = '60px';
		menu.style.right = '0px';
		menu.style.zIndex = '30';
		menu.style.backgroundColor = '#333366';

		menuStatus = true;
	} else if (menuStatus === true) {
		menu.style.display = 'none';
		menuStatus = false;
	}
}









	





