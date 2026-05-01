const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // In a real application, you would:
    // 1. Validate input more thoroughly.
    // 2. Send an email (e.g., using Nodemailer, SendGrid, Mailgun).
    // 3. Save to a database.
    console.log('New contact form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('---');

    res.status(200).json({ message: 'Message received successfully!' });
});

// Catch-all to serve index.html for any other routes (e.g., for direct access to /about)
// This is useful for single-page applications (SPAs)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Frontend served from the /public directory.');
});
