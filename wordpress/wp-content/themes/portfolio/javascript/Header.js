var Mediator = require('./Mediator');
var Velocity = require('velocity-animate');
var $ = require('jquery');

module.exports =  {
    init    :   initHeader
}

Mediator.register('header', module);
Mediator.receive = receive;

function receive(msg, data) {
    if (msg == 'HEADER_TOGGLE') {
        toggleHeader();
    }
}

var header_big = $('.header__big');
var header_mini = $('.header__mini');

function initHeader() {
}

function toggleHeader() {
}
