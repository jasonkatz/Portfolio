var Mediator = require('./Mediator');
var Velocity = require('velocity-animate');
var $ = require('jquery');

module.exports = {
    init    :   initScroll
}

Mediator.register('scroll', module);
module.receive = receive;

function receive(msg, data) {
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

    // Bind chevron events
    for (slide in slides_hash) {
        if (slides_hash[slide].after) {
            $(slides_hash[slide].current.getElementsByClassName('js-chevron')).on("click", chevronClick);
        }
    }
}

function snapScroll(e) {
    e.stopPropagation();

    if (e.type == "touchstart") {
        getTouchStartScrollDirection(e);
        return;
    }

    // Only allow possible scroll if not already scrolling
    if (!scrolling) {
        var dir = getScrollDirection(e);
        handleScroll(dir);
    }
}

function handleScroll(dir) {
    // Scroll for cases where there is a slide to go to
    if (dir == 'up' && slides_hash[current_slide].before) {
        var new_slide = current_slide - 1;
        scrollTo(new_slide);

        // If we are entering the first slide, show the big header
        if (current_slide != new_slide && new_slide == 0) {
            Mediator.send('HEADER_TOGGLE', { size: 'big' });
        }

        current_slide = new_slide;
    } else if (dir == 'down' && slides_hash[current_slide].after) {
        var new_slide = current_slide + 1;
        scrollTo(new_slide);

        // If we are leaving the first slide, show the mini header
        if (current_slide != new_slide && current_slide == 0) {
            Mediator.send('HEADER_TOGGLE', { size: 'mini' });
        }

        current_slide = new_slide;
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
            }
        }
    );
    Mediator.send('PAGE_SCROLL', { slide_num: slide_num });
}


function getScrollDirection(e) {
    if (e.type == "keydown") {
        return getKeyDownScrollDirection(e);
    } else if (e.type == "mousewheel" || e.type == "wheel" || e.type == "DOMMouseScroll" || e.type == "MozMousePixelScroll") {
        return getWheelScrollDirection(e);
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
    e.stopPropagation();
    previous_swipe = e.touches[0].clientY;
    return "";
}

function getTouchScrollDirection(e) {
    e.preventDefault();

    var dir = "";

    if (previous_swipe < e.touches[0].clientY) {
        dir = "up";
    } else if (previous_swipe > e.touches[0].clientY) {
        dir = "down";
    }

    return dir;
}

function chevronClick(e) {
    e.preventDefault();

    handleScroll('down');
}
