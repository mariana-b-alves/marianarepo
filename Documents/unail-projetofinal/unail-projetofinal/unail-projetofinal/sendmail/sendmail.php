<?php

require_once 'vendor/autoload.php';

define("HOST", "unail.com");
define("PORT", 465);
define("SMTP_SECURE", "ssl");
define("USERNAME", "U Nail");
define("PASSWORD", "unailsaloon");
define("FROM_EMAIL", "marianalves.2002@gmail.com");
define("FROM_NAME", "U Nail");


$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$message = $_POST['subject'];


$msgAEnviar = "<p>Nome: " . $firstname . "</p>";
$msgAEnviar .= "<p>Apelido: " . $lastname . "</p>";
$msgAEnviar .= "<p>Email: " . $email . "</p>";
$msgAEnviar .= "<p>Mensagem: " . $message . "</p>";

$mail = new PHPMailer();

$mail->isSMTP();
$mail->Host = HOST;
$mail->SMTPAuth = true;
$mail->Username = USERNAME;
$mail->Password = PASSWORD;
$mail->SMTPSecure = SMTP_SECURE;
$mail->Port = PORT;

$mail->setFrom(FROM_EMAIL, FROM_NAME);
$mail->addAddress($email, $firstname);


$mail->Subject = "Finalização da transação";
$mail->Body    = $msgAEnviar;
$mail->AltBody = $msgAEnviar;

if (!$mail->send()) {
    echo 'Erro: A mensagem não foi enviada corretamente.';
    echo 'Erro: ' . $mail->ErrorInfo;
} else {
    echo 'A sua transação foi concluída com sucesso. Responda a este email para concluír o pagamento';
}
