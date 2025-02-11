const express = require(`express`);
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const Routes = require("./Routes");


// Middleware for parsing URL-encoded and JSON data
app.use(express.json());
app.use(express.static(__dirname));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Use routes
app.use(Routes);

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mainpage.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
