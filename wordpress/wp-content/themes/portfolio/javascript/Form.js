var Mediator = require('./Mediator');
var Velocity = require('velocity-animate');
var $ = require('jquery');

module.exports = {
    init    :   initForm
}

Mediator.register('form', module);
module.receive = receive;

function receive(msg, data) {
}

// Set up variables for relevant DOM elements
var html_inputs = document.getElementsByTagName('input');
var inputs = [].slice.call(html_inputs);

function initForm() {
    inputs.forEach(function(obj) {
        obj.addEventListener("focusin", function() { console.log('focusin'); });
        obj.addEventListener("focusout", function() { console.log('focusout'); });
    });
}
