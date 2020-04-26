import { gsap } from "gsap";

// ELEMENTS
const mouse = document.querySelector('.cursor');
const mouseTxt = mouse.querySelector('span');
const burger = document.querySelector('.burger');

// FUNCTIONS
const cursor = ({ pageY,pageX }) => {
		mouse.style.top = `${pageY}px`;
		mouse.style.left = `${pageX}px`;
};

const activeCursor = ({ target }) => {
	if(target.id === 'logo' || target.classList.contains('burger')) {
		mouse.classList.add('nav-active');
	} else {
		mouse.classList.remove('nav-active');
	}
	if(target.classList.contains('explore')) {
		mouse.classList.add('explore-active');
		mouseTxt.innerText = 'Tap';
			gsap.to('.title-swipe', 1, {y: '0%'});
	} else {
		mouse.classList.remove('explore-active');
		mouseTxt.innerText = '';
			gsap.to('.title-swipe', 1, {y: '115%'});
	};
};

const navToggle = ({target}) => {
	if(!target.classList.contains('active')) {
		target.classList.add('active')
			gsap.to('.line1', .5, {rotate: '45', y: 5, background: 'black'});
			gsap.to('.line2', .5, {rotate: '-45', y: -5, background: 'black'});
			gsap.to('#logo', 1, {color: 'black'});
			gsap.to('.nav-bar', 1, {clipPath: 'circle(2500px at 100% -10%)' });
		document.body.classList.add('hide');
	} else {
		target.classList.remove('active')
			gsap.to('.line1', .5, {rotate: '0', y: 0, background: 'white'});
			gsap.to('.line2', .5, {rotate: '0', y: 0, background: 'white'});
			gsap.to('#logo', 1, {color: 'white'});
			gsap.to('.nav-bar', 1, {clipPath: 'circle(50px at 100% -10%)' });
			document.body.classList.remove('hide');
	}
}

// EVENT LISTENERS
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);
burger.addEventListener('click', navToggle);