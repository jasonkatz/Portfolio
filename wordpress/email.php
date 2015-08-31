<?php
    $requestType = $_GET['type'];
    if ($requestType == 'sendEmail') {
        sendEmail();
    }

    function sendEmail() {
        error_log('hi');
    }
?>
