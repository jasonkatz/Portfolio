var Mediator = require('./Mediator');
var Velocity = require('velocity-animate');
var $ = require('jquery');

module.exports = {
    init    :   initScroll
}

Mediator.register('scroll', module);
module.receive = receive;

function receive(msg, data) {
    if (msg == 'HEADER_ITEM_CLICK') {
        jumpScroll(data.item_num);
    }
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
var touch_scroll = false;

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
    wrapper.addEventListener("touchend", snapScroll);
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

    // Prevent default behavior on touchmove and home/end keypresses
    if  (e.type == 'touchmove' ||
        (e.type == 'keydown' && (e.which == 35 || e.which == 36))) {
        e.preventDefault();
    }

    if (e.type == 'touchstart') {
        // Handle touchstart if not slider
        var slider_slides = [].slice.call(document.getElementsByClassName('js-portfolio__slide'));
        if (!isDescendant(slider_slides, e.target)) {
            touch_scroll = true;
            getTouchStartScrollDirection(e);
        }
        return;
    } else if (e.type == 'touchend') {
        // Reset touch_scroll flag
        touch_scroll = false;
        return;
    } else if (e.type == 'touchmove') {
        // If not touch_scroll, return
        if (!touch_scroll) {
            return;
        }
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

function jumpScroll(new_slide) {
    scrollTo(new_slide);

    // If we are entering the first slide, show the big header
    if (current_slide != new_slide && new_slide == 0) {
        Mediator.send('HEADER_TOGGLE', { size: 'big' });
    } else if (current_slide != new_slide && current_slide == 0) {
        Mediator.send('HEADER_TOGGLE', { size: 'mini' });
    }

    current_slide = new_slide;
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
    // If a form input is active, don't scroll
    var active_element = document.activeElement;
    if (active_element && (active_element.tagName.toLowerCase() == 'input' && active_element.type == 'text' ||
        active_element.tagName.toLowerCase() == 'textarea')) {
        return "";
    }

    if (e.which == 40 || e.which == 39 || e.which == 34) {
        // Scroll down on downarrow, leftarrow and pagedown
        return 'down';
    } else if (e.which == 38 || e.which == 37 || e.which == 33) {
        // Scroll up on uparrow, rightarrow and pageup
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

function isDescendant(parent, child) {
    var match = false;
    for (var i = 0; i < parent.length; ++i) {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent[i]) {
                return true;
            }
            node = node.parentNode;
        }
    }
    return false;
}
