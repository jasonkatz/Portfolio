var Mediator = require('./Mediator');
var Velocity = require('velocity-animate');
var $ = require('jquery');

module.exports = {
    init    :   initSlider
}

Mediator.register('slider', module);
module.receive = receive;

function receive(msg, data) {
    if (msg == 'WINDOW_RESIZE') {
        adjustSlider();
    }
}

var slideshow = document.getElementsByClassName('js-portfolio__slideshow')[0];

// Set up hash of slider elements with before, after and current variables
var html_slides = document.getElementsByClassName('js-portfolio__slide');
var slides = [].slice.call(html_slides);
var slides_hash = {};
for (var i = 0; i < slides.length; ++i) {
    slides_hash[i] = {};
    if (i > 0) {
        slides_hash[i].before = slides[i - 1];
    }
    if (i < (slides.length - 1)) {
        slides_hash[i].after = slides[i + 1];
    }
    slides_hash[i].current = slides[i];
}
var arrows = [].slice.call(document.getElementsByClassName('js-portfolio__slideshow--arrow'));

// Initial scroll values
var current_slide;
var scrolling = false;

function initSlider() {
    current_slide = 3;
    adjustSlider();
}

function adjustSlider() {
    if (!slides.length) return;

    slide_width = slides[0].clientWidth;
    setWidth();
    focusCurrentSlide();
    setArrows();
}

function setWidth() {
    var slider_width = slides.length * slide_width;
    slideshow.style.width = slider_width + 'px';
}

function focusCurrentSlide() {
    // Get the center of the target slide
    var target_center = slides[current_slide].offsetLeft + (slides[current_slide].clientWidth / 2);
    // Use center of screen to calculate desired translation
    var slide_translation = (window.innerWidth / 2) - target_center;

    // Animate slide
    Velocity(
        $(slideshow)
        , {
            translateX: slide_translation
        }
        , {
            duration: 250
            , easing: 'easeInOutCubic'
        }
    );

    if (arrows.length != 2) return;

    // Animate left arrow visibility
    Velocity(
        $(arrows[0])
        , {
            'opacity': current_slide == 0 ? '0' : '1'
        }
        , {
            duration: 250
            , easing: 'easeInOutCubic'
        }
    );

    // Animate right arrow visibility
    Velocity(
        $(arrows[1])
        , {
            'opacity': current_slide == (slides.length - 1) ? '0' : '1'
        }
        , {
            duration: 250
            , easing: 'easeInOutCubic'
        }
    );
}

function setArrows() {
    // Since the page is symmetric, we only need to calculate the required width of one arrow
    var arrow_width = (window.innerWidth / 2) - (slide_width / 2);
    if (arrow_width > (slide_width / 2)) {
        arrow_width = slide_width / 2;
    }
    arrows.forEach(function(obj) {
        obj.style.width = arrow_width + 'px';
    });
}
