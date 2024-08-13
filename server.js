const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public')); // Serve files from 'public'

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'SIAM', 'SIME.html'));
});

// Handle POST requests for terms acceptance
app.post('/api/terms-acceptance', (req, res) => {
    const { accepted } = req.body;
    console.log('Terms acceptance:', accepted);

    // Set cookie to expire on December 31, 2030
    res.cookie('termsAccepted', accepted, { 
        expires: new Date('2030-12-31T23:59:59Z'), 
        httpOnly: true 
    });
    res.json({ success: true, accepted });
});

// Handle POST requests for cookie consent
app.post('/api/cookie-consent', (req, res) => {
    const { accepted } = req.body;
    console.log('Cookie consent:', accepted);

    // Set cookie to expire on December 31, 2030
    res.cookie('cookiesAccepted', accepted, { 
        expires: new Date('2030-12-31T23:59:59Z'), 
        httpOnly: true 
    });
    res.json({ success: true, accepted });
});

// Check cookies
app.get('/check-cookies', (req, res) => {
    const termsAccepted = req.cookies.termsAccepted;
    const cookiesAccepted = req.cookies.cookiesAccepted;
    res.json({
        termsAccepted: termsAccepted || 'Cookie not found',
        cookiesAccepted: cookiesAccepted || 'Cookie not found'
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
