var Mediator = require('./Mediator');
var Velocity = require('velocity-animate');
var $ = require('jquery');

module.exports =  {
    init    :   initHeader
}

Mediator.register('header', module);
module.receive = receive;

function receive(msg, data) {
    if (msg == 'HEADER_TOGGLE') {
        toggleHeader(data.size);
    }

    if (msg == 'PAGE_SCROLL') {
        current_state = data.slide_num;
        shiftArrow();
    }
}

// Readjust header on resize
var resizeThrottle = setTimeout(function() {}, 0);
function customHeaderOnResize() {
    window.addEventListener('resize', throttle);
    window.addEventListener('orientationchange', throttle);
    readjustHeader();
}

function throttle() {
    clearTimeout(resizeThrottle);
    resizeThrottle = setTimeout(function() {
        readjustHeader();
    }, 200);
}

function readjustHeader() {
    shiftArrow();
    if (current_state == 0) {
        miniToBigAnimation();
    } else {
        bigToMiniAnimation();
    }
}

// Get relevant header elements
var header_top = document.getElementsByClassName('js-header__top');
var header_mini_section = document.getElementsByClassName('js-header__mini-section');
var header_menu = document.getElementsByClassName('js-header__menu');
var header_items = document.getElementsByClassName('js-header__menu--items');
var html_header_items = document.getElementsByClassName('js-header__menu--item');
var header_item_list = [].slice.call(html_header_items);
var header_arrow = document.getElementsByClassName('js-header__menu--arrow');
var hamburger_wrapper = document.getElementsByClassName('js-hamburger__wrapper');
var header_mobile_menu = document.getElementsByClassName('js-header__mobile--menu');
var mobile_header_items = document.getElementsByClassName('js-mobile-header__menu--items');
var html_mobile_header_items = document.getElementsByClassName('js-mobile-header__menu--item');
var mobile_header_item_list = [].slice.call(html_mobile_header_items);

var current_state;
var mobile_menu_open = false;

function initHeader() {
    current_state = 0;
    shiftArrow();

    $(header_item_list).each(function(index, obj) {
        $(obj).on("click", function(e) {
            Mediator.send('HEADER_ITEM_CLICK', { item_num: index });
        });
    });
    $(mobile_header_item_list).each(function(index, obj) {
        $(obj).on("click", function(e) {
            Mediator.send('HEADER_ITEM_CLICK', { item_num: index });
        });
    });

    initializeHamburger();

    customHeaderOnResize();
}

function shiftArrow() {
    // Must shift using percentage since menu will change size
    var active_item = $(header_item_list[current_state]);
    var element_center = active_item.offset().left + active_item.outerWidth() / 2;
    var offset_percentage = (element_center - $(header_items).offset().left) / $(header_items).outerWidth() * 100;

    Velocity(
        $(header_arrow)
        , {
            'left': offset_percentage + '%'
        }
        , {
            duration: 500
            , easing: 'easeInOutCubic'
        }
    );
}

function initializeHamburger() {
    $(hamburger_wrapper).on('click', function(e) {
        e.preventDefault();
        mobile_menu_open ? this.classList.remove('is-active') : this.classList.add('is-active');
        mobile_menu_open = !mobile_menu_open;
        toggleMobileMenu();
    });
}

function toggleHeader(size) {
    if (size == 'mini') {
        bigToMiniAnimation();
    } else if (size == 'big') {
        miniToBigAnimation();
    }
}

function bigToMiniAnimation() {
    // Define menu animation so we don't have a huge complete block
    var animateMenu = function() {
        Velocity(
            $(header_items)
            , {
                'width': '75%'
            }
            , {
                duration: 250
                , easing: 'linear'
            }
        );
        Velocity(
            $(header_mini_section)
            , {
                'width': '25%'
            }
            , {
                duration: 250
                , easing: 'linear'
            }
        );
        $('.header__mini-section--text').css("display", "block");
        Velocity(
            $('.header__mini-section--text')
            , {
                'opacity': '1'
            }
            , {
                duration: 250
                , easing: 'linear'
            }
        );
    }

    // Begin by shrinking header upwards
    Velocity(
        $('.header__main')
        , {
            'margin-top': '-' + $(header_top).outerHeight()
        }
        , {
            duration:250
            , easing: 'linear'
            , complete: function() {
                // Then animate the menu
                animateMenu();
            }
        }
    );
}

function miniToBigAnimation() {
    // Define menu animation so we don't have a huge complete block
    var animateHeader = function() {
        Velocity(
            $('.header__main')
            , {
                'margin-top': '0px'
            }
            , {
                duration:250
                , easing: 'linear'
            }
        );
    }

    Velocity(
        $(header_items)
        , {
            'width': '100%'
        }
        , {
            duration: 250
            , easing: 'linear'
        }
    );
    Velocity(
        $(header_mini_section)
        , {
            'width': '0%'
        }
        , {
            duration: 250
            , easing: 'linear'
        }
    );
    $('.header__mini-section--text').css("display", "block");
    Velocity(
        $('.header__mini-section--text')
        , {
            'opacity': '0'
        }
        , {
            duration: 250
            , easing: 'linear'
            , complete: function() {
                // Then expand the header downwards
                animateHeader();
            }
        }
    );
}

function toggleMobileMenu() {
    // Slide menu out on open, slide menu in on close
    if (mobile_menu_open) {
        Velocity(
            $(header_mobile_menu)
            , {
                'width': '100%'
            }
            , {
                duration: 300
                , easing: 'linear'
            }
        );
    } else {
        Velocity(
            $(header_mobile_menu)
            , {
                'width': '0'
            }
            , {
                duration: 300
                , easing: 'linear'
            }
        );
    }
}
