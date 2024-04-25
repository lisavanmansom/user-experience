// hamburger menu select
let hamburger = document.querySelector('.hamburger')
let navMenu = document.querySelector('.desktop')

// hamburger menu addeventlistener
hamburger.addEventListener("click", () => { 
 navMenu.classList.toggle('nav-active');
 navMenu.classList.toggle('desktop');
 hamburger.classList.toggle('active-bar');

});

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

