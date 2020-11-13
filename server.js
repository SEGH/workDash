// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const passport = require("./config/passport");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

// Serving static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/dist"));
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use(routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workDash", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

// Start the API server
app.listen(PORT, function() {
    console.log(`Server now listening on PORT ${PORT}`);
});