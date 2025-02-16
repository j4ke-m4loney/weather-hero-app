const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));