import { gsap, Power2 } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

gsap.registerPlugin(Power2, ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, gsap);

export function animateSlides() {
	// Init Controller
	const controller = new ScrollMagic.Controller();
	// Select elements
	const sliders = document.querySelectorAll('.slide');
	const nav = document.querySelector('.nav-header');
	// Loop over each slide
	sliders.forEach((slide, index, slides) => {
		const img = slide.querySelector('img');
		// GSAP
		const slideTl = gsap.timeline({defaults: {duration: 1, ease: Power2.easeInOut}});
			slideTl.fromTo(img, {scale: 1.5}, {scale: 1}, '-=1');
			slideTl.fromTo(nav, {y: '-100%'}, {y: '0%'}, '-=0.5');
		// Create scene
		const slideScene = new ScrollMagic.Scene({
			triggerElement: slide,
			triggerHook: 0.15,
			reverse: false
		})
		.setTween(slideTl)
		.addTo(controller);
		// New Animation
		const pageTl = gsap.timeline();
		const nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
			pageTl.fromTo(nextSlide, { y: '0%'}, {y: '50%'});
			pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale:0.5});
			pageTl.fromTo(nextSlide, { y: '50%'}, {y: '0%'}, '-=0.5');
		// Creata new scene
		const pageScene = new ScrollMagic.Scene({
			triggerElement: slide,
			duration: '50%',
			triggerHook: 0
		})
		.setPin(slide, { pushFollowers: false })
		.setTween(pageTl)
		.addTo(controller)
	});
};
