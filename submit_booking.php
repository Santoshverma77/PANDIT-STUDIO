<?php
// Database configuration (uncomment if using database)
/*
$db_host = 'localhost';
$db_user = 'username';
$db_pass = 'password';
$db_name = 'pandit_studio';
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize inputs
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $service = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
    $date_time = filter_input(INPUT_POST, 'date_time', FILTER_SANITIZE_STRING);
    $special_requests = filter_input(INPUT_POST, 'special_requests', FILTER_SANITIZE_STRING);

    if (!$name || !$phone || !$email || !$service || !$date_time) {
        die("Please fill all required fields");
    }

    // Email configuration
    $to = "your_email@example.com"; // Replace with your email
    $subject = "New Booking Request";
    $message = "Name: $name\nPhone: $phone\nEmail: $email\nService: $service\nDate & Time: $date_time\nSpecial Requests: $special_requests";
    $headers = "From: $email";

    // Database storage (uncomment if using database)
    /*
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $stmt = $conn->prepare("INSERT INTO bookings (name, phone, email, service, date_time, special_requests) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $phone, $email, $service, $date_time, $special_requests);
    $db_success = $stmt->execute();
    $stmt->close();
    $conn->close();
    */

    // Send email and respond
    if (mail($to, $subject, $message, $headers) /* && $db_success */) {
        echo "<script>alert('Booking successful! We will contact you soon.'); window.location.href = 'index.html';</script>";
    } else {
        echo "<script>alert('There was an error processing your booking. Please try again later.'); window.location.href = 'index.html';</script>";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
