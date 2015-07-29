var Velocity = require('velocity-animate');
var $ = require('jquery');

module.exports = {
    init    :   initScroll
}

// Set up hash of slide elements with before, after and current variables
var html_slides = document.getElementsByClassName('js-slide');
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

// Initial scroll values
var current_slide = 0;
var scrolling = false;

function initScroll() {
    // Start at slide 1 ALWAYS
    scrollTo(current_slide);

    // Set up scroll event listeners
    var wrapper = document.getElementById('wrapper');
    wrapper.addEventListener("mousewheel", snapScroll);
    wrapper.addEventListener("wheel", snapScroll);
    wrapper.addEventListener("DOMMouseScroll", snapScroll);
    wrapper.addEventListener("MozMousePixelScroll", snapScroll);
    wrapper.addEventListener("touchstart", snapScroll);
    wrapper.addEventListener("touchmove", snapScroll);
    document.addEventListener("keydown", snapScroll);
}

function snapScroll(e) {
    e.stopPropagation();

    // Only allow possible scroll if not already scrolling
    if (!scrolling) {
        var dir = getScrollDirection(e);
        // Scroll for cases where there is a slide to go to
        if (dir == 'up' && slides_hash[current_slide].before) {
            var new_slide = current_slide - 1;
            scrollTo(new_slide);
            current_slide = new_slide;
        } else if (dir == 'down' && slides_hash[current_slide].after) {
            var new_slide = current_slide + 1;
            scrollTo(new_slide);
            current_slide = new_slide;
        }
    }
}

function scrollTo(slide_num) {
    scrolling = true;
    Velocity(
        slides_hash[slide_num].current
        , "scroll"
        , {
            duration: 1000
            , easing: "easeInOutCubic"
            , complete: function(element) {
                scrolling = false;
                if (slide_num != 0) {
                    $('header').addClass('header__mini');
                } else {
                    $('header').removeClass('header__mini');
                }
            }
        }
    );
}


function getScrollDirection(e) {
    if (e.type == "keydown") {
        return getKeyDownScrollDirection(e);
    } else if (e.type == "mousewheel" || e.type == "wheel" || e.type == "DOMMouseScroll" || e.type == "MozMousePixelScroll") {
        return getWheelScrollDirection(e);
    } else if (e.type == "touchstart") {
        return getTouchStartScrollDirection(e);
    } else if (e.type == "touchmove") {
        return getTouchScrollDirection(e);
    } else {
        return "";
    }
}

function getKeyDownScrollDirection(e) {
    if (e.which == 40) {
        return 'down';
    } else if (e.which == 38) {
        return 'up';
    } else {
        return "";
    }
}

function getWheelScrollDirection(e) {
    var delta = e.deltaY || e.wheelDelta;
    delta *= -1;

    var dir = "";
    if (delta > 0) {
        dir = 'up';
    } else {
        dir = 'down';
    }

    return dir;
}

var previous_swipe = 0;

function getTouchStartScrollDirection(e) {
    previous_swipe = e.touches[0].clientY;
    return "";
}

function getTouchScrollDirection(e) {
    var dir = "";

    if (previous_swipe < e.touches[0].clientY) {
        dir = "up";
    } else if (previous_swipe > e.touches[0].clientY) {
        dir = "down";
    }

    return dir;
}
