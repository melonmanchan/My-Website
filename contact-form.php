<?php
if (isset($_POST['email'], $_POST['subject'], $_POST['message']) {
    $to      = 'melonmanchan@gmail.com';
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $from    = $_POST['email'];
    $headers = 'From: ' . $from .' . "\r\n" .
        'Reply-To: webmaster@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    try {
    mail($to, $subject, $message, $headers);
    } catch (Exception $err) {echo $err}
    echo "ok"
} else { echo "invalid"}
?>
