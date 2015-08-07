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

// Get relevant header elements
var header_top = document.getElementsByClassName('js-header__top');
var header_mini_section = document.getElementsByClassName('js-header__mini-section');
var header_menu = document.getElementsByClassName('js-header__menu');
var header_items = document.getElementsByClassName('js-header__menu--items');
var html_header_items = document.getElementsByClassName('js-header__menu--item');
var header_item_list = [].slice.call(html_header_items);
var header_arrow = document.getElementsByClassName('js-header__menu--arrow');

function initHeader() {
    current_state = 0;
    shiftArrow(current_state);

    $(header_item_list).each(function(index, obj) {
        $(obj).on("click", function(e) {
            Mediator.send('HEADER_ITEM_CLICK', { item_num: index });
        });
    });
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
        $('header')
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
            $('header')
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
