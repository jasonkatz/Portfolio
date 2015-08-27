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
// Remove last input, since it is from the overlay
var input_array = [].slice.call(html_inputs);
input_array.splice(html_inputs.length - 1, 1);
var html_textareas = document.getElementsByTagName('textarea');
// Remove last textarea, since it is from the overlay
var textarea_array = [].slice.call(html_textareas)
textarea_array.splice(html_textareas.length - 1, 1);
// Combine inputs and textareas into one array
var inputs = input_array.concat(textarea_array);
var labels = [].slice.call(document.getElementsByTagName('label'));
// Remove last label, since it is from the overlay
labels.splice(labels.length - 1, 1);
var overlay = document.getElementsByClassName('form__overlay')[0];
var overlay_close_button = overlay.getElementsByClassName('form__overlay--close-button')[0];
var overlay_label = overlay.getElementsByTagName('label')[0];
var overlay_input = overlay.getElementsByTagName('input')[0];
var overlay_textarea = overlay.getElementsByTagName('textarea')[0];

function initForm() {
    inputs.forEach(function(obj) {
        obj.addEventListener("focusin", openFormOverlay);
    });
    overlay_close_button.addEventListener("click", closeFormOverlay);
}

// Initialize global input index to -1, for no input selected
var active_index = -1;
function openFormOverlay(e) {
    // Set the global input index
    active_index = inputs.indexOf(e.target);

    // Remove focus event listener from active input
    if (active_index || active_index != -1) {
        e.target.removeEventListener("focusin", openFormOverlay);
    }

    // Set overlay label content to match form
    overlay_label.innerHTML = labels[active_index].innerHTML;

    // Set appropriate input and value in overlay
    if (inputs[active_index].tagName == 'INPUT') {
        overlay_textarea.style.display = 'none';
        overlay_input.style.display = 'block';
        overlay_input.value = inputs[active_index].value;
    } else if (inputs[active_index].tagName == 'TEXTAREA') {
        overlay_input.style.display = 'none';
        overlay_textarea.style.display = 'block';
        overlay_textarea.value = inputs[active_index].value;
    } else {
        overlay_input.style.display = 'none';
        overlay_textarea.style.display = 'none';
    }

    animateOpenOverlay();
}

function closeFormOverlay(e) {
    // Save data to form
    if (inputs[active_index].tagName == 'INPUT') {
        inputs[active_index].value = overlay_input.value;
    } else if (inputs[active_index].tagName == 'TEXTAREA') {
        inputs[active_index].value = overlay_textarea.value;
    }

    // Reset overlay contents
    overlay_label.innerHTML = '';
    overlay_input.value = '';
    overlay_textarea.value = '';

    // Readd event listener to active input, and set the input to inactive
    if (active_index != -1) {
        inputs[active_index].addEventListener("focusin", openFormOverlay);
        active_index = -1;
    }

    animateCloseOverlay();
}

function animateOpenOverlay() {
    overlay.style.display = "block";
    overlay.style.zIndex = 3;
    Velocity(
        $(overlay)
        , {
            opacity: 1
        }
        , {
            duration: 500
            , easing: 'easeInOutCubic'
        }
    );
}

function animateCloseOverlay() {
    Velocity(
        $(overlay)
        , {
            opacity: 0
        }
        , {
            duration: 500
            , easing: 'easeInOutCubic'
            , complete: function() {
                overlay.style.display = "none";
                overlay.style.zIndex = 0;
            }
        }
    );
}