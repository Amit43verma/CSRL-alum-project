const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the CSRL Alum Project Backend!');
});

// Example API route
app.get('/api/data', (req, res) => {
    const sampleData = [
        { id: 1, name: 'John Doe', role: 'Alumni' },
        { id: 2, name: 'Jane Smith', role: 'Student' },
    ];
    res.json(sampleData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});