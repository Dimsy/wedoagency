<?php

$frm_name  = "VkusArom";
$recepient = "oleg@spiritcenter.ru";
$sitename  = "SweetFeel.ru";
$subject   = "Новая заявка с сайта \"$sitename\"";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$message = trim($_POST["message"]);

$message = "
E-mail: $email <br>
Имя: $name <br>
Сообщение: $message
";

echo $message;


mail($recepient, $subject, $message, "From: $frm_name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");
