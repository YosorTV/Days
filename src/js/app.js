import ScrollMagic from "scrollmagic";
import gsap, { Power2 } from 'gsap';

gsap.registerPlugin();
let controller;
let slideScene;

function animateSlides() {
	// Init Controller
	controller = new ScrollMagic.Controller({addIndicators: true});
	// Select elements
	const sliders = document.querySelectorAll('.slide');
	const nav = document.querySelector('.nav-header');
	// Loop over each slide
	sliders.forEach(slide => {
		const revealImg = slide.querySelector('.reveal-img');
		const img = slide.querySelector('img');
		const revealText = slide.querySelector('.reveal-text');
		// GSAP
		const slideTl = gsap.timeline({
			defaults: {duration: 1,ease: Power2.easeInOut}
		});
		slideTl.fromTo(revealImg, {x: "0%"}, {x:"100%"});
		slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
		slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75');
		slideTl.fromTo(nav, {y: '-100%'}, {y: '0%'}, '-=0.5');
		// Create scene
		slideScene = new ScrollMagic.Scene({
			triggerElement: slide,
			triggerHook: 0.25
		})
		.setTween(slide)
		.addIndicators({
			colorStart:'white',
			colorTrigger: 'white',
			name: 'slide'
		})
		.addTo(controller)
	})
}

animateSlides();