<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "vetsaoluispalmela@gmail.com";
    $subject = "Mensagem do site de $name";
    $body = "Nome: $name\nEmail: $email\n\nMensagem:\n$message";

    if (mail($to,  $subject, $body)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem. Tente novamente mais tarde.";
    }
}
