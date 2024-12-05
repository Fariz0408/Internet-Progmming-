<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $date = htmlspecialchars($_POST["date"]);
    $time = htmlspecialchars($_POST["time"]);
    $doctor = htmlspecialchars($_POST["doctor"]);
    $notes = htmlspecialchars($_POST["notes"]);

    $to = "joelfaris8@gmail.com"; 
    $subject = "New Appointment Booking";
    $message = "Appointment Details:\n\n" .
               "Name: $name\n" .
               "Email: $email\n" .
               "Phone: $phone\n" .
               "Date: $date\n" .
               "Time: $time\n" .
               "Doctor: $doctor\n" .
               "Notes: $notes";

    $headers = "From: noreply@clinicwebsite.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully.";
    } else {
        echo "Error sending email.";
    }
}
?>
