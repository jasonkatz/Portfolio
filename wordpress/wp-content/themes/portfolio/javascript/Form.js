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
var submit_button = document.getElementsByClassName('form__submit-button')[0];

function initForm() {
    // Prevent page refresh on form submit
    $('form').submit(function() { return false; });

    inputs.forEach(function(obj) {
        obj.addEventListener("focusin", openFormOverlay);
        obj.addEventListener("keydown", submitForm);
    });
    overlay_close_button.addEventListener("click", closeFormOverlay);
    overlay.addEventListener("keydown", closeFormOverlay);
    submit_button.addEventListener("click", submitForm);
}

// Initialize global input index to -1, for no input selected
var active_index = -1;
function openFormOverlay(e) {
    // Don't open the overlay unless we are on a touch device
    if (!Modernizr.touch) return;

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
        // Toggle input visibility
        overlay_textarea.style.display = 'none';
        overlay_input.style.display = 'block';
        // Set input value
        overlay_input.value = inputs[active_index].value;
    } else if (inputs[active_index].tagName == 'TEXTAREA') {
        // Toggle textarea visibility
        overlay_input.style.display = 'none';
        overlay_textarea.style.display = 'block';
        // Set textarea value
        overlay_textarea.value = inputs[active_index].value;
    } else {
        // Hide both inputs
        overlay_input.style.display = 'none';
        overlay_textarea.style.display = 'none';
    }

    animateOpenOverlay(active_index);
}

function closeFormOverlay(e) {
    // Don't close if a key other than enter or escape was pressed
    if (e.type == 'keydown' && (e.which != 13 && e.which != 27)) return;
    // Don't close if textarea is in the overlay, since you should be able to have line-breaks
    if (e.type == 'keydown' && e.which == 13 && inputs[active_index].tagName == 'TEXTAREA') return;

    // Save data to form
    if (inputs[active_index].tagName == 'INPUT') {
        inputs[active_index].value = overlay_input.value;
        // Make sure to unfocus (blur) the input so that the mobile keyboard goes away
        overlay_input.blur();
    } else if (inputs[active_index].tagName == 'TEXTAREA') {
        inputs[active_index].value = overlay_textarea.value;
        // Make sure to unfocus (blur) the textarea so that the mobile keyboard goes away
        overlay_textarea.blur();
    }

    // Reset overlay contents
    overlay_label.innerHTML = '';
    overlay_input.value = '';
    overlay_textarea.value = '';

    animateCloseOverlay(active_index);

    // Readd event listener to active input, and set the input to inactive
    if (active_index != -1) {
        inputs[active_index].addEventListener("focusin", openFormOverlay);
        active_index = -1;
    }
}

function animateOpenOverlay(input_index) {
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
            , complete: function() {
                // Focus overlay input
                if (inputs[input_index].tagName == 'INPUT') {
                    overlay_input.focus();
                } else if (inputs[input_index].tagName == 'TEXTAREA') {
                    overlay_textarea.focus();
                }
            }
        }
    );
}

function animateCloseOverlay(input_index) {
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

                // Scroll to bottom
                Velocity(
                    $(inputs[input_index])
                    , "scroll"
                    , {
                        duration: 50
                        , easing: "easeInOutCubic"
                    }
                );
            }
        }
    );
}

function submitForm(e) {
    if (e.type == 'keydown' && e.which != 13) return;

    var error = false;

    var validate_data;
    if (!(validate_data = validateForm()).valid) {
        error = true;
    }

    if (!error) {
        sendEmail(error, validate_data)
    } else {
        finishFormSubmit(error, validate_data);
    }
}

function finishFormSubmit(error, validate_data, email_data) {
    if (error) {
        errorUpdateForm(validate_data, email_data);
    } else {
        successUpdateForm();
    }
}

function validateForm() {
    var invalid_inputs = [false, false, false];
    var input_problem = ['success', 'success', 'success'];
    if (inputs[0].value == null || inputs[0].value == '') {
        invalid_inputs[0] = true;
        input_problem[0] = 'empty';
    }
    if (inputs[1].value == null || inputs[1].value == '') {
        invalid_inputs[1] = true;
        input_problem[1] = 'empty';
    }
    if (inputs[2].value == null || inputs[2].value == '') {
        invalid_inputs[2] = true;
        input_problem[2] = 'empty';
    }

    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!invalid_inputs[1] && !re.test(inputs[1].value)) {
        invalid_inputs[1] = true;
        input_problem[1] = 'invalid';
    }

    var valid = true;
    if (invalid_inputs[0] || invalid_inputs[1] || invalid_inputs[2]) {
        valid = false;
    }

    return {
        valid: valid,
        problems: input_problem
    };
}

var send_state = 'not_sent';
function sendEmail(error, validate_data) {
    if (send_state == 'sending') return;

    var input_data = {
        name: inputs[0].value,
        email: inputs[1].value,
        message: inputs[2].value
    };
    var result = {
        success: false,
        message: ''
    };

    // Set success to fake async call
    result.success = true;
    finishFormSubmit(error, validate_data, result);
    send_state = 'sending';
    // Send email
    $.ajax({
        data: input_data,
        url: 'email.php?type=sendEmail',
        method: 'POST',
        success: function(msg) {
            done = true;
            result.success = true;
            send_state = 'sent';
            finishFormSubmit(error, validate_data, result);
        }, error: function(xhr, status, err) {
            done = true;
            result.message = err;
            error = true;
            send_state = 'error';
            finishFormSubmit(error, validate_data, result);
        }
    });
}

// Grab container element
var form_container = inputs[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
// Grab title element
var title = form_container.children[0].children[0].children[0];
var title_base = title.innerHTML;
function successUpdateForm() {
    // Change title
    title.innerHTML = title_base + ' - Success!';

    // Make sure that input borders aren't red
    inputs.forEach(function(obj) {
        if (obj.tagName == 'INPUT') {
            obj.style.border = '2px inset';
            obj.style.borderColor = 'none';
        } else if (obj.tagName == 'TEXTAREA') {
            obj.style.borderColor = '#ccc';
        }
    });

    // Animate background
    form_container.style.backgroundColor = '#98ff98';
    Velocity(
        $(form_container)
        , {
            backgroundColor: '#fff'
        }
        , {
            duration: 500
            , easing: 'linear'
        }
    );
}

function errorUpdateForm(validate_data, email_data) {
    // Change title (and form) based on error
    if (validate_data && !validate_data.valid) {
        title.innerHTML = title_base + ' - Validation Error!';
        inputs.forEach(function(obj, index) {
            // Turn input border red for invalid inputs
            if (validate_data[index] != 'success') {
                obj.style.borderColor = '#f5697c';
            }
        });
    }

    if (email_data && !email_data.success) {
        title.innerHTML = title_base + ' - Email Error!';
    }

    // Animate background
    form_container.style.backgroundColor = '#f5697c';
    Velocity(
        $(form_container)
        , {
            backgroundColor: '#fff'
        }
        , {
            duration: 500
            , easing: 'linear'
        }
    );
}
