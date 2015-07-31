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
}

function initHeader() {
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
            $('.header__menu--items')
            , {
                'width': '75%'
            }
            , {
                duration: 250
                , easing: 'linear'
            }
        );
        Velocity(
            $('.header__mini-section')
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
            'margin-top': '-200px'
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
        $('.header__menu--items')
        , {
            'width': '100%'
        }
        , {
            duration: 250
            , easing: 'linear'
        }
    );
    Velocity(
        $('.header__mini-section')
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
