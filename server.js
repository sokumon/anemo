// Import required modules
const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');
const { takeScreenshot } = require('./take_screenshot.js');

// const __filename = fileURLToPath(require.main.filename);

// const __dirname = path.dirname(__filename);
// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

// Define the static file directory
const publicDirectoryPath = path.join(__dirname, '/');

// Serve static files (e.g., index.html)
app.use(express.static(publicDirectoryPath));
app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/getnemo',async function(req,res){

  let detected_feeling = req.query.feeling;
  let result  = await takeScreenshot(detected_feeling);
  
  let result_json = {
    "image":result
  }

  res.send(result_json);


});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});