const router = require("express").Router();
const eventsController = require("../../controllers/eventscontrollers");

router.route("/:userId")
    .get(eventsController.getAll)
    .post(eventsController.create)

router.route("/:userId/:eventId")
    .delete(eventsController.remove);

module.exports = router;