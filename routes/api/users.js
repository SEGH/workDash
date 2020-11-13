const router = require("express").Router();
const usersController = require("../../controllers/userscontrollers");
const passport = require("../../config/passport");

router.route("/register")
    .post(usersController.create);

router.route("/login")
    .post(passport.authenticate("local"), (req, res) => {
        console.log(req.user.username);
        res.json({
            username: req.user.username,
            id: req.user.id
        });
    });

module.exports = router;