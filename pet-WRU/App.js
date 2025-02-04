/*const express = require(`express`);
const path=require('path');
const app = express();

const PORT= process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname + '/mainpage.html'));
});

//listen for specific port
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));

*/

const express = require(`express`);
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mainpage.html'));
});

// Listen for specific port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
