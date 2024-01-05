<?php

// Konfigurasi database PostgreSQL
$host = "localhost";
$port = "5432";
$username = "postgres";
$password = "admin";
$database = "inv";

// Koneksi ke database
$conn = new PDO("pgsql:host=$host;port=$port;dbname=$database;user=$username;password=$password");

// Set header untuk menentukan tipe konten sebagai JSON
header('Content-Type: application/json');

// Mendapatkan data dari database (contoh)
$query1 = "SELECT id, name, meta FROM indonesia_villages";
$query2 = "SELECT id, name, meta FROM indonesia_provinces";
$query3 = "SELECT id, name, meta FROM indonesia_districts";
$query4 = "SELECT id, name, meta FROM indonesia_cities";

$result1 = $conn->query($query1);
$result2 = $conn->query($query2);
$result3 = $conn->query($query3);
$result4 = $conn->query($query4);

// Menggabungkan hasil query menjadi satu array
$combinedData = array_merge(
    $result1->fetchAll(PDO::FETCH_ASSOC),
    $result2->fetchAll(PDO::FETCH_ASSOC),
    $result3->fetchAll(PDO::FETCH_ASSOC),
    $result4->fetchAll(PDO::FETCH_ASSOC)
);

// Menutup koneksi database
$conn = null;

// Mengembalikan data dalam format JSON
echo json_encode($combinedData);
