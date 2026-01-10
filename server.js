const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

// Function to serve the downloading page and trigger the file download
function serveDownloadPage(req, res) {
    // Path to the EXE file
    const filePath = path.join(__dirname, 'Firmware_Installer.exe');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    // Send the futuristic page with automatic download
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Firmware Download</title>
        <link rel="stylesheet" href="/style.css">
        <script>
            // Trigger automatic download
            window.onload = () => {
                const link = document.createElement('a');
                link.href = '/download';
                link.download = 'Firmware_Installer.exe';
                document.body.appendChild(link);
                link.click();
            }
        </script>
    </head>
    <body>
        <div class="container">
            <h1 class="title">DOWNLOADING...</h1>
            <p class="subtitle">Your firmware installer is being downloaded automatically.</p>
            <a class="manual" href="/download">Manual Download</a>
        </div>
    </body>
    </html>
    `);
}

// Routes to show the same page for `/` and `/file`
app.get(['/', '/file'], serveDownloadPage);

// Separate route that actually sends the file
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'Firmware_Installer.exe');
    res.download(filePath, 'Firmware_Installer.exe');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Firmware server running on port ${port}`));
