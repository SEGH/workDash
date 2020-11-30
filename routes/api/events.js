const router = require("express").Router();
const eventsController = require("../../controllers/eventscontrollers");

router.route("/:userId")
    .post(eventsController.create);

module.exports = router;