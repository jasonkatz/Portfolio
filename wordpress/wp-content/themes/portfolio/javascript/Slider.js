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
var sliding = false;

function initSlider() {
    // Set starting slide
    current_slide = 0; // Start at the beginning (slide 0)
    adjustSlider();

    // Initialize arrow click listeners
    arrows[0].addEventListener('click', function() {
        if (!sliding) {
            sliding = true;
            current_slide--;
            adjustSlider();
        }
    });
    arrows[1].addEventListener('click', function() {
        if (!sliding) {
            sliding = true;
            current_slide++;
            adjustSlider();
        }
    });

    // Initialize swipe listeners
    slides.forEach(function(obj) { obj.addEventListener("touchstart", detectSwipe); });
    slides.forEach(function(obj) { obj.addEventListener("touchmove", detectSwipe); });
}

function adjustSlider() {
    // Don't do anything if no slides are present
    if (!slides.length) return;

    // Readjust slide and arrow width and positioning
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
            , complete: function() {
                sliding = false;
            }
        }
    );

    if (arrows.length != 2) return; // Don't do anything to the arrows if there are not 2

    // Display both arrows
    arrows.forEach(function(obj) {
        obj.style.display = 'block';
    });

    // Animate left arrow visibility
    Velocity(
        $(arrows[0])
        , {
            'opacity': !slides_hash[current_slide].before ? '0' : '1'
        }
        , {
            duration: 250
            , easing: 'easeInOutCubic'
            , complete: function() {
                if (!slides_hash[current_slide].before) {
                    arrows[0].style.display = 'none';
                }
            }
        }
    );

    // Animate right arrow visibility
    Velocity(
        $(arrows[1])
        , {
            'opacity': !slides_hash[current_slide].after ? '0' : '1'
        }
        , {
            duration: 250
            , easing: 'easeInOutCubic'
            , complete: function() {
                if (!slides_hash[current_slide].after) {
                    arrows[1].style.display = 'none';
                }
            }
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

function detectSwipe(e) {
    e.preventDefault();

    // Get swipe direction
    var dir = '';
    if (e.type == 'touchstart') {
        dir = getTouchStartDirection(e);
    } else if (e.type == 'touchmove') {
        dir = getTouchDirection(e);
    }

    // Execute slide change
    if (!sliding && dir) {
        sliding = true;
        if (dir == 'right' && slides_hash[current_slide].after) {
            current_slide++;
        } else if (dir == 'left' && slides_hash[current_slide].before) {
            current_slide--;
        }
        adjustSlider();
    }
}

var previous_swipe = 0;

function getTouchStartDirection(e) {
    e.stopPropagation();
    previous_swipe = e.touches[0].clientX;
    return "";
}

function getTouchDirection(e) {
    e.preventDefault();

    var dir = "";

    if (previous_swipe < e.touches[0].clientX) {
        dir = "left";
    } else if (previous_swipe > e.touches[0].clientX) {
        dir = "right";
    }

    return dir;
}
