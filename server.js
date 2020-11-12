// Import dependencies
const express = require("express");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

// Serving static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/dist"));
}

// Start the API server
app.listen(PORT, function() {
    console.log(`Server now listening on PORT ${PORT}`);
});