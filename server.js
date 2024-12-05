const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database Setup
const db = new sqlite3.Database('./appointments.db', (err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                phone TEXT,
                date TEXT,
                time TEXT,
                doctor TEXT,
                notes TEXT
            )
        `);
    }
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password
    },
});

// Handle form submission
app.post('/submit-appointment', (req, res) => {
    const { name, email, phone, date, time, doctor, notes } = req.body;

    // Save to database
    db.run(
        `INSERT INTO appointments (name, email, phone, date, time, doctor, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone, date, time, doctor, notes],
        function (err) {
            if (err) {
                console.error('Failed to save to database:', err);
                return res.status(500).send('Failed to save appointment.');
            }

            // Send confirmation email to the customer
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Appointment Confirmation',
                text: `Dear ${name},\n\nYour appointment with ${doctor} on ${date} at ${time} has been booked successfully.\n\nThank you!`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Failed to send email:', error);
                    return res.status(500).send('Failed to send confirmation email.');
                }

                console.log('Email sent:', info.response);

                // Notify admin
                const adminMailOptions = {
                    from: 'your-email@gmail.com',
                    to: 'clinic-admin-email@gmail.com',
                    subject: 'New Appointment Booked',
                    text: `A new appointment has been booked:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nDoctor: ${doctor}\nNotes: ${notes}`,
                };

                transporter.sendMail(adminMailOptions, (error, info) => {
                    if (error) {
                        console.error('Failed to notify admin:', error);
                    } else {
                        console.log('Admin notified:', info.response);
                    }
                });

                res.status(200).send('Appointment booked successfully.');
            });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
document.getElementById('appointmentForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/submit-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to book appointment');
            }
            return response.text();
        })
        .then((message) => {
            document.getElementById('successMessage').innerText = 'Your appointment has been successfully booked!';
            document.getElementById('successMessage').style.display = 'block';
            console.log(message);

            // Clear the form
            document.getElementById('appointmentForm').reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('successMessage').innerText = 'Failed to book the appointment. Please try again.';
            document.getElementById('successMessage').style.display = 'block';
        });
});
res.status(200).send('Appointment booked successfully.');
res.status(500).send('Failed to save appointment.');
