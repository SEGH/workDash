const router = require("express").Router();
const userRoutes = require("./users");
const eventRoutes = require("./events");

router.use("/users", userRoutes);
router.use("/events", eventRoutes);

module.exports = router;