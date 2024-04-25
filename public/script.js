// Nav hamburger menu select ------------------------------
let hamburger = document.querySelector('.hamburger')
let navMenu = document.querySelector('.desktop')

// hamburger menu addeventlistener
hamburger.addEventListener("click", () => { 
 navMenu.classList.toggle('nav-active');
 navMenu.classList.toggle('desktop');
 hamburger.classList.toggle('active-bar');

});

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

// PE suggested + liked playlist section
const body = document.querySelector('body')
const circletext = document.querySelector('.circle-text')
const hiddenHeader = document.querySelectorAll('.hidden-header')

// JS code added & circle showing
body.classList.add('has-js')
body.classList.remove('suggested-no-js')
body.classList.remove('liked-no-js')
circletext.hidden = false

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