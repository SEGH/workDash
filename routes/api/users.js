const router = require("express").Router();
const usersController = require("../../controllers/userscontrollers");

router.route("/register")
    .post(usersController.create);

module.exports = router;