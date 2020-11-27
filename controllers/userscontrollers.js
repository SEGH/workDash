const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
    create: function (req, res) {
        // Using bcrypt to hash password before it is stored in the DB
        const hash = bcrypt.hashSync(req.body.password, 12);
        db.User
            .create({
                username: req.body.username,
                password: hash
            })
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    logout: function (req, res) {
        console.log("logging out")
        req.logout();
        res.send(req.status);
    },
    getUser: function (req, res) {
        // console.log(req.user);
        res.send(req.user);
    }
};