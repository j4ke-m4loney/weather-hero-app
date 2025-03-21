const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Load the environment variables from the .env file
const app = express(); // Create an Express app

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Serve the index.html when accessing the root URL
app.get('/api-key', (req, res) => { // Define a route to get the API key
  res.json({ apiKey: process.env.API_KEY }); // Send the API key as a JSON response
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));