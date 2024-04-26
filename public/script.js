
// Nav hamburger menu select ------------------------------
let hamburger = document.querySelector('.hamburger')
let navMenu = document.querySelector('.desktop')
let lessons = document.querySelector('.lessons')

// hamburger menu addeventlistener
hamburger.addEventListener("click", () => { 
 navMenu.classList.toggle('nav-active');
 navMenu.classList.toggle('desktop');
 hamburger.classList.toggle('active-bar');
});

// PE suggested + liked playlist section -------------------------
const body = document.querySelector('body')
const likedCircle = document.querySelector('.liked-circle')
const sugCircle = document.querySelector('.sug-circle')
const hiddenHeader = document.querySelectorAll('.hidden-header')
const prevBTN = document.querySelector('.prevBTN')
const nextBTN = document.querySelector('.nextBTN')

// JS code added & removing styling without JS
body.classList.add('has-js')
body.classList.remove('sug-no-js')
body.classList.remove('liked-no-js')
// hide content no function w/o JS
likedCircle.hidden = false
sugCircle.hidden = false
nextBTN.hidden = false
prevBTN.hidden = false

// Carousel liked + suggested playlist --------------------
// external JS file GSAP 
 document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Draggable)
   });

// GSAP draggable 
Draggable.create(".slayrousel", {
    type: "rotation",
    inertia: true
  });

// Clientside fetch -------------------------------
let forms = document.querySelectorAll("form.like-form");
// loop door forms
forms.forEach(function (form) {

  form.addEventListener("submit", function (event) {
    
    // leest data form + geeft extra eigenschap mee
    let data = new FormData(this);
    data.append("enhanced", true);

    // client-side fetch
    fetch(this.action, {
      method: this.method,
      body: new URLSearchParams(data),
    })

    // return html
    .then(function (response) {
      return response.text();
    })

    // Aanpassing DOM
    .then(function (responseHTML) {
      document.querySelector(".liked-playlist > .art-slayrousel").innerHTML = responseHTML;
      console.log(responseHTML);
    })
    .catch(function (error) {
      console.error('Error:', error);
    });

    event.preventDefault()

  });
});

// Allstories carousel -------------------------------