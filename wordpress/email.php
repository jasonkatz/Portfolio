<?php
    $requestType = $_GET['type'];
    if ($requestType == 'sendEmail') {
        sendEmail();
    }


    function sendEmail() {
        $to = 'jkatz94@gmail.com';
        $subject = 'New message from ' . $_POST['name'] . ' at jasonkatz.me!';
        $message = $_POST['message'] . "\r\n -------------- \r\n" . $_POST['name'] . "\r\n" . $_POST['email'];
        $headers = 'From: webmaster@jasonkatz.me' . "\r\n" .
                   'Reply-To: webmaster@jasonkatz.me' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();
        mail($to, $subject, $message, $headers);
        error_log('done');
    }
?>
