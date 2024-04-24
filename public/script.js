 // external JS file GSAP
 document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Draggable)
   });

// GSAP draggable 
Draggable.create(".slayrousel", {
    type: "rotation",
    inertia: true
  });

// PE suggested + liked playlist section
const body = document.querySelector('body')
const circletext = document.querySelector('.circle-text')

// JS code added & circle showing
body.classList.add('has-js')
circletext.hidden = false

