<?php

$phone = trim($_POST['userphone']); // Убираем лишние пробелы
$email = isset($_POST['email']) ? trim($_POST['email']) : ''; // Проверяем, передан ли email

$token = "7765492997:AAEBPJhG1EF82KgJkEg2P98P678TIbrYXEw";
$chat_id = "5118219708";

// Формируем сообщение
$txt = "";

if (!empty($phone)) {
    $txt .= "<b>Телефон:</b> " . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'); 
}

if (!empty($email)) {
    $txt .= "\n<b>Email:</b> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
}

// Формируем массив с параметрами
$data = [
    'chat_id' => $chat_id,
    'parse_mode' => 'HTML',
    'text' => $txt
];

// Инициализация cURL
$ch = curl_init("https://api.telegram.org/bot{$token}/sendMessage");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Проверяем результат
if ($http_code == 200) {
    header('Location: thanks.html');
    exit();
} else {
    echo "Ошибка отправки сообщения в Telegram: $response";
}
?>