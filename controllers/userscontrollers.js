const db = require("../models");

module.exports = {
    create: function (req, res) {
        db.User
            .create({
                username: req.body.username,
                password: req.body.password
            })
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    }
};