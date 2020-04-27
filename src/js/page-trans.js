import { gsap, Power2 } from "gsap";
import { animateSlides } from './slides-anim'
import barba from '@barba/core';

const logo = document.querySelector('#logo');
// Barba page transition
barba.init({
  views: [
    {
    namespace: 'home',
    beforeEnter(){
      animateSlides();
    },
    beforeLeave(){
      slideScene.destroy();
      pageScene.destroy();
      controller.destroy();
    }
  },
  {
		namespace: 'fashion',
    beforeLeave(){
      controller.destroy();
      detailScene.destroy();
    }
  }
  ],
  transitions: [
    {
      leave({current, next}){
				let done = this.async();
				//Add Animation
				const tl = gsap.timeline({defaults: {ease: Power2.easeInOut}});
				tl.fromTo(current.container, 1, {opacity: 1}, {opacity: 0, onComplete: done});
				tl.fromTo('.swipe', .75, {x: '-100%'}, {x: '0%', onComplete:done}, '-=0.5');
      },
      enter({current, next}){
				let done = this.async();
				//Scroll to the top
				window.scrollTo(0,0);
				//Add Animation
				const tl = gsap.timeline({defaults: {ease: Power2.easeInOut}});
				tl.fromTo('.swipe', 1, {x: '0%'}, {x: '100%', stagger: .25, onComplete:done});
        tl.fromTo(next.container, 1, {opacity: 0}, {opacity: 1, onComplete: done});
        tl.fromTo('.nav-header', 1, {y:'-100%'}, {y: '0%', ease: Power2.easeInOut}, '-=1.5')
      }
    }
  ]
});
