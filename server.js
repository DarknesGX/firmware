const express = require('express');
const path = require('path');
const app = express();

// Route to download your firmware
app.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'Firmware_Installer.exe');
    res.download(filePath, 'Firmware_Installer.exe'); // forces browser to download
});

// Optional: home page redirects to download
app.get('/', (req, res) => {
    res.redirect('/file');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Firmware server running on port ${port}`));
