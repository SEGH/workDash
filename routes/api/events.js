const router = require("express").Router();
const eventsController = require("../../controllers/eventscontrollers");

router.route("/:userId")
    .get(eventsController.getAll)
    .post(eventsController.create);

module.exports = router;