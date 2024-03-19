<?php
$http = new swoole_http_server("0.0.0.0", 8101);

$http->on("start", function ($server) {
    echo "Swoole http server is started at http://127.0.0.1:8101\n";
});

$http->on("request", function ($request, $response) {
    $response->header("Content-Type", "application/json"); // Mengatur tipe konten ke JSON
    $data = json_encode(["message" => "Hello World"]); // Mengonversi data ke format JSON
    $response->end($data); // Mengirim respons JSON
});

$http->start();