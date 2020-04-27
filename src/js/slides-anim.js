import { gsap, Power2 } from "gsap";
import * as ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

gsap.registerPlugin(Power2, ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, gsap);

export const slides = document.querySelectorAll('.detail-slide');

export let controller;
export let slideScene;
export let pageScene;
export let detailScene;

export function animateSlides() {
	// Init Controller
	controller = new ScrollMagic.Controller();
	// Select elements
	const sliders = document.querySelectorAll('.slide');
	const nav = document.querySelector('.nav-header');
	// Loop over each slide
	sliders.forEach((slide, index, slides) => {
		const revealImg = slide.querySelector('.reveal-img');
		const img = slide.querySelector('img');
		const revealText = slide.querySelector('.reveal-text');
		// GSAP
		let slideTl = gsap.timeline({defaults: {duration: 1,ease: Power2.easeInOut}});
			slideTl.fromTo(revealImg, {x: "0%"}, {x:"100%"});
			slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
			slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75');
			slideTl.fromTo(nav, {y: '-100%'}, {y: '0%'}, '-=0.5');
		// Create scene
		slideScene = new ScrollMagic.Scene({
			triggerElement: slide,
			triggerHook: 0.25,
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
		pageScene = new ScrollMagic.Scene({
			triggerElement: slide,
			duration: '100%',
			triggerHook: 0
		})
		.setPin(slide, { pushFollowers: false })
		.setTween(pageTl)
		.addTo(controller)
	});
};

// export function detailAnimation() {
// 	// Init Controller
// 	controller = new ScrollMagic.Controller();
// 	slides.forEach((slide, index, slides) => {
// 		const slideTl = gsap.timeline({defaults: {duration:1}});
// 		const nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
// 		const nextImg = nextSlide.querySelector('img');
// 			slideTl.fromTo(slide, {opacity:1}, {opacity:0});
// 			slideTl.fromTo(nextSlide, {opacity:0}, {opacity:1}, "-=1");
// 			slideTl.fromTo(nextImg, {x:'50%'}, {x: '0%'});
// 		//Scene
// 		detailScene = new ScrollMagic.Scene({
// 			triggerElement: slide,
// 			duration: '100%',
// 			triggerHook: 0
// 		})
// 		.setPin(slide, {pushFollowers:false})
// 		.setTween(slideTl)
// 		.addTo(controller);
// 	})
// };
