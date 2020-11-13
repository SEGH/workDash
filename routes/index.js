const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// Else send Angular app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

module.exports = router;